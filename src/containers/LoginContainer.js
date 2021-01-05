import React from "react";
import { connect } from "react-redux";
import { setNotification } from "../store/actions/notificationActions";
import {
  changeLocation,
  changeLastLocation,
  setContentHeight
} from "../store/actions/navigationActions";
import {
  signUp,
  signIn,
  guestLogin
} from "../store/actions/authActions";

import Login from "../pages/Login";

const LoginContainer = props => (
  <Login
    auth={props.auth}
    authError={props.authError}
    signIn={props.signIn}
    signUp={props.signUp}
    guestLogin={props.guestLogin}
    setNotification={props.setNotification}
    changeLocation={props.changeLocation}
    changeLastLocation={props.changeLastLocation}
    setContentHeight={props.setContentHeight}
  />
);

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  authError: state.notification
});

export default connect(
  mapStateToProps,
  {
    signIn,
    signUp,
    guestLogin,
    setNotification,
    changeLocation,
    changeLastLocation,
    setContentHeight
  }
)(LoginContainer);
