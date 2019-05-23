export const createProject = project => (dispatch, getState, { getFirebase, getFirestore }) => {
  // make async call to database
  const firestore = getFirestore();
  const profile = getState().firebase.profile;
  const authId = getState().firebase.auth.uid;

  firestore.collection('projects').add({
    ...project,
    authorFirstName: profile.firstName,
    authorLastName: profile.lastName,
    authorId: authId,
    createdAt: new Date()
  }).then(() => {
    dispatch({
      type: 'CREATE_PROJECT',
      project
    })
  }).catch(error => {
    dispatch({
      type: 'CREATE_PROJECT_ERROR',
      error
    })
  })
}

export const addUnsavedTerm = project => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firestore = getFirestore();
  const authId = getState().firebase.auth.uid;
  const subcollection = project.id;

  const docRef = firestore.doc(`users/${authId}/unsaved/${subcollection}`);

  docRef.get().then(thisDoc => {
    if (thisDoc.exists) {
      if (thisDoc.data().term !== project.term || thisDoc.data().definition !== project.definition) {
        docRef.update(project)
      }

    } else {
      const newDocument = firestore.collection("users").doc(authId).collection("unsaved").doc();
      const keyId = newDocument.id;

      newDocument.set({
        id: keyId,
        term: project.term,
        definition: project.definition
      })
    }
  })
  .then(() => {
    dispatch({
      type: 'CREATE_UNSAVED_SET'

    })
  }).catch(error => {
    dispatch({
      type: 'CREATE_UNSAVED_SET_ERROR',
      error
    })
  })
}

export const refreshSet = () => ({
  type: 'REFRESHED_SET'
})

export const shuffleCard = () => ({
  type: 'SHUFFLE_CARD',
  move: 'left'
})

export const throwoutCard = () => ({
  type: 'THROWOUT_CARD',
  move: 'right'
})
