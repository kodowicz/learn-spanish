export const setUnsavedName = name => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const authId = getState().firebase.auth.uid;

  const docRef = firestore.doc(`users/${authId}/`);

  docRef.update({
    unsavedSet: name
  }).then(() => {
    dispatch({
      type: 'CREATE_UNSAVED_NAME'

    })
  }).catch(error => {
    dispatch({
      type: 'CREATE_UNSAVED_NAME_ERROR',
      error
    })
  })
}

// if there is no subcollection
export const basicTwoTerms = number => (dispatch, getState, { getFirestore }) => {
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

        newDocument.set({
          id: keyId,
          term: "",
          definition: "",
          time: new Date()
        })
      }
    } else if (size === 1) {  // necessary if cloud function exists
      let newDocument = unsavedRef.doc();
      let keyId = newDocument.id;

      newDocument.set({
        id: keyId,
        term: "",
        definition: "",
        time: new Date()
      })
    }
  })
  .then(() => {
    dispatch({
      type: 'CREATE_BASIC_SET'

    })
  }).catch(error => {
    dispatch({
      type: 'CREATE_BASIC_SET_ERROR',
      error
    })
  })

}

// on change input
export const updateUnsavedTerm = element => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const authId = getState().firebase.auth.uid;
  const subcollection = element.id;

  const docRef = firestore.doc(`users/${authId}/unsaved/${subcollection}`);

  docRef.get().then(thisDoc => {
    if (thisDoc.exists) {
      docRef.update({
        term: element.term,
        definition: element.definition
      })
    // } else {
    //   const newDocument = firestore.collection("users").doc(authId).collection("unsaved").doc();
    //   const keyId = newDocument.id;
    //   newDocument.set({
    //     id: keyId,
    //     term: term.term,
    //     definition: term.definition,
    //     time: new Date()
    //   })
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

export const removeUnsavedTerm = termID => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const authId = getState().firebase.auth.uid;

  const docRef = firestore.doc(`users/${authId}/unsaved/${termID}`);

  docRef.get().then(() => {
    docRef.delete()
  }).then(() => {
    dispatch({
      type: 'DELETE_UNSAVED_TERM',
      message: 'term removed'
    })
  }).catch(error => {
    dispatch({
      type: 'DELETE_UNSAVED_TERM_ERROR',
      error
    })
  })
}

// at add term button
export const addNewUnsavedTerm = () => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const authId = getState().firebase.auth.uid;
  const newDocument = firestore.collection("users").doc(authId).collection("unsaved").doc();
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

// submit set of prompt an error
export const submitSet = (terms) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const authorId = getState().firebase.auth.uid;
  const author = getState().firebase.profile.username;
  const name = getState().firebase.profile.unsavedSet;
  let fixedTerms = [];

  const notificationRef = firestore.doc(`users/${authorId}`);
  const unsavedRef = firestore.collection(`users/${authorId}/unsaved`);
  const createRef = firestore.collection('sets').doc();

  if (!name || name === " ") {
    notificationRef.update({
      notification: 'You must enter a title to save your set'
    })
    .then(() => {
      dispatch({
        type: 'INVALID_SET_NAME'
      })
    }).catch(error => {
      dispatch({
        type: 'INVALID_SET_NAME_ERROR',
        error
      })
    })

  } else if (terms.length < 2) {
    notificationRef.update({
      notification: "You have to create at least 2 terms"
    })
    .then(() => {
      dispatch({
        type: 'INVALID_SET_TERMS'
      })
    }).catch(error => {
      dispatch({
        type: 'INVALID_SET_TERMS_ERROR',
        error
      })
    })
  } else {
    unsavedRef.get().then(querySnapshot => {

      firestore.doc(`users/${authorId}`).update({ unsavedSet: '' });

      querySnapshot.docs.forEach(doc => {
        const documentId = doc.data().id;
        const term = doc.data().term;
        const definition = doc.data().definition;

        if (/\S/.test(term) && /\S/.test(term) &&
        /\S/.test(definition) && /\S/.test(definition)) {
          fixedTerms.push(doc.data());

        } else if (/\s/.test(term) || term.length === 0) {
          fixedTerms.push(Object.assign({}, doc.data(), { term: '...' }));

        } else if (/\s/.test(definition) || definition.length === 0) {
          fixedTerms.push(Object.assign({}, doc.data(), { definition: '...' }));

        // } else {
        //   fixedTerms.push(Object.assign({}, doc.data(), { term: '...', definition: '...' }));
        }

        unsavedRef.doc(documentId).delete();
      })

      firestore.collection('sets').doc(createRef.id).set({
        author,
        authorId,
        name,
        id: createRef.id,
        amount: fixedTerms.length
      })

      firestore.collection(`users/${authorId}/learn`).doc(createRef.id).set({
        author,
        authorId,
        name,
        id: createRef.id,
        amount: fixedTerms.length
      })

      fixedTerms.forEach(element => {
        const termsRef = firestore.collection(`sets/${createRef.id}/terms`).doc();
        const flashcardsRef = firestore.collection(`users/${authorId}/learn/${createRef.id}/flashcards/`).doc();
        const gameRef = firestore.collection(`users/${authorId}/learn/${createRef.id}/game/`).doc();

        termsRef.set({
          term: element.term,
          definition: element.definition,
          id: termsRef.id,
          time: element.time
        })

        flashcardsRef.set({
          term: element.term,
          definition: element.definition,
          id: termsRef.id,
          time: element.time
        })

        gameRef.set({
          term: element.term,
          definition: element.definition,
          id: termsRef.id,
          time: element.time,
          knowledge: 0
        })
      })
    })
    .then(() => {
      dispatch({
        type: 'CREATE_SET',
        newSetKey: createRef.id
      })
    }).catch(error => {
      dispatch({
        type: 'CREATE_SET_ERROR',
        error
      })
    })
  }
}

export const removeNewKey = () => ({
  type: 'REMOVE_KEY'
})

export const deleteUnsavedSet = termID => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const authId = getState().firebase.auth.uid;

  const docRef = firestore.doc(`users/${authId}/unsaved/`);

  docRef.get().then(() => {
    docRef.delete()
  }).then(() => {
    dispatch({
      type: 'DELETE_UNSAVED_SET',
      message: 'term removed'
    })
  }).catch(error => {
    dispatch({
      type: 'DELETE_UNSAVED_SET_ERROR',
      error
    })
  })
}
