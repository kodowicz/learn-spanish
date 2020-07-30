import React from 'react';
import { connect } from 'react-redux';
import { deleteSetChanges } from '../store/actions/editSetActions';
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
    isMobile={props.isMobile}
    isOpen={props.isOpen}
    location={props.location}
    match={props.match}
    goBack={props.goBack}
    handleMenu={props.handleMenu}
    cancelSesion={props.cancelSesion}
    chooseMethod={props.chooseMethod}
    askForDeleting={props.askForDeleting}
    deleteSetChanges={props.deleteSetChanges}
    closeChangePassword={props.closeChangePassword}
  />
);

const mapStateToProps = (state, ownProps) => {
  const isMobile = window.innerWidth < 768;

  return {
    isMobile,
    uid: state.firebase.auth.uid,
    isOpen: isMobile ? state.navigation.isOpen : true,
    location: state.navigation.location,
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
    closeChangePassword
  }
)(NavbarContainer)
