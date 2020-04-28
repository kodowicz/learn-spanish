import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';

import { changeLocation, changeLastLocation } from '../store/actions/locationActions';
import { chooseMethod } from '../store/actions/overlayActions';
import { createLearnSet } from '../store/actions/learnSetActions';
import { createPlaySet } from '../store/actions/playSetActions';
import { removeNewKey } from '../store/actions/createSetActions';
import { submitEditedSet } from '../store/actions/editSetActions';

import ViewSet from '../pages/ViewSet';


const ViewSetContainer = (props) => {
  return props.isLoaded ?
    <ViewSet
      match={props.match}
      setDetails={props.setDetails}
      signedUser={props.signedUser}
      author={props.author}
      terms={props.terms}
      lastLocation={props.lastLocation}
      isEditSubmited={props.isEditSubmited}
      isOverlayOpen={props.isOverlayOpen}
      changeLocation={props.changeLocation}
      changeLastLocation={props.changeLastLocation}
      removeNewKey={props.removeNewKey}
      submitEditedSet={props.submitEditedSet}
      chooseMethod={props.chooseMethod}
      createLearnSet={props.createLearnSet}
      createPlaySet={props.createPlaySet}
    />
    :
    <></>
}

const mapStateToProps = (state) => {
  const setDetails = state.firestore.data.setDetails;
  const authorId = setDetails ? setDetails.authorId : null;
  const terms = state.firestore.ordered.terms;

  return {
    setDetails: setDetails,
    signedUser: state.firebase.auth.uid,
    author: authorId,
    terms: terms,
    lastLocation: state.lastLocation,
    isEditSubmited: state.isEditSubmited,
    isOverlayOpen: state.isChoiceOverlayOpen,
    isLoaded: isLoaded(terms)
  }
}

export default compose(
  connect(
    mapStateToProps,
    {
      removeNewKey,
      submitEditedSet,
      changeLocation,
      changeLastLocation,
      chooseMethod,
      createLearnSet,
      createPlaySet
    }
  ),
  firestoreConnect(props => [
    {
      collection: 'sets',
      doc: props.match.params.id,
      storeAs: 'setDetails'
    },
    {
      collection: 'sets',
      doc: props.match.params.id,
      subcollections: [{ collection: 'terms' }],
      storeAs: 'terms',
      orderBy: ["time"]
    }
  ])
)(ViewSetContainer);
