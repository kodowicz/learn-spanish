export const createPlaySet = setid => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firestore = getFirestore();
  const user = getState().firebase.auth.uid;

  const setRef = firestore.collection(`sets/${setid}/terms`);
  const playSetRef = firestore.collection(`users/${user}/learn/${setid}/game`);

  playSetRef.get().then(snap => {
    if (!snap.size) {
      setRef.get().then(snapshot => {

        snapshot.forEach(doc => {
          const { term, definition, time } = doc.data();
          const termRef = playSetRef.doc();
          const id = termRef.id;
          const ratio = 0;

          termRef.set({
            id,
            term,
            definition,
            time,
            ratio
          })
        })
      })
    }
  })
}

export const clearGameAnswer = () => ({
  type: 'CLEAR_ANSWER',
  payload: ''
});

export const chooseOption = (term, isCorrect) => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firestore = getFirestore();
  const user = getState().firebase.auth.uid;
  const set = getState().setid;
  const time = new Date();
  const ratio = isCorrect ? term.ratio + 1 : term.ratio - 1;

  const docRef = firestore.doc(`users/${user}/learn/${set}/game/${term.id}`);

  docRef.update({
    ratio,
    time
  })
  .then(() => {
    dispatch({
      type: 'CHOOSE_OPTION',
      payload: isCorrect ? 'correct' : 'wrong'
    })
  }).catch(error => {
    dispatch({
      type: 'CHOOSE_OPTION_ERROR',
      error
    })
  })
}
