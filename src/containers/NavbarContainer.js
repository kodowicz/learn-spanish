import React from "react";
import { connect } from "react-redux";
import { deleteSetChanges } from "../store/actions/editSetActions";
import { createBasicTerms } from "../store/actions/createSetActions";
import { handleMenu, scrollToTop } from "../store/actions/navigationActions";
import {
  cancelSesion,
  chooseMethod,
  askForDeleting,
  closeChangePassword
} from "../store/actions/overlayActions";

import NavBar from "../components/navbar/Navbar";

const NavbarContainer = props => (
  <NavBar
    uid={props.uid}
    isOpen={props.isOpen}
    isLogged={props.isLogged}
    isPageScrollable={props.isPageScrollable}
    isScrollTop={props.isScrollTop}
    location={props.location}
    lastLocation={props.lastLocation}
    match={props.match}
    goBack={props.goBack}
    handleMenu={props.handleMenu}
    scrollToTop={props.scrollToTop}
    cancelSesion={props.cancelSesion}
    chooseMethod={props.chooseMethod}
    askForDeleting={props.askForDeleting}
    deleteSetChanges={props.deleteSetChanges}
    closeChangePassword={props.closeChangePassword}
    createBasicTerms={props.createBasicTerms}
  />
);

const mapStateToProps = (state, ownProps) => {
  const contentHeight = state.navigation.contentHeight;
  const viewportHeight = window.innerHeight;
  let isPageScrollable = contentHeight > viewportHeight;

  return {
    isPageScrollable,
    uid: state.firebase.auth.uid,
    isOpen: state.navigation.isOpen,
    isLogged: state.navigation.isLogged,
    isScrollTop: state.navigation.isScrollTop,
    location: state.navigation.location,
    lastLocation: state.navigation.lastLocation,
    goBack: ownProps.history.goBack
  };
};

export default connect(
  mapStateToProps,
  {
    handleMenu,
    scrollToTop,
    cancelSesion,
    chooseMethod,
    askForDeleting,
    deleteSetChanges,
    closeChangePassword,
    createBasicTerms
  }
)(NavbarContainer);
