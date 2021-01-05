import * as types from "../../constants/actionTypes";

export const signIn = data => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();

  firebase
    .auth()
    .signInWithEmailAndPassword(data.email, data.password)
    .then(() =>
      dispatch({
        type: types.LOGIN_SUCCESS
      })
    )
    .catch(error =>
      dispatch({
        type: types.LOGIN_ERROR,
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
        type: types.LOGIN_SUCCESS
      })
    )
    .catch(error =>
      dispatch({
        type: types.LOGIN_ERROR,
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
        type: types.SIGNUP_SUCCESS
      })
    )
    .catch(error =>
      dispatch({
        type: types.SIGNUP_ERROR,
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
        type: types.LOGOUT_SUCCESS
      })
    )
    .catch(error =>
      dispatch({
        type: types.LOGOUT_ERROR,
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
        type: types.CHANGE_PASSWORD
      });
    })
    .catch(error => {
      dispatch({
        type: types.CHANGE_PASSWORD_ERROR
      });
    });
};
