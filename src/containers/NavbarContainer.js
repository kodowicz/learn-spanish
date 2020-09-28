import React from 'react';
import { connect } from 'react-redux';
import { deleteSetChanges } from '../store/actions/editSetActions';
import { createBasicTerms } from '../store/actions/createSetActions';
import { handleMenu } from '../store/actions/navigationActions';
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
    isOpen={props.isOpen}
    isLogged={props.isLogged}
    isPageLonger={props.isPageLonger}
    location={props.location}
    lastLocation={props.lastLocation}
    match={props.match}
    goBack={props.goBack}
    handleMenu={props.handleMenu}
    cancelSesion={props.cancelSesion}
    chooseMethod={props.chooseMethod}
    askForDeleting={props.askForDeleting}
    deleteSetChanges={props.deleteSetChanges}
    closeChangePassword={props.closeChangePassword}
    createBasicTerms={props.createBasicTerms}
  />
);

const mapStateToProps = (state, ownProps) => {
  const pageHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;
  let isPageLonger = false;

  if (pageHeight > windowHeight) {
    isPageLonger = true
  }

  return {
    uid: state.firebase.auth.uid,
    isPageLonger,
    isOpen: state.navigation.isOpen,
    isLogged: state.navigation.isLogged,
    location: state.navigation.location,
    lastLocation: state.navigation.lastLocation,
    goBack: ownProps.history.goBack
  }
};

export default connect(
  mapStateToProps,
  {
    handleMenu,
    cancelSesion,
    chooseMethod,
    askForDeleting,
    deleteSetChanges,
    closeChangePassword,
    createBasicTerms
  }
)(NavbarContainer)
