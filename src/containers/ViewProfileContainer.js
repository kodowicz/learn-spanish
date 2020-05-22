import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';

import { openPasswordOverlay } from '../store/actions/overlayActions.js';
import { notificationError } from '../store/actions/notificationActions.js';
import {
  logOut,
  changePassword
} from '../store/actions/authActions';
import {
  changeLocation,
  changeLastLocation
} from '../store/actions/locationActions';

import ViewProfile from '../pages/ViewProfile';

const ViewProfileContainer = (props) => {

  if (props.isLoaded) {
    // user logged
    return (
      <ViewProfile
        userSets={props.userSets}
        user={props.user}
        uid={props.uid}
        authError={props.authError}
        isPasswordOverlay={props.isPasswordOverlay}
        logOut={props.logOut}
        openPasswordOverlay={props.openPasswordOverlay}
        changePassword={props.changePassword}
        notificationError={props.notificationError}
        changeLocation={props.changeLocation}
        changeLastLocation={props.changeLastLocation}
      />
    )
  } else if (!props.isLoaded || props.authError === "logout") {
    // stranger
    return (
      <ViewProfile
        logOut={props.logOut}
        changeLocation={props.changeLocation}
        changeLastLocation={props.changeLastLocation}
      />
    )
  } else {
    return <></>
  }
}


const mapStateToProps = state => {
  const uid = state.firebase.auth.uid;
  const userSets = state.firestore.ordered.userSets;

  return {
    uid,
    userSets,
    user: state.firebase.profile,
    authError: state.auth.authError,
    isPasswordOverlay: state.isPasswordOverlayOpen.isChanged,
    isLoaded: isLoaded(userSets)
  }
}

export default compose(
  connect(
    mapStateToProps,
    {
      logOut,
      openPasswordOverlay,
      changePassword,
      notificationError,
      changeLocation,
      changeLastLocation
    }
  ),
  firestoreConnect(props => {
    return props.uid ?
      [{
        collection: 'users',
        doc: props.uid,
        subcollections: [{ collection: 'learn' }],
        storeAs: 'userSets'
      }]
      :
      [] // if user refreshes the page
  })
)(ViewProfileContainer);
