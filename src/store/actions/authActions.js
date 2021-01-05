export const signIn = data => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();

  firebase
    .auth()
    .signInWithEmailAndPassword(data.email, data.password)
    .then(() =>
      dispatch({
        type: "LOGIN_SUCCESS"
      })
    )
    .catch(error =>
      dispatch({
        type: "LOGIN_ERROR",
        error
      })
    );
};

// guest account created only for an easy app review
export const guestLogin = () => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();

  firebase
    .auth()
    .signInWithEmailAndPassword("guest@gmail.com", "password")
    .then(() =>
      dispatch({
        type: "LOGIN_SUCCESS"
      })
    )
    .catch(error =>
      dispatch({
        type: "LOGIN_ERROR",
        error
      })
    );
};

export const signUp = newUser => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const firestore = getFirestore();

  firebase
    .auth()
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then(resp => {
      return firestore
        .collection("users")
        .doc(resp.user.uid)
        .set({
          email: newUser.email,
          username: newUser.username,
          unsavedSet: "",
          notification: "",
          editedSet: ""
        });
    })
    .then(() =>
      dispatch({
        type: "SIGNUP_SUCCESS"
      })
    )
    .catch(error =>
      dispatch({
        type: "SIGNUP_ERROR",
        error
      })
    );
};

export const logOut = () => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();

  firebase
    .auth()
    .signOut()
    .then(() =>
      dispatch({
        type: "LOGOUT_SUCCESS"
      })
    )
    .catch(error =>
      dispatch({
        type: "LOGOUT_ERROR",
        error
      })
    );
};

export const changePassword = data => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;

  const credential = firebase.auth.EmailAuthProvider.credential(
    user.email,
    data.password
  );

  user
    .reauthenticateWithCredential(credential)
    .then(() => {
      firebase.auth().currentUser.updatePassword(data.newpassword);
      dispatch({
        type: "CHANGE_PASSWORD"
      });
    })
    .catch(error => {
      dispatch({
        type: "CHANGE_PASSWORD_ERROR"
      });
    });
};
