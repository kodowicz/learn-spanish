import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { logOut } from '../store/actions/authActions';
import { changeLocation, changeLastLocation } from '../store/actions/locationActions';

import ViewProfile from '../pages/ViewProfile';


const ViewProfileContainer = (props) => {
  return props.isLoaded ?
    <ViewProfile
      userSets={props.userSets}
      user={props.user}
      uid={props.uid}
      logOut={props.logOut}
      changeLocation={props.changeLocation}
      changeLastLocation={props.changeLastLocation}
    />
  :
    <></>
}


const mapStateToProps = state => {
  const uid = state.firebase.auth.uid;
  const sets = state.firestore.ordered.sets;
  const userSets = sets ? sets.filter(set => set.authorId === uid) : [];

  return {
    uid: uid,
    user: state.firebase.profile,
    userSets,
    authError: state.auth.authError,
    isLoaded: isLoaded(sets)
  }
}

export default compose(
  connect(mapStateToProps, { logOut, changeLocation, changeLastLocation }),
  firestoreConnect([
    { collection: 'sets' }
  ])
)(ViewProfileContainer);
