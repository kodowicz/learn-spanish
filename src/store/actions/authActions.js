export const signIn = data => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();

  firebase.auth().signInWithEmailAndPassword(
    data.email,
    data.password
  )
  .then(() => dispatch({ type: 'LOGIN_SUCCESS' }))
  .catch(error =>
    dispatch({
      type: 'LOGIN_ERROR',
      error
    })
  )
}

export const signUp = newUser => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const firestore = getFirestore();

  firebase.auth().createUserWithEmailAndPassword(
    newUser.email,
    newUser.password
  )
  .then((resp) => {
    return firestore.collection('users').doc(resp.uid).set({
      email: newUser.email,
      username: newUser.username,
      unsavedSet: ""
    })
  })
  .then(() => dispatch({ type: 'SIGNUP_SUCCESS' }))
  .catch(error =>
    dispatch({
      type: 'SIGNUP_ERROR',
      error
    })
  )
}

export const logOut = () => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();

  firebase.auth().signOut()
  .then(() => dispatch({ type: 'SIGNOUT_SUCCESS'}))

}

export const cleanError = () => ({
  type: 'CLEAN_UP'
})

export const signUpError = message => ({
  type: 'INVALID_DATA',
  message
})
