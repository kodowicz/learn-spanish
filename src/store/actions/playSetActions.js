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
  const newRatio = isCorrect ? term.ratio + 1 : term.ratio - 1;
  const minRatio = 0;
  const maxRatio = 5;
  let knowledge;

  const docRef = firestore.doc(`users/${user}/learn/${set}/game/${term.id}`);
  const knowledgeRef = firestore.doc(`users/${user}/learn/${set}`);

  // cloud functions
  knowledgeRef.get().then(doc => {
    if (newRatio >= minRatio && newRatio <= maxRatio) {
      knowledge = doc.data().knowledge + (isCorrect ? 1 : -1);
    } else {
      knowledge = doc.data().knowledge;
    }

    knowledgeRef.update({
      knowledge
    })
  })

  docRef.update({
    time,
    ratio: maxRatio < newRatio ?
      maxRatio
      :
      newRatio < minRatio ?
        minRatio
        :
        newRatio
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


export const changeKnowledge = () => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firestore = getFirestore();
  const user = getState().firebase.auth.uid;

  const docRef = firestore.doc(`users/${user}/learn/`);

  docRef.get().then((doc) => {
    console.log(doc.data());
  })
}
/*
// 1 - 5 => 100%
// 2 - 0 => 0%
// -----------
//         50%


4
4
2
5
0
4
4
5
5
5
5
----------
11*5 = 55 => 100%
39  => 71%


*/
