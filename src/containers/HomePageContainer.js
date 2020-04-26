import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { changeLocation, changeLastLocation } from '../store/actions/locationActions';

import HomePage from '../pages/HomePage';


const HomePageContainer = (props) => {
  return props.isLoaded ?
    <HomePage
      isLogged={props.isLogged}
      userSets={props.userSets}
      allSets={props.allSets}
      changeLocation={props.changeLocation}
      changeLastLocation={props.changeLastLocation}
    />
    :
    <></>
};


const mapStateToProps = (state) => {
  const uid = state.firebase.auth.uid;
  const allSets = state.firestore.ordered.allSets;
  const userSets = state.firestore.ordered.userSets;

  return {
    uid,
    allSets,
    userSets,
    isLogged: uid ? true : false,
    isLoaded: isLoaded(allSets, userSets)
  }
}

export default compose(
  connect(mapStateToProps, { changeLocation, changeLastLocation }),
  firestoreConnect(props => {
    return props.uid ?
      [
        {
          collection: 'sets',
          storeAs: 'allSets'
        },
        {
          collection: 'users',
          doc: props.uid,
          subcollections: [{ collection: 'learn' }],
          storeAs: 'userSets'
        }
      ]
      :
      [] // if user refreshes the page
  })
)(HomePageContainer);
