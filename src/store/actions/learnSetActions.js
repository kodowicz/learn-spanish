export const shuffleCard = term => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firestore = getFirestore();
  const user = getState().firebase.auth.uid;
  const set = getState().setId;

  const docRef = firestore.doc(`users/${user}/learn/${set}/basic/${term}`);

  docRef.get().then(thisDoc => {
    docRef.update({
      time: new Date()
    })
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

  docRef.get().then(thisDoc => {
    docRef.delete()
  })
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
