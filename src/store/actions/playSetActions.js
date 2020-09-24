export const createPlaySet = setid => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firestore = getFirestore();
  const uid = getState().firebase.auth.uid;

  const setRef = firestore.doc(`sets/${setid}`);
  const setTermsRef = firestore.collection(`sets/${setid}/terms`);
  const learnDetailsRef = firestore.doc(`users/${uid}/learn/${setid}`);

  learnDetailsRef.get().then(doc => {
    if (!doc.exists) {

      setRef.get().then(doc => {
        const { amount, name } = doc.data();

        learnDetailsRef.set({
          name,
          amount,
          id: learnDetailsRef.id,
        })
      })

      setTermsRef.get().then(snap => {
        snap.docs.forEach(doc => {
          const { id, term, definition, time, termRows, definitionRows } = doc.data();

          const playSetRef = firestore.doc(`users/${uid}/learn/${setid}/game/${id}`);

          playSetRef.set({
            id,
            term,
            definition,
            time,
            termRows,
            definitionRows,
            ratio: 0,
            isMastered: false
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

export const showGameAnswer = (item, answer) => ({
  type: 'SHOW_ANSWER',
  item,
  answer
});

export const cleanGameAnswer = (item, isCorrect) => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firestore = getFirestore();
  const user = getState().firebase.auth.uid;
  const set = getState().navigation.setid;
  const time = firestore.FieldValue.serverTimestamp();
  const newRatio = isCorrect ? item.ratio + 1 : item.ratio - 1;
  const minRatio = 0;
  const maxRatio = 5;
  let knowledge;
  let isMastered = item.ratio === 5 ? true : false;

  const docRef = firestore.doc(`users/${user}/learn/${set}/game/${item.id}`);
  const knowledgeRef = firestore.doc(`users/${user}/learn/${set}`);

  // cloud functions
  knowledgeRef.get().then(doc => {
    const { knowledge: prevKnowledge } = doc.data();

    if (prevKnowledge) {
      if (newRatio >= minRatio && newRatio <= maxRatio) {
        knowledge = prevKnowledge + (isCorrect ? 1 : -1);
      } else {
        knowledge = prevKnowledge;
      }

    } else {
      knowledge = isCorrect ? 1 : 0
    }

    knowledgeRef.update({
      knowledge
    })
  })

  docRef.update({
    time,
    isMastered,
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
      type: 'CLEAR_ANSWER'
    })
  })
}
