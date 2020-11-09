export const createPlaySet = setid => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firestore = getFirestore();
  const uid = getState().firebase.auth.uid;

  const setRef = firestore.doc(`sets/${setid}`);
  const setTermsRef = firestore.collection(`sets/${setid}/terms`);
  const learnDetailsRef = firestore.doc(`users/${uid}/learn/${setid}`);

  learnDetailsRef
    .get()
    .then(doc => {
      if (!doc.exists) {
        setRef.get().then(doc => {
          const { amount, name } = doc.data();

          learnDetailsRef.set({
            name,
            amount,
            knowledge: 0,
            isCompleted: false,
            id: learnDetailsRef.id
          });
        });

        setTermsRef
          .get()
          .then(snap => {
            snap.docs.forEach(doc => {
              const { id, term, definition, time, termRows, definitionRows } = doc.data();

              const playSetRef = firestore.doc(`users/${uid}/learn/${setid}/game/${id}`);

              playSetRef.set({
                id,
                term,
                definition,
                time,
                termRows,
                definitionRows,
                ratio: 0,
                isMastered: false
              });
            });
          });
      }
    })
    .then(() => {
      dispatch({
        type: "CREATE_PLAY_SET"
      });
    })
    .catch(error => {
      dispatch({
        type: "CREATE_PLAY_SET_ERROR",
        error
      });
    });
};

export const showGameAnswer = (item, answer) => ({
  type: "SHOW_ANSWER",
  item,
  answer
});

export const cleanGameAnswer = (item, isCorrect) => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firestore = getFirestore();
  const user = getState().firebase.auth.uid;
  const set = getState().navigation.setid;
  const time = firestore.FieldValue.serverTimestamp();
  const newRatio = isCorrect ? item.ratio + 1 : item.ratio - 1;
  const minRatio = 0;
  const maxRatio = 5;
  let isMastered = item.ratio === 5 ? (newRatio === 6 ? true : false) : false;
  let knowledge;
  let wasCompleted;

  const userRef = firestore.doc(`users/${user}`);
  const setRef = firestore.doc(`users/${user}/learn/${set}`);
  const itemsRef = firestore.collection(`users/${user}/learn/${set}/game`);
  const docRef = firestore.doc(`users/${user}/learn/${set}/game/${item.id}`);

  setRef
    .get()
    .then(doc => {
      const { amount, isCompleted, knowledge: prevKnowledge } = doc.data();
      wasCompleted = isCompleted;

      if (prevKnowledge) {
        if (newRatio >= minRatio && newRatio <= maxRatio) {
          knowledge = prevKnowledge + (isCorrect ? 1 : -1);
        } else {
          knowledge = prevKnowledge;
        }
      } else {
        knowledge = isCorrect ? 1 : 0;
      }

      itemsRef
        .get()
        .then(snapshot => {
          const isCompleted = snapshot.docs.every(doc => doc.data().isMastered);

          if (isCompleted) {
            setRef.update({
              isCompleted: true
            });

            if (!wasCompleted) {
              userRef.update({
                notification: "Congrats! You know every term!"
              });
            }
          } else {
            setRef.update({
              knowledge,
              isCompleted: false
            });
          }
        })
    });

  docRef
    .update({
      time,
      isMastered,
      ratio:
        maxRatio < newRatio
          ? maxRatio
          : newRatio < minRatio
            ? minRatio
            : newRatio
    })
    .then(() => {
      dispatch({
        type: "CLEAR_ANSWER"
      });
    });
};

export const setAnimationEnd = isFinished => ({
  type: "ANIMATION_END",
  payload: isFinished
});
