// create set of edited terms
export const createEditSet = () => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const uid = getState().firebase.auth.uid;
  const setid = getState().navigation.setid;
  const setName = getState().firebase.profile.editedSet;

  const setTermsRef = firestore.collection(`users/${uid}/learn/${setid}/game`);
  const editTermsRef = firestore.collection(`users/${uid}/edit/${setid}/terms`);
  const setNameRef = firestore.doc(`sets/${setid}`);
  const userRef = firestore.doc(`users/${uid}`);

  setNameRef.get().then(doc => {
    const editedSet = setName ? setName : doc.data().name;

    userRef.update({
      editedSet
    });
  });

  editTermsRef
    .get()
    .then(snap => {
      setTermsRef.get().then(snapshot => {
        if (snap.empty) {
          snapshot.forEach(doc => {
            const { id, term, definition } = doc.data();
            const termRef = editTermsRef.doc(id);

            termRef.set({
              ...doc.data(),
              term: /^\.\.\.$/g.test(term) ? "" : term,
              definition: /^\.\.\.$/g.test(definition) ? "" : definition
            });
          });
        }
      });
    })
    .catch(error => {
      dispatch({
        type: "CREATE_EDIT_SET_ERROR",
        error
      });
    });
};

// update set name
export const editSetName = name => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const uid = getState().firebase.auth.uid;
  const setid = getState().navigation.setid;

  const userRef = firestore.doc(`users/${uid}`);

  userRef.update({ editedSet: name });
};

// on change input
export const updateTerm = element => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const uid = getState().firebase.auth.uid;
  const setid = getState().navigation.setid;
  const termid = element.id;

  const docRef = firestore.doc(`users/${uid}/edit/${setid}/terms/${termid}`);

  docRef
    .get()
    .then(thisDoc => {
      if (thisDoc.exists) {
        docRef.update({ ...element });
      }
    })
    .catch(error => {
      dispatch({ type: "UPDATE_TERM_ERROR" });
    });
};

// remove on delete button
export const removeTerm = termid => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const uid = getState().firebase.auth.uid;
  const setid = getState().navigation.setid;

  const termRef = firestore.doc(`users/${uid}/edit/${setid}/terms/${termid}`);

  termRef
    .delete()
    .catch(error => {
      dispatch({ type: "DELETE_TERM_ERROR" });
    });
};

// at add term button
export const addNewTerm = () => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const uid = getState().firebase.auth.uid;
  const setid = getState().navigation.setid;

  const termRef = firestore.collection(`users/${uid}/edit/${setid}/terms`).doc();

  termRef
    .set({
      term: "",
      definition: "",
      ratio: 0,
      termRows: 1,
      definitionRows: 1,
      id: termRef.id,
      time: firestore.FieldValue.serverTimestamp()
    })
    .catch(error => {
      dispatch({ type: "ADD_TERM_ERROR" });
    });
};

// submit changes swapping editSet with sets/setid
export const submitEditSet = terms => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const uid = getState().firebase.auth.uid;
  const setid = getState().navigation.setid;
  const name = getState().firebase.profile.editedSet;

  const editedRef = firestore.collection(`users/${uid}/edit/${setid}/terms`);
  const setRef = firestore.doc(`sets/${setid}`);
  const userRef = firestore.doc(`users/${uid}`);
  const learnRef = firestore.doc(`users/${uid}/learn/${setid}`);
  const gameRef = firestore.collection(`users/${uid}/learn/${setid}/game`);
  const flashcardsRef = firestore.collection(`users/${uid}/learn/${setid}/flashcards`);
  const setTermsRef = firestore.collection(`sets/${setid}/terms`);

  // update a new set name
  setRef.update({
    name,
    amount: terms.length
  });

  learnRef.update({
    name,
    amount: terms.length
  });

  userRef.update({ editedSet: "" });

  // delete all set terms
  gameRef
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        doc.ref.delete();
      });
    })
    .then(() => {
      terms.forEach(element => {
        const playRef = gameRef.doc(element.id);
        playRef.set({ ...element });
      });
    });

  flashcardsRef
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        doc.ref.delete();
      });
    })
    .then(() => {
      terms.forEach(element => {
        const learnRef = flashcardsRef.doc(element.id);
        learnRef.set({ ...element });
      });
    });

  setTermsRef
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        doc.ref.delete();
      });
    })
    .then(() => {
      terms.forEach(element => {
        const termRef = setTermsRef.doc(element.id);
        termRef.set({ ...element });
      });
    });

  // remove edit
  editedRef
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        doc.ref.delete();
      });
    })
    .then(() => {
      firestore.doc(`users/${uid}/edit/${setid}`).delete();
    })
    .catch(error => {
      dispatch({
        type: "SUBMIT_EDITED_SET_ERROR",
        error
      });
    });
};
