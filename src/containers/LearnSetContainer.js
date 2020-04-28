import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { changeLocation, changeLastLocation, currentSetId } from '../store/actions/locationActions';
import { createLearnSet, shuffleCard, throwoutCard } from '../store/actions/learnSetActions';
import { cancelSesion } from '../store/actions/overlayActions';

import LearnSet from '../pages/LearnSet';


const LearnSetContainer = (props) => {
  return props.isLoaded ?
    <LearnSet
      setid={props.setid}
      terms={props.terms}
      isOverlayOpen={props.isOverlayOpen}
      changeLocation={props.changeLocation}
      changeLastLocation={props.changeLastLocation}
      currentSetId={props.currentSetId}
      cancelSesion={props.cancelSesion}
      shuffleCard={props.shuffleCard}
      throwoutCard={props.throwoutCard}
      createLearnSet={props.createLearnSet}
    />
    :
    <></>
};


const layerCards = (terms) => {
  let layerIndex = 1;

  return terms.map(term => {
    layerIndex -= 1;
    return {
      ...term,
      layerIndex
    }
  })
}

const mapStateToProps = (state, ownProps) => {
  const terms = state.firestore.ordered.learnTerms;

  return {
    setid: ownProps.match.params.id,
    uid: state.firebase.auth.uid,
    location: state.location,
    lastLocation: state.lastLocation,
    isOverlayOpen: state.isCancelOverlayOpen,
    terms: terms ? layerCards(terms) : undefined,
    isLoaded: isLoaded(terms)
  }
}

export default compose(
  connect(
    mapStateToProps,
    { changeLocation, changeLastLocation, currentSetId, cancelSesion, shuffleCard, throwoutCard, createLearnSet }
  ),
  firestoreConnect(props => {
    return props.uid ?
      [{
        collection: 'users',
        doc: props.uid,
        subcollections: [{
          collection: 'learn',
          doc: props.match.params.id,
          subcollections: [{ collection: 'basic' }]
        }],
        storeAs: 'learnTerms',
        orderBy: ["time"]
      }]
      :
      []
  })
)(LearnSetContainer)
