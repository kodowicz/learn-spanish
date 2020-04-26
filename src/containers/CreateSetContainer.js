import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase'
import { compose } from 'redux'
import { changeLocation, changeLastLocation } from '../store/actions/locationActions';
import { setUnsavedName, basicTwoTerms, updateUnsavedTerm, addNewUnsavedTerm, removeUnsavedTerm, submitSet } from '../store/actions/createSetActions';

import CreateSet from '../pages/CreateSet';


const CreateSetContainer = (props) => {
  return props.isLoaded ?
    <CreateSet
      auth={props.auth}
      location={props.location}
      lastLocation={props.lastLocation}
      unsavedSetName={props.unsavedSetName}
      unsavedSetTerms={props.unsavedSetTerms}
      isTermAdded={props.isTermAdded}
      isNewTerm={props.isNewTerm}
      newSetKey={props.newSetKey}
      changeLocation={props.changeLocation}
      changeLastLocation={props.changeLastLocation}
      setUnsavedName={props.setUnsavedName}
      basicTwoTerms={props.basicTwoTerms}
      updateUnsavedTerm={props.updateUnsavedTerm}
      addNewUnsavedTerm={props.addNewUnsavedTerm}
      removeUnsavedTerm={props.removeUnsavedTerm}
      submitSet={props.submitSet}
    />
    :
    <></>
};


const mapStateToProps = state => {
  const unsavedSetTerms = state.firestore.ordered.unsavedTerms;
  const unsavedSetName = state.firebase.profile.unsavedSet;
  return ({
    auth: state.firebase.auth,
    location: state.location,
    lastLocation: state.lastLocation,
    unsavedSetName,
    unsavedSetTerms,
    isTermAdded: state.isTermAdded,
    isNewTerm: state.isNewTerm,
    newSetKey: state.newSetKey,
    isLoaded: isLoaded(unsavedSetTerms)
  })
}

export default compose(
  connect(
    mapStateToProps,
    {
      setUnsavedName,
      basicTwoTerms,
      updateUnsavedTerm,
      addNewUnsavedTerm,
      removeUnsavedTerm,
      submitSet,
      changeLocation,
      changeLastLocation
    }
  ),
  firestoreConnect(props => {
    return props.auth.uid ?
      [{
        collection: 'users',
        doc: props.auth.uid,
        subcollections: [{ collection: 'unsaved' }],
        storeAs: 'unsavedTerms',
        orderBy: ["time"]
      }]
    :
      []
  })
)(CreateSetContainer);
