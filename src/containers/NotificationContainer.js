import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { cleanNotification } from "../store/actions/notificationActions";

import Notification from "../components/navbar/Notification";

const NotificationContainer = props => {
  return props.message ? (
    <Notification
      message={props.message}
      cleanNotification={props.cleanNotification}
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
    message: state.notification
  };
};

export default connect(
  mapStateToProps,
  { cleanNotification }
)(NotificationContainer);
