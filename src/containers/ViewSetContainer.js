import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';

import { changeLocation, changeLastLocation } from '../store/actions/locationActions';
import { createLearnSet } from '../store/actions/learnSetActions';
import { removeNewKey } from '../store/actions/createSetActions';
import { submitEditedSet } from '../store/actions/editSetActions';

import ViewSet from '../pages/ViewSet';


const ViewSetContainer = (props) => (
  <ViewSet
    match={props.match}
    setDetails={props.setDetails}
    signedUser={props.signedUser}
    author={props.author}
    terms={props.terms}
    lastLocation={props.lastLocation}
    isEditSubmited={props.isEditSubmited}
    changeLocation={props.changeLocation}
    changeLastLocation={props.changeLastLocation}
    removeNewKey={props.removeNewKey}
    submitEditedSet={props.submitEditedSet}
    createLearnSet={props.createLearnSet}
  />
)

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const setDetails = state.firestore.data.setDetails;
  const authorId = setDetails ? setDetails.authorId : null;
  const terms = state.firestore.ordered.terms;

  return {
    setDetails: setDetails,
    signedUser: state.firebase.auth.uid,
    author: authorId,
    terms: terms,
    lastLocation: state.lastLocation,
    isEditSubmited: state.isEditSubmited
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
      createLearnSet
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
