// update set name
export const setUnsavedName = name => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const authid = getState().firebase.auth.uid;

  const userRef = firestore.doc(`users/${authid}/`);

  userRef.update({
    unsavedSet: name
  }).then(() => {
    dispatch({
      type: 'CREATE_SET_NAME'

    })
  }).catch(error => {
    dispatch({
      type: 'CREATE_SET_NAME_ERROR',
      error
    })
  })
}

// if there is no basic terms
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
  const uid = getState().firebase.auth.uid;
  const termid = element.id;

  const docRef = firestore.doc(`users/${uid}/unsaved/${termid}`);

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
      type: 'CREATE_SET_TERM'
    })
  }).catch(error => {
    dispatch({
      type: 'CREATE_SET_TERM_ERROR',
      error
    })
  })
}

// remove on delete button
export const removeUnsavedTerm = termid => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const authId = getState().firebase.auth.uid;

  const docRef = firestore.doc(`users/${authId}/unsaved/${termid}`);

  docRef.get().then(() => {
    docRef.delete()
  }).then(() => {
    dispatch({
      type: 'DELETE_CREATED_TERM'
    })
  }).catch(error => {
    dispatch({
      type: 'DELETE_CREATED_TERM_ERROR',
      error
    })
  })
}

// at add term button
export const addNewUnsavedTerm = () => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const uid = getState().firebase.auth.uid;
  const termRef = firestore.collection(`users/${uid}/unsaved`).doc();

  termRef.set({
    id: termRef.id,
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
  const uid = getState().firebase.auth.uid;
  const author = getState().firebase.profile.username;
  const name = getState().firebase.profile.unsavedSet;

  const userRef = firestore.doc(`users/${uid}`);
  const unsavedRef = firestore.collection(`users/${uid}/unsaved`);
  const createRef = firestore.collection('sets').doc();

  if (!name || name === " ") {
    userRef.update({
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
    userRef.update({
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

      userRef.update({ unsavedSet: '' });

      querySnapshot.docs.forEach(doc => {
        const termid = doc.data().id;
        unsavedRef.doc(termid).delete();
      })

      createRef.set({
        author,
        name,
        authorId: uid,
        id: createRef.id,
        amount: terms.length
      })

    // user learning set
      firestore.collection(`users/${uid}/learn`).doc(createRef.id).set({
        author,
        name,
        authorId: uid,
        id: createRef.id,
        amount: terms.length
      })

      terms.forEach(element => {
        const termsRef = firestore.collection(`sets/${createRef.id}/terms`).doc();
        const keyid = termsRef.id;
        const flashcardsRef = firestore.collection(`users/${uid}/learn/${createRef.id}/flashcards/`).doc(keyid);
        const gameRef = firestore.collection(`users/${uid}/learn/${createRef.id}/game/`).doc(keyid);

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
