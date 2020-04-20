export const createLearnSet = setId => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firestore = getFirestore();
  const userId = getState().firebase.auth.uid;

  const setRef = firestore.collection(`sets/${setId}/terms`);
  const learnSetRef = firestore.collection(`users/${userId}/learn/${setId}/basic`);

  learnSetRef.get().then(snap => {
    if (!snap.size) {
      setRef.get().then(snapshot => {

        snapshot.forEach(doc => {
          const { term, definition, time } = doc.data();
          const termRef = learnSetRef.doc();
          const id = termRef.id;

          termRef.set({
            id,
            term,
            definition,
            time
          })
        })
      })
    }
  })

}

export const shuffleCard = term => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firestore = getFirestore();
  const user = getState().firebase.auth.uid;
  const set = getState().setId;
  const time = new Date();

  const docRef = firestore.doc(`users/${user}/learn/${set}/basic/${term.id}`);

  docRef.update({
    time
  })
  .then(() => {
    dispatch({
      type: 'SHUFFLE_CARD'
    })
  }).catch(error => {
    dispatch({
      type: 'SHUFFLE_CARD_ERROR',
      error
    })
  })
}

export const throwoutCard = term => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firestore = getFirestore();
  const user = getState().firebase.auth.uid;
  const set = getState().setId;

  const docRef = firestore.doc(`users/${user}/learn/${set}/basic/${term}`);

  docRef.delete()
  .then(() => {
    dispatch({
      type: 'THROWOUT_CARD'
    })
  }).catch(error => {
    dispatch({
      type: 'THROWOUT_CARD_ERROR',
      error
    })
  })
}
