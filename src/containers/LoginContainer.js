import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUp, signIn, cleanError, signUpError } from '../store/actions/authActions';
import { changeLocation, changeLastLocation } from '../store/actions/locationActions';
import Login from '../pages/Login';


const LoginContainer = (props) => (
  <Login
    auth={props.auth}
    authError={props.authError}
    signIn={props.signIn}
    signUp={props.signUp}
    signUpError={props.signUpError}
  />
)


const mapStateToProps = state => ({
  auth: state.firebase.auth,
  authError: state.auth.authError
});

export default connect(
  mapStateToProps,
  { signIn, signUp, cleanError, signUpError, changeLocation, changeLastLocation }
)(LoginContainer);
