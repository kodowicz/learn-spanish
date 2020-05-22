// create set of edited terms
export const createEditSet = () => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const uid = getState().firebase.auth.uid;
  const setid = getState().setid;
  const setName = getState().firebase.profile.editedSet;

  const setTermsRef = firestore.collection(`sets/${setid}/terms`);
  const editTermsRef = firestore.collection(`users/${uid}/edit/${setid}/terms`);
  const setNameRef = firestore.doc(`sets/${setid}`);
  const userRef = firestore.doc(`users/${uid}`);

  setNameRef.get().then(doc => {
    const editedSet = setName ? setName : doc.data().name;

    userRef.update({
      editedSet
    })
  })

  editTermsRef.get().then(snap => {
    setTermsRef.get().then(snapshot => {
      if (snap.empty) {
        snapshot.forEach(doc => {
          const { id, term, definition, time, termRows, definitionRows } = doc.data();
          const termRef = editTermsRef.doc(id);

          termRef.set({
            id,
            time,
            termRows,
            definitionRows,
            term: /^\.\.\.$/g.test(term) ? '' : term,
            definition: /^\.\.\.$/g.test(definition) ? '' : definition
          })
        })
      }
    })
  }).then(() => {
    dispatch({
      type: 'CREATE_EDIT_SET'

    })
  }).catch(error => {
    dispatch({
      type: 'CREATE_EDIT_SET_ERROR',
      error
    })
  })
}

// update set name
export const editSetName = name => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const uid = getState().firebase.auth.uid;

  const userRef = firestore.doc(`users/${uid}`);

  userRef.update({
    editedSet: name
  }).then(() => {
    dispatch({
      type: 'EDIT_SET_NAME'

    })
  }).catch(error => {
    dispatch({
      type: 'EDIT_SET_NAME_ERROR',
      error
    })
  })
}

// on change input
export const updateTerm = element => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const uid = getState().firebase.auth.uid;
  const setid = getState().setid;
  const termid = element.id;

  const docRef = firestore.doc(`users/${uid}/edit/${setid}/terms/${termid}`);

  docRef.get().then(thisDoc => {
    if (thisDoc.exists) {
      docRef.update({
        term: element.term,
        definition: element.definition,
        termRows: element.termRows,
        definitionRows: element.definitionRows
      })
    }
  })
  .then(() => {
    dispatch({
      type: 'EDIT_SET_TERM'
    })
  }).catch(error => {
    dispatch({
      type: 'EDIT_SET_TERM_ERROR',
      error
    })
  })
}

// remove on delete button
export const removeTerm = termid => (dispatch, getState, { getFirestore })  => {
  const firestore = getFirestore();
  const uid = getState().firebase.auth.uid;
  const setid = getState().setid;

  const termRef = firestore.doc(`users/${uid}/edit/${setid}/terms/${termid}`);

  termRef.delete().then(() => {
    dispatch({
      type: 'DELETE_TERM'
    })
  }).catch(error => {
    dispatch({
      type: 'DELETE_TERM_ERROR',
      error
    })
  })
}

// at add term button
export const addNewTerm = () => (dispatch, getState, { getFirestore })  => {
  const firestore = getFirestore();
  const uid = getState().firebase.auth.uid;
  const setid = getState().setid;

  const termRef = firestore.collection(`users/${uid}/edit/${setid}/terms`).doc();

  termRef.set({
    id: termRef.id,
    term: "",
    definition: "",
    time: new Date(),
    termRows: 1,
    definitionRows: 1
  })
  .then(() => {
    dispatch({
      type: 'ADD_NEW_TERM'
    })
  }).catch(error => {
    dispatch({
      type: 'ADD_NEW_TERM_ERROR',
      error
    })
  })
}

// submit changes swapping editSet with sets/setid
export const submitEditSet = (terms) => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firestore = getFirestore();
  const uid = getState().firebase.auth.uid;
  const setid = getState().setid;
  const name = getState().firebase.profile.editedSet;

  const editedRef = firestore.collection(`users/${uid}/edit/${setid}/terms`);
  const setRef = firestore.doc(`sets/${setid}`);
  const userRef = firestore.doc(`users/${uid}`);
  const learnRef = firestore.doc(`users/${uid}/learn/${setid}`);

  editedRef.get().then(querySnapshot => {
  //* update sets/${setid}
  // update users/4{uid}/learn/${setid}/flashcards
  // update users/4{uid}/learn/${setid}/game  and knowledge
  // remove users/${uid}/{editedSet}
  //* remove users/4{uid}/edit/${setid}/terms

    // update a new set name
    userRef.update({ editedSet: '' });
    setRef.update({ name });
    learnRef.update({ name });

    // delete all set terms
    setRef.collection('terms').get().then(snapshot => {
      snapshot.forEach(doc => {
        doc.ref.delete();
      })
    });

    // fill set with edited terms
    terms.forEach(element => {
      const setTermsRef = firestore.collection(`sets/${setid}/terms/`);

      setTermsRef.get().then(snapshot => {
        snapshot.forEach(doc => {
          const termRef = setTermsRef.doc(element.id);
          termRef.set({
            ...element
          })
        })
      })
    })

    // remove edit
    editedRef.get().then(snapshot => {
      snapshot.forEach(doc => {
        doc.ref.delete();
      });
    }).then(() => {
      firestore.doc(`users/${uid}/edit/${setid}`).delete();
    })

  // // user learning set
  //   firestore.collection(`users/${uid}/learn`).doc(createRef.id).set({
  //     author,
  //     name,
  //     authorId: uid,
  //     id: createRef.id,
  //     amount: terms.length
  //   })
  //
  //   terms.forEach(element => {
  //     const termsRef = firestore.collection(`sets/${createRef.id}/terms`).doc();
  //     const flashcardsRef = firestore.collection(`users/${uid}/learn/${createRef.id}/flashcards/`).doc();
  //     const gameRef = firestore.collection(`users/${uid}/learn/${createRef.id}/game/`).doc();
  //
  //     termsRef.set({
  //       term: element.term,
  //       definition: element.definition,
  //       id: termsRef.id,
  //       time: element.time
  //     })
  //
  //     flashcardsRef.set({
  //       term: element.term,
  //       definition: element.definition,
  //       id: termsRef.id,
  //       time: element.time
  //     })
  //
  //     gameRef.set({
  //       term: element.term,
  //       definition: element.definition,
  //       id: termsRef.id,
  //       time: element.time,
  //       knowledge: 0
  //     })
  //   })
  })
  .then(() => {
    dispatch({
      type: 'SUBMIT_EDITED_SET',
      payload: true
    })
  }).catch(error => {
    dispatch({
      type: 'SUBMIT_EDITED_SET_ERROR',
      error
    })
  })
}

export const deleteSetChanges = () => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const uid = getState().firebase.auth.uid;
  const setid = getState().setid;

  const editedRef = firestore.doc(`users/${uid}/edit/${setid}`);
  const editedTermsRef = editedRef.collection('terms');
  const userRef = firestore.doc(`users/${uid}`);

  userRef.update({ editedSet: '' });

  editedTermsRef.get().then(snapshot => {
    snapshot.forEach(doc => {
      doc.ref.delete();
    });
  }).then(() => {
    editedRef.delete();
  }).then(() => {
    dispatch({
      type: 'DELETE_SET_CHANGES',
      isDeleted: true
    })
  }).catch(error => {
    dispatch({
      type: 'DELETE_SET_CHANGES_ERROR',
      error
    })
  })
}
