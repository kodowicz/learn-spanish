export const removeNotification = () => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const authorId = getState().firebase.auth.uid;

  const notificationRef = firestore.doc(`users/${authorId}`);

  notificationRef
    .update({
      notification: ""
    })
    .then(() => {
      dispatch({
        type: "REMOVE_NOTIFICATION"
      });
    })
    .catch(error => {
      dispatch({
        type: "REMOVE_NOTIFICATION_ERROR",
        error
      });
    });
};

// logout notification
export const logoutNotification = () => ({
  type: "LOGOUT_NOTIFICATION"
});

export const removeLogoutNotification = () => ({
  type: "REMOVE_LOGOUT_NOTIFICATION"
});

// error notification
export const setNotification = message => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firestore = getFirestore();
  const uid = getState().firebase.auth.uid;

  const userRef = firestore.doc(`users/${uid}`);

  userRef
    .update({
      notification: message
    })
    .then(() => {
      dispatch({
        type: "USER_NOTIFICATION"
      });
    })
    .catch(error => {
      dispatch({
        type: "USER_NOTIFICATION_ERROR",
        error
      });
    });
};
