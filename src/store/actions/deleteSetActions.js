import * as types from "../../constants/actionTypes";

export const deleteCreateSet = isDeleted => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const uid = getState().firebase.auth.uid;

  const termsRef = firestore.collection(`users/${uid}/unsaved/`);
  const userRef = firestore.doc(`users/${uid}`);

  termsRef
    .get()
    .then(snapshot => {
      userRef.update({
        unsavedSet: ""
      });
      snapshot.forEach(doc => {
        doc.ref.delete();
      });
    })
    .then(() => {
      dispatch({
        type: types.DELETE_CREATE_SET
      });
    })
    .catch(error => {
      dispatch({
        type: types.DELETE_CREATE_SET_ERROR,
        error
      });
    });
};

// delete existing set from available sets list
export const deleteEditSet = () => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const uid = getState().firebase.auth.uid;
  const setid = getState().navigation.setid;

  const userRef = firestore.doc(`users/${uid}`);
  const setRef = firestore.doc(`sets/${setid}`);
  const termsRef = firestore.collection(`sets/${setid}/terms`);
  const userSetRef = firestore.doc(`users/${uid}/learn/${setid}`);
  const learnSetRef = userSetRef.collection("flashcards");
  const playSetRef = userSetRef.collection("game");

  // cloud functions
  userRef.update({
    editedSet: ""
  });

  learnSetRef.get().then(snapshot => {
    snapshot.forEach(doc => {
      doc.ref.delete();
    });
  });

  playSetRef.get().then(snapshot => {
    snapshot.forEach(doc => {
      doc.ref.delete();
    });
  });

  termsRef
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        doc.ref.delete();
      });

      userSetRef.delete();
      setRef.delete();
    })
    .then(() => {
      dispatch({
        type: types.DELETE_EDIT_SET,
        payload: true
      });
    })
    .catch(error => {
      dispatch({
        type: types.DELETE_EDIT_SET_ERROR,
        error
      });
    });
};

export const deleteSetChanges = isDeleted => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const uid = getState().firebase.auth.uid;
  const setid = getState().navigation.setid;

  const editedRef = firestore.doc(`users/${uid}/edit/${setid}`);
  const editedTermsRef = editedRef.collection("terms");
  const userRef = firestore.doc(`users/${uid}`);

  userRef.update({ editedSet: "" });

  editedTermsRef
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        doc.ref.delete();
      });
    })
    .then(() => {
      editedRef.delete();
    })
    .then(() => {
      if (!isDeleted) {
        dispatch({
          type: types.DELETE_EDIT_CHANGES
        });
      }
    });
};

export const removeSet = () => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const uid = getState().firebase.auth.uid;
  const setid = getState().navigation.setid;

  const userSetRef = firestore.doc(`users/${uid}/learn/${setid}`);
  const learnSetRef = userSetRef.collection("flashcards");
  const playSetRef = userSetRef.collection("game");

  learnSetRef.get().then(snapshot => {
    snapshot.forEach(doc => {
      doc.ref.delete();
    });
  });

  playSetRef.get().then(snapshot => {
    snapshot.forEach(doc => {
      doc.ref.delete();
    });
  });

  userSetRef
    .delete()
    .then(() => {
      dispatch({
        type: types.REMOVE_SET,
        payload: true
      });
    })
    .catch(error => {
      dispatch({
        type: types.REMOVE_SET_ERROR,
        error
      });
    });
};
