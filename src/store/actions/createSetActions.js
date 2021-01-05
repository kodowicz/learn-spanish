import * as types from "../../constants/actionTypes";

// update set name
export const setUnsavedName = unsavedSet => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const authid = getState().firebase.auth.uid;

  const userRef = firestore.doc(`users/${authid}/`);

  userRef.update({ unsavedSet });
};

// if there is no basic terms
export const createBasicTerms = () => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const uid = getState().firebase.auth.uid;
  const termsLength = 3;
  const delay = 1000;
  let date = Date.now();
  let size;

  const unsavedRef = firestore.collection(`users/${uid}/unsaved`);

  unsavedRef
    .get()
    .then(snap => {
      size = snap.size;
    })
    .then(() => {
      while (size <= termsLength) {
        let newDocument = unsavedRef.doc();
        let keyId = newDocument.id;
        let time = new Date(date + size * delay);

        newDocument.set({
          time,
          id: keyId,
          term: "",
          definition: "",
          termRows: 1,
          definitionRows: 1
        });

        size++;
      }
    })
    .catch(error => {
      dispatch({ type: types.CREATE_BASIC_SET_ERROR });
    });
};

// on change input
export const updateUnsavedTerm = element => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const uid = getState().firebase.auth.uid;
  const termid = element.id;

  const docRef = firestore.doc(`users/${uid}/unsaved/${termid}`);

  docRef
    .get()
    .then(thisDoc => {
      if (thisDoc.exists) {
        docRef.update({
          term: element.term,
          definition: element.definition,
          termRows: element.termRows,
          definitionRows: element.definitionRows
        });
      }
    })
    .catch(error => {
      dispatch({ type: types.UPDATE_TERM_ERROR });
    });
};

// remove on delete button
export const removeUnsavedTerm = termid => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const authId = getState().firebase.auth.uid;

  const docRef = firestore.doc(`users/${authId}/unsaved/${termid}`);

  docRef
    .get()
    .then(() => {
      docRef.delete();
    })
    .catch(error => {
      dispatch({ type: types.DELETE_TERM_ERROR });
    });
};

// at add term button
export const addNewUnsavedTerm = () => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const uid = getState().firebase.auth.uid;
  const termsRef = firestore.collection(`users/${uid}/unsaved`);

  termsRef.get().then(snap => {
    if (snap.size < 50) {
      const termRef = termsRef.doc();

      termRef
        .set({
          id: termRef.id,
          term: "",
          definition: "",
          termRows: 1,
          definitionRows: 1,
          time: new Date()
        })
        .catch(error => {
          dispatch({ type: types.ADD_TERM_ERROR });
        });
    }
  });
};

// submit set of prompt an error
export const submitCreateSet = terms => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const uid = getState().firebase.auth.uid;
  const author = getState().firebase.profile.username;
  const name = getState().firebase.profile.unsavedSet;

  const userRef = firestore.doc(`users/${uid}`);
  const unsavedRef = firestore.collection(`users/${uid}/unsaved`);
  const createRef = firestore.collection("sets").doc();
  const learnRef = firestore.collection(`users/${uid}/learn`).doc(createRef.id);

  unsavedRef
    .get()
    .then(querySnapshot => {
      userRef.update({ unsavedSet: "" });

      querySnapshot.docs.forEach(doc => {
        const termid = doc.data().id;
        unsavedRef.doc(termid).delete();
      });

      createRef.set({
        author,
        name,
        authorId: uid,
        id: createRef.id,
        amount: terms.length
      });

      // user learning set
      learnRef.set({
        name,
        knowledge: 0,
        isCompleted: false,
        id: createRef.id,
        amount: terms.length
      });

      terms.forEach(element => {
        const termsRef = firestore.collection(`sets/${createRef.id}/terms`).doc();
        const flashcardsRef = learnRef.collection("flashcards").doc(termsRef.id);
        const gameRef = learnRef.collection("game").doc(termsRef.id);

        termsRef.set({
          ...element
        });

        flashcardsRef.set({
          id: termsRef.id,
          term: element.term,
          definition: element.definition,
          time: element.time
        });

        gameRef.set({
          ...element,
          ratio: 0,
          isMastered: false,
          id: termsRef.id
        });
      });
    })
    .then(() => {
      dispatch({
        type: types.CREATE_SET,
        newSetKey: createRef.id
      });
    })
    .catch(error => {
      dispatch({ type: types.CREATE_SET_ERROR });
    });
};

export const removeNewKey = () => ({
  type: types.REMOVE_KEY
});
