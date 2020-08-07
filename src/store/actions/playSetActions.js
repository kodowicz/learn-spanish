export const createPlaySet = setid => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firestore = getFirestore();
  const uid = getState().firebase.auth.uid;

  const setRef = firestore.doc(`sets/${setid}`);
  const setTermsRef = firestore.collection(`sets/${setid}/terms`);
  const learnDetailsRef = firestore.doc(`users/${uid}/learn/${setid}`);

  learnDetailsRef.get().then(snap => {
    if (!snap.size) {

      setRef.get().then(doc => {
        const { amount, name } = doc.data();

        learnDetailsRef.set({
          name,
          amount,
          knowledge: 0,
          id: learnDetailsRef.id,
        })
      })

      setTermsRef.get().then(snap => {
        snap.docs.forEach(doc => {
          const {id, term, definition, time } = doc.data();

          const playSetRef = firestore.doc(`users/${uid}/learn/${setid}/game/${id}`);

          playSetRef.set({
            id,
            term,
            definition,
            time,
            ratio: 0
          })
        })
      })
    }
  }).then(() => {
    dispatch({
      type: 'CREATE_PLAY_SET'
    })
  }).catch(error => {
    dispatch({
      type: 'CREATE_PLAY_SET_ERROR',
      error
    })
  })
}

export const clearGameAnswer = () => ({
  type: 'CLEAR_ANSWER'
});

export const chooseOption = (item, isCorrect) => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firestore = getFirestore();
  const user = getState().firebase.auth.uid;
  const set = getState().navigation.setid;
  const time = new Date();
  const newRatio = isCorrect ? item.ratio + 1 : item.ratio - 1;
  const minRatio = 0;
  const maxRatio = 5;
  let knowledge;

  const docRef = firestore.doc(`users/${user}/learn/${set}/game/${item.id}`);
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
      answer: isCorrect ? 'correct' : 'wrong',
      item
    })
  }).catch(error => {
    dispatch({
      type: 'CHOOSE_OPTION_ERROR',
      error
    })
  })
}
