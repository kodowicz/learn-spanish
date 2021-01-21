import { CREATE_LEARN_SET_ERROR } from "../../constants/actionTypes";

export const createLearnSet = setid => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const uid = getState().firebase.auth.uid;

  const setRef = firestore.doc(`sets/${setid}`);
  const setTermsRef = firestore.collection(`sets/${setid}/terms`);
  const learnDetailsRef = firestore.doc(`users/${uid}/learn/${setid}/`);
  const learnSetRef = firestore.collection(`users/${uid}/learn/${setid}/flashcards`);

  learnSetRef
    .get()
    .then(snap => {
      if (!snap.size) {
        setRef.get().then(doc => {
          learnDetailsRef.set({
            ...doc.data(),
            knowledge: 0
          });
        });

        setTermsRef.get().then(snapshot => {
          snapshot.forEach(doc => {
            const { id, term, definition, time } = doc.data();
            const termRef = learnSetRef.doc(id);

            termRef.set({
              id,
              term,
              definition,
              time
            });
          });
        });
      }
    })
    .catch(error => {
      dispatch({
        type: CREATE_LEARN_SET_ERROR,
        error
      });
    });
};

export const shuffleCard = term => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const uid = getState().firebase.auth.uid;
  const set = getState().navigation.setid;
  const time = firestore.FieldValue.serverTimestamp();

  const docRef = firestore.doc(`users/${uid}/learn/${set}/flashcards/${term.id}`);

  docRef
    .update({
      time
    })
};

export const throwoutCard = term => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const uid = getState().firebase.auth.uid;
  const set = getState().navigation.setid;

  const docRef = firestore.doc(`users/${uid}/learn/${set}/flashcards/${term}`);

  docRef.delete();
};
