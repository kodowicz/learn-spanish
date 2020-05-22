import React from 'react';
import { connect } from 'react-redux';
import { deleteSetChanges } from '../store/actions/editSetActions';
import {
  cancelSesion,
  chooseMethod,
  askForDeleting,
  closeChangePassword
} from '../store/actions/overlayActions';

import NavBar from '../components/navbar/Navbar';


const NavbarContainer = (props) => (
  <NavBar
    uid={props.uid}
    location={props.location}
    match={props.match}
    goBack={props.goBack}
    cancelSesion={props.cancelSesion}
    chooseMethod={props.chooseMethod}
    askForDeleting={props.askForDeleting}
    deleteSetChanges={props.deleteSetChanges}
    closeChangePassword={props.closeChangePassword}
  />
);

const mapStateToProps = (state, ownProps) => ({
  uid: state.firebase.auth.uid,
  location: state.location,
  goBack: ownProps.history.goBack
});

export default connect(
  mapStateToProps,
  {
    cancelSesion,
    chooseMethod,
    askForDeleting,
    deleteSetChanges,
    closeChangePassword
  }
)(NavbarContainer)
