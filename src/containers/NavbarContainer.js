import React from 'react';
import { connect } from 'react-redux';
import { cancelSesion } from '../store/actions/overlayActions';

import NavBar from '../components/navbar/Navbar';


const NavbarContainer = (props) => (
  <NavBar
    uid={props.uid}
    location={props.location}
    goBack={props.goBack}
    cancelSesion={props.cancelSesion}
  />
);

const mapStateToProps = (state, ownProps) => ({
  uid: state.firebase.auth.uid,
  location: state.location,
  goBack: ownProps.history.goBack
});

export default connect(mapStateToProps, { cancelSesion })(NavbarContainer)
