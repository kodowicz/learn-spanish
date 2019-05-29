export const createProject = project => (dispatch, getState, { getFirebase, getFirestore }) => {
  // make async call to database
  const firestore = getFirestore();
  const profile = getState().firebase.profile;
  const authId = getState().firebase.auth.uid;

  firestore.collection('projects').add({
    ...project,
    authorFirstName: profile.firstName,
    authorLastName: profile.lastName,
    authorId: authId,
    createdAt: new Date()
  }).then(() => {
    dispatch({
      type: 'CREATE_PROJECT',
      project
    })
  }).catch(error => {
    dispatch({
      type: 'CREATE_PROJECT_ERROR',
      error
    })
  })
}

export const setUnsavedName = name => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firestore = getFirestore();
  const authId = getState().firebase.auth.uid;

  const docRef = firestore.doc(`users/${authId}/`);

  docRef.update({
    unsavedSet: name
  })
}

// if there is no subcollection
export const basicTwoTerms = number => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firestore = getFirestore();
  const authId = getState().firebase.auth.uid;
  let size;

  const unsavedRef = firestore.collection("users").doc(authId).collection("unsaved");

  unsavedRef.get().then(snap => {
    size = snap.size;

  }).then(() => {
    if (size === 0) {
      for (let i = 0; i < number; i++) {
        let newDocument = unsavedRef.doc();
        let keyId = newDocument.id;
        console.log(keyId);

        newDocument.set({
          id: keyId,
          term: "",
          definition: ""
        })
      }
    }
  });

}

// on change input
export const addUnsavedTerm = term => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firestore = getFirestore();
  const authId = getState().firebase.auth.uid;
  const subcollection = term.id;

  const docRef = firestore.doc(`users/${authId}/unsaved/${subcollection}`);

  docRef.get().then(thisDoc => {
    if (thisDoc.exists) {
      if (thisDoc.data().term !== term.term || thisDoc.data().definition !== term.definition) {
        docRef.update(term)
      }
      if (term.term === "" && term.definition === "") {
        docRef.delete()
      }
    } else {
      const newDocument = firestore.collection("users").doc(authId).collection("unsaved").doc();
      const keyId = newDocument.id;

      newDocument.set({
        id: keyId,
        term: term.term,
        definition: term.definition
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

// add term button
export const addNewUnsavedTerm = () => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firestore = getFirestore();
  const authId = getState().firebase.auth.uid;
  const newDocument = firestore.collection("users").doc(authId).collection("unsaved").doc();
  const keyId = newDocument.id;

  newDocument.set({
    id: keyId,
    term: "",
    definition: ""
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

export const submitSet = () => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firestore = getFirestore();
  const authorId = getState().firebase.auth.uid;
  const author = getState().firebase.profile.username;
  const name = getState().firebase.profile.unsavedSet;
  let terms = [];

  const unsavedRef = firestore.collection(`users/${authorId}/unsaved`);
  const createdRef = firestore.collection("sets").doc();

  unsavedRef.get().then(querySnapshot => {
    if (querySnapshot.docs.length >= 2 && name.length > 0) {
      firestore.doc(`users/${authorId}`).update({ unsavedSet: "" });

      querySnapshot.docs.map(doc => {
        const documentId = doc.data().id;

        if (doc.data().term && doc.data().definition) {
          terms.push(doc.data());
        }

        unsavedRef.doc(documentId).delete();
      })

      firestore.collection("sets").doc(createdRef.id).set({
        author,
        authorId,
        name,
        terms
      })
    }
  })
  .then(() => {
    dispatch({
      type: 'CREATE_SET',
      newSetKey: createdRef.id
    })
  }).catch(error => {
    dispatch({
      type: 'CREATE_SET_ERROR',
      error
    })
  })
}

export const learnSet = () => (dispatch, getState, { getFirebase, getFirestore }) => {
  // download set
  // return shuffled elements with indexes
}

export const shuffleCard = () => ({
  type: 'SHUFFLE_CARD',
  move: 'left'
})

export const throwoutCard = () => ({
  type: 'THROWOUT_CARD',
  move: 'right'
})
