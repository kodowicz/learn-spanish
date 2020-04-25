import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../components/navbar/Navbar';


const NavbarContainer = (props) => (
  <NavBar
    uid={props.uid}
    location={props.location}
    goBack={props.goBack}
  />
)


const mapStateToProps = (state, ownProps) => ({
  uid: state.firebase.auth.uid,
  location: state.location,
  goBack: ownProps.history.goBack
  // lastLocation: state.lastLocation
})

export default connect(mapStateToProps)(NavbarContainer)
