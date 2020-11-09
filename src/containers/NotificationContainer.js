import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import {
  removeNotification,
  removeLogoutNotification
} from "../store/actions/notificationActions";

import Notification from "../components/navbar/Notification";

const NotificationContainer = props => {
  return props.message ? (
    <Notification
      message={props.message}
      removeNotification={props.removeNotification}
      removeLogoutNotification={props.removeLogoutNotification}
    />
  ) : (
    <></>
  );
};

const mapStateToProps = state => {
  const uid = state.firebase.auth.uid;
  const userDetails = state.firestore.data.user;

  return {
    uid: state.firebase.auth.uid,
    message: userDetails?.notification || state.auth.authError
  };
};

export default compose(
  connect(
    mapStateToProps,
    {
      removeNotification,
      removeLogoutNotification
    }
  ),
  firestoreConnect(props => {
    return props.uid
      ? [
          {
            collection: "users",
            doc: props.uid,
            storeAs: "user"
          }
        ]
      : [];
  })
)(NotificationContainer);
