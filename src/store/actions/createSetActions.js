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

// add term button
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

export const submitSet = () => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const authorId = getState().firebase.auth.uid;
  const author = getState().firebase.profile.username;
  const name = getState().firebase.profile.unsavedSet;
  let terms = [];

  const unsavedRef = firestore.collection(`users/${authorId}/unsaved`);
  const createRef = firestore.collection("sets").doc();

  unsavedRef.get().then(querySnapshot => {

    if (querySnapshot.docs.length >= 2 && /\w/.test(name)) {
      firestore.doc(`users/${authorId}`).update({ unsavedSet: "" });

      querySnapshot.docs.map(doc => {
        const documentId = doc.data().id;
        const term = doc.data().term;
        const definition = doc.data().definition;

        if (/\S/.test(term) && /\S/.test(term) &&
            /\S/.test(definition) && /\S/.test(definition)) {
          terms.push(doc.data());

        } else if (/\s/.test(term) || term.length === 0) {
          terms.push(Object.assign({}, doc.data(), { term: '...' }));

        } else if (/\s/.test(definition) || definition.length === 0) {
          terms.push(Object.assign({}, doc.data(), { definition: '...' }));

        } else {
          console.log('oba są puste');
        }

        unsavedRef.doc(documentId).delete();
      })

      firestore.collection("sets").doc(createRef.id).set({
        author,
        authorId,
        name,
        id: createRef.id,
        amount: terms.length
      })

      terms.forEach(element => {
        const termsRef = firestore.collection(`sets/${createRef.id}/terms`).doc();

        termsRef.set({
          term: element.term,
          definition: element.definition,
          id: termsRef.id,
          time: element.time
        })
      })
      // console.log(firestore.collection(`sets/${createRef.id}/terms/${termsRef.id}`));
      // firestore.collection(`sets/${createRef.id}/terms/${termsRef.id}`).set({
      //   term: 'term',
      //   definition: 'definition'
      // })


    }
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

export const removeNewKey = () => ({
  type: 'REMOVE_KEY'
})
