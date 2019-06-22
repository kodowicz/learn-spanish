// if firebase updating subcollections worked this function wouldn't be neccessery
export const fetchTerms = terms => ({
  type: 'FETCH_TERMS',
  terms
})

export const shuffleCard = term => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firestore = getFirestore();
  const user = getState().firebase.auth.uid;
  const set = getState().setId;
  const newTime = new Date();

  const docRef = firestore.doc(`users/${user}/learn/${set}/basic/${term.id}`);

  docRef.update({
    time: newTime
  })
  .then(() => {
    dispatch({
      type: 'SHUFFLE_CARD',
      time: term.time,
      newTime: newTime.getTime()
    })
  }).catch(error => {
    dispatch({
      type: 'SHUFFLE_CARD_ERROR',
      error
    })
  })
}

export const throwoutCard = term => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firestore = getFirestore();
  const user = getState().firebase.auth.uid;
  const set = getState().setId;

  const docRef = firestore.doc(`users/${user}/learn/${set}/basic/${term}`);

  docRef.delete()
  .then(() => {
    dispatch({
      type: 'THROWOUT_CARD',
      id: term
    })
  }).catch(error => {
    dispatch({
      type: 'THROWOUT_CARD_ERROR',
      error
    })
  })
}

export const isCardShuffled = (isShuffled) => ({
  type: 'SHUFFLED_CARD',
  isShuffled
})
