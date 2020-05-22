export const deleteCreateSet = () => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const uid = getState().firebase.auth.uid;

  const termsRef = firestore.collection(`users/${uid}/unsaved/`);
  const userRef = firestore.doc(`users/${uid}`);

  termsRef.get().then(snapshot => {
    userRef.update({
      unsavedSet: '',
      notification: 'changes has been deleted'
    })
    snapshot.forEach(doc => {
      doc.ref.delete();
    })
  })
  .then(() => {
    dispatch({
      type: 'DELETE_CREATE_SET',
      payload: true
    })
  }).catch(error => {
    dispatch({
      type: 'DELETE_CREATE_SET_ERROR',
      error
    })
  })
};

// delete existing set from available sets list
export const deleteEditSet = () => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const uid = getState().firebase.auth.uid;
  const setid = getState().setid;

  const userRef = firestore.doc(`users/${uid}`);
  const setRef = firestore.doc(`sets/${setid}`);
  const termsRef = firestore.collection(`sets/${setid}/terms`);
  const userSetRef = firestore.doc(`users/${uid}/learn/${setid}`);
  const learnSetRef = firestore.collection(`users/${uid}/learn/${setid}/flashcards`);
  const playSetRef = firestore.collection(`users/${uid}/learn/${setid}/game`);

  // cloud functions
  userRef.update({
    editedSet: '',
    notification: 'The set has been deleted'
  })

  learnSetRef.get().then(snapshot => {
    snapshot.forEach(doc => {
      doc.ref.delete();
    })
  })

  playSetRef.get().then(snapshot => {
    snapshot.forEach(doc => {
      doc.ref.delete();
    })
  })


  termsRef.get().then(snapshot => {
    snapshot.forEach(doc => {
      doc.ref.delete();
    })

    userSetRef.delete()
    setRef.delete();
  })
  .then(() => {
    dispatch({
      type: 'DELETE_EDIT_SET',
      payload: true
    })
  }).catch(error => {
    dispatch({
      type: 'DELETE_EDIT_SET_ERROR',
      error
    })
  })
}
