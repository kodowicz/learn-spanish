import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';

import { cancelSesion } from '../store/actions/overlayActions';
import {
  changeLocation,
  changeLastLocation,
  setCurrentSetId
} from '../store/actions/navigationActions';
import {
  createPlaySet,
  showGameAnswer,
  cleanGameAnswer
} from '../store/actions/playSetActions';

import PlaySet from '../pages/PlaySet';


const PlaySetContainer = (props) => {
  return props.isLoaded ?
    <PlaySet
      setid={props.setid}
      terms={props.terms}
      answer={props.answer}
      correctItem={props.correctItem}
      isOverlayOpen={props.isOverlayOpen}
      changeLocation={props.changeLocation}
      changeLastLocation={props.changeLastLocation}
      setCurrentSetId={props.setCurrentSetId}
      cancelSesion={props.cancelSesion}
      showGameAnswer={props.showGameAnswer}
      cleanGameAnswer={props.cleanGameAnswer}
      changeKnowledge={props.changeKnowledge}
    />
  :
    <></>
};


const mapStateToProps = (state, ownProps) => {
  const terms = state.firestore.ordered.playTerms;
  const details = state.firestore.ordered.playDetails;
  const isFullyFetched = (terms?.length == details?.[0]?.amount);

  return {
    terms,
    isLoaded: isLoaded(terms, details) && (terms?.length == details?.[0]?.amount),
    setid: ownProps.match.params.id,
    uid: state.firebase.auth.uid,
    answer: state.gameAnswer.answer,
    correctItem: state.gameAnswer.item,
    location: state.navigation.location,
    lastLocation: state.navigation.lastLocation,
    isOverlayOpen: state.isOverlayOpen.isCancelled
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
      showGameAnswer,
      cleanGameAnswer
    }
  ),
  firestoreConnect(props => {
    return props.uid ?
      [
        {
          collection: 'users',
          doc: props.uid,
          subcollections: [{
            collection: 'learn',
            doc: props.match.params.id,
            subcollections: [{ collection: 'game' }]
          }],
          storeAs: 'playTerms'
        },
        {
          collection: 'users',
          doc: props.uid,
          subcollections: [
            {
              collection: 'learn',
              doc: props.match.params.id
            }
          ],
          storeAs: 'playDetails'
        }
      ]
      :
      []
  })
)(PlaySetContainer)
