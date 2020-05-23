export const createPlaySet = setid => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firestore = getFirestore();
  const user = getState().firebase.auth.uid;

  const setRef = firestore.collection(`sets/${setid}/terms`);
  const playSetRef = firestore.collection(`users/${user}/learn/${setid}/game`);

  playSetRef.get().then(snap => {
    if (!snap.size) {
      setRef.get().then(snapshot => {

        snapshot.forEach(doc => {
          const { term, definition, time } = doc.data();
          const termRef = playSetRef.doc();
          const id = termRef.id;
          const ratio = 0;

          termRef.set({
            id,
            term,
            definition,
            time,
            ratio
          })
        })
      })
    }
  })

}
