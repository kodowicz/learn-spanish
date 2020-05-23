import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';

import { cancelSesion } from '../store/actions/overlayActions';
import { createPlaySet } from '../store/actions/playSetActions';
import {
  changeLocation,
  changeLastLocation,
  setCurrentSetId
} from '../store/actions/locationActions';

import PlaySet from '../pages/PlaySet';


const PlaySetContainer = (props) => {
  return props.isLoaded ?
    <PlaySet
      setid={props.setid}
      terms={props.terms}
      isOverlayOpen={props.isOverlayOpen}
      createPlaySet={props.createPlaySet}
      changeLocation={props.changeLocation}
      changeLastLocation={props.changeLastLocation}
      setCurrentSetId={props.setCurrentSetId}
      cancelSesion={props.cancelSesion}
    />
    :
    <></>
};


const mapStateToProps = (state, ownProps) => {
  const terms = state.firestore.ordered.learnTerms;

  return {
    setid: ownProps.match.params.id,
    terms: terms && shuffleTerms(terms),
    uid: state.firebase.auth.uid,
    location: state.location,
    lastLocation: state.lastLocation,
    isOverlayOpen: state.isOverlayOpen.isCancelled,
    isLoaded: isLoaded(terms)
  }
}

const shuffleTerms = (array) => {
  let counter = array.length - 1;
  let newOrder = [...array];

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    let temp = newOrder[counter];
    newOrder[counter] = newOrder[index];
    newOrder[index] = temp;
    counter--;
  }

  return newOrder;
}

export default compose(
  connect(
    mapStateToProps,
    {
      createPlaySet,
      changeLocation,
      changeLastLocation,
      setCurrentSetId,
      cancelSesion
    }
  ),
  firestoreConnect(props => {
    return props.uid ?
      [{
        collection: 'users',
        doc: props.uid,
        subcollections: [{
          collection: 'learn',
          doc: props.match.params.id,
          subcollections: [{ collection: 'game' }]
        }],
        storeAs: 'learnTerms'
      }]
      :
      []
  })
)(PlaySetContainer)
