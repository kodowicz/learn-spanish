export const removeNotification = () => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const authorId = getState().firebase.auth.uid;

  const notificationRef = firestore.doc(`users/${authorId}`);

  notificationRef.update({
    notification: ''
  })
  .then(() => {
    dispatch({
      type: 'REMOVE_NOTIFICATION'
    })
  }).catch(error => {
    dispatch({
      type: 'REMOVE_NOTIFICATION_ERROR',
      error
    })
  })
}
