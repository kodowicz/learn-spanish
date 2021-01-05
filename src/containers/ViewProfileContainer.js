import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";

import { openPasswordOverlay } from "../store/actions/overlayActions.js";
import { logOut, changePassword } from "../store/actions/authActions";
import {
  setNotification,
} from "../store/actions/notificationActions.js";
import {
  changeLocation,
  changeLastLocation,
  setContentHeight
} from "../store/actions/navigationActions";

import ViewProfile from "../pages/ViewProfile";

const ViewProfileContainer = (props) => {
  if (props.isLoaded) {
    // user logged
    return (
      <ViewProfile
        userSets={props.userSets}
        user={props.user}
        uid={props.uid}
        authError={props.authError}
        isOverlayOpen={props.isOverlayOpen}
        logOut={props.logOut}
        openPasswordOverlay={props.openPasswordOverlay}
        changePassword={props.changePassword}
        setNotification={props.setNotification}
        changeLocation={props.changeLocation}
        changeLastLocation={props.changeLastLocation}
        setContentHeight={props.setContentHeight}
      />
    );
  } else if (!props.isLoaded || props.authError === "logout") {
    // stranger
    return (
      <ViewProfile
        logOut={props.logOut}
        changeLocation={props.changeLocation}
        changeLastLocation={props.changeLastLocation}
        setContentHeight={props.setContentHeight}
      />
    );
  } else {
    return <></>;
  }
};

const mapStateToProps = state => {
  const uid = state.firebase.auth.uid;
  const userSets = state.firestore.ordered.userSets;

  return {
    uid,
    userSets,
    user: state.firebase.profile,
    authError: state.notification,
    isOverlayOpen: state.isOverlayOpen.isPassword,
    isLoaded: isLoaded(userSets)
  };
};

export default compose(
  connect(
    mapStateToProps,
    {
      logOut,
      openPasswordOverlay,
      changePassword,
      setNotification,
      changeLocation,
      changeLastLocation,
      setContentHeight
    }
  ),
  firestoreConnect(props => {
    return props.uid
      ? [
          {
            collection: "users",
            doc: props.uid,
            subcollections: [{ collection: "learn" }],
            storeAs: "userSets"
          }
        ]
      : []; // if user refreshes the page
  })
)(ViewProfileContainer);
