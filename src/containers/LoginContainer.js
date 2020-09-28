import React from 'react';
import { connect } from 'react-redux';
import {
  changeLocation,
  changeLastLocation
} from '../store/actions/navigationActions';
import {
  signUp,
  signIn,
  cleanErrorNotification,
  signUpError
} from '../store/actions/authActions';

import Login from '../pages/Login';


const LoginContainer = (props) => (
  <Login
    auth={props.auth}
    authError={props.authError}
    signIn={props.signIn}
    signUp={props.signUp}
    signUpError={props.signUpError}
    removeNotification={props.cleanErrorNotification}
    changeLocation={props.changeLocation}
    changeLastLocation={props.changeLastLocation}
  />
)


const mapStateToProps = state => ({
  auth: state.firebase.auth,
  authError: state.auth.authError
});

export default connect(
  mapStateToProps,
  {
    signIn,
    signUp,
    signUpError,
    cleanErrorNotification,
    changeLocation,
    changeLastLocation,
  }
)(LoginContainer);
