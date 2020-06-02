import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';

import { cancelSesion } from '../store/actions/overlayActions';
import {
  changeLocation,
  changeLastLocation,
  setCurrentSetId
} from '../store/actions/locationActions';
import {
  createPlaySet,
  clearGameAnswer,
  chooseOption
} from '../store/actions/playSetActions';

import PlaySet from '../pages/PlaySet';


const PlaySetContainer = (props) => {

  return (props.isLoaded && props.terms.length !== 0) ?
    <PlaySet
      setid={props.setid}
      terms={props.terms}
      answer={props.answer}
      isOverlayOpen={props.isOverlayOpen}
      // createPlaySet={props.createPlaySet}
      changeLocation={props.changeLocation}
      changeLastLocation={props.changeLastLocation}
      setCurrentSetId={props.setCurrentSetId}
      cancelSesion={props.cancelSesion}
      clearGameAnswer={props.clearGameAnswer}
      chooseOption={props.chooseOption}
    />
    :
    <></>
};


const mapStateToProps = (state, ownProps) => {
  const terms = state.firestore.ordered.learnTerms;

  return {
    terms,
    setid: ownProps.match.params.id,
    uid: state.firebase.auth.uid,
    answer: state.gameAnswer,
    location: state.location,
    lastLocation: state.lastLocation,
    isOverlayOpen: state.isOverlayOpen.isCancelled,
    isLoaded: isLoaded(terms)
  }
}

export default compose(
  connect(
    mapStateToProps,
    {
      createPlaySet,
      changeLocation,
      changeLastLocation,
      setCurrentSetId,
      cancelSesion,
      clearGameAnswer,
      chooseOption
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
