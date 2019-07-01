// if there is no subcollection
export const basicTwoTerms = number => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  let size;

  const docRef = firestore.collection("collection");

  docRef.get().then(snap => {
    size = snap.size;

  }).then(() => {
    if (size === 0) {
      for (let i = 0; i < number; i++) {
        let newDocument = docRef.doc();
        let keyId = newDocument.id;

        newDocument.set({
          id: keyId,
          term: "",
          definition: "",
          time: new Date()
        })
      }
    } else if (size === 1) {  // necessary if cloud function exists
      let newDocument = docRef.doc();
      let keyId = newDocument.id;

      newDocument.set({
        id: keyId,
        term: "",
        definition: "",
        time: new Date()
      })
    }
  });

}

// on change input
export const updateTerm = element => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const authId = getState().firebase.auth.uid;
  const subcollection = element.id;

  const docRef = firestore.doc(`collection/${subcollection}`);

  docRef.get().then(thisDoc => {
    if (thisDoc.exists) {
      docRef.update({
        term: element.term,
        definition: element.definition
      })
    }
  })
  .then(() => {
    dispatch({
      type: 'CREATE_UNSAVED_SET'
    })
  }).catch(error => {
    dispatch({
      type: 'CREATE_UNSAVED_SET_ERROR',
      error
    })
  })
}

export const removeTerm = termID => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const authId = getState().firebase.auth.uid;

  const docRef = firestore.doc(`collection/${termID}`);

  docRef.get().then(() => {
    docRef.delete()
  }).then(() => {
    dispatch({
      type: 'DELETE_UNSAVED_TERM'
    })
  }).catch(error => {
    dispatch({
      type: 'DELETE_UNSAVED_TERM_ERROR',
      error
    })
  })
}

// add term button
export const addNewTerm = () => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const authId = getState().firebase.auth.uid;
  const newDocument = firestore.collection("collection").doc();
  const keyId = newDocument.id;

  newDocument.set({
    id: keyId,
    term: "",
    definition: "",
    time: new Date()
  })
  .then(() => {
    dispatch({
      type: 'ADD_UNSAVED_NEW_TERM'
    })
  }).catch(error => {
    dispatch({
      type: 'ADD_UNSAVED_NEW_TERM_ERROR',
      error
    })
  })
}

export const submitSet = () => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();

  const docRef = firestore.collection("collection");

  docRef.get().then(snap => {
    snap.forEach(doc => console.log(doc.data()))

  }).then(() => {
    dispatch({
      type: 'CREATE_SET',
      newSetKey: null
    })
  }).catch(error => {
    dispatch({
      type: 'CREATE_SET_ERROR',
      error
    })
  })
}
