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
  clearGameAnswer,
  chooseOption
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
      // createPlaySet={props.createPlaySet}
      changeLocation={props.changeLocation}
      changeLastLocation={props.changeLastLocation}
      setCurrentSetId={props.setCurrentSetId}
      cancelSesion={props.cancelSesion}
      clearGameAnswer={props.clearGameAnswer}
      chooseOption={props.chooseOption}
      changeKnowledge={props.changeKnowledge}
    />
  :
    <></>
};


const mapStateToProps = (state, ownProps) => {
  const ordered = state.firestore.ordered;
  const terms = ordered.playTerms;
  const details = ordered.playDetails && ordered.playDetails[0];

  return {
    terms,
    isLoaded: isLoaded(terms, details),
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
      clearGameAnswer,
      chooseOption
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
