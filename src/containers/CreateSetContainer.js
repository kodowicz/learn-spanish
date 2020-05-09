import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase'
import { compose } from 'redux'
import { askForDeleting } from '../store/actions/overlayActions';
import {
  changeLocation,
  changeLastLocation
} from '../store/actions/locationActions';
import {
  setUnsavedName,
  basicTwoTerms,
  updateUnsavedTerm,
  addNewUnsavedTerm,
  removeUnsavedTerm,
  submitSet,
  deleteUnsavedSet
} from '../store/actions/createSetActions';

import CreateSet from '../pages/CreateSet';


const CreateSetContainer = (props) => {
  return props.isLoaded ?
    <CreateSet
      auth={props.auth}
      location={props.location}
      lastLocation={props.lastLocation}
      isSetDeleted={props.isSetDeleted}
      unsavedSetName={props.unsavedSetName}
      unsavedSetTerms={props.unsavedSetTerms}
      isTermAdded={props.isTermAdded}
      isNewTerm={props.isNewTerm}
      newSetKey={props.newSetKey}
      changeLocation={props.changeLocation}
      changeLastLocation={props.changeLastLocation}
      askForDeleting={props.askForDeleting}
      setUnsavedName={props.setUnsavedName}
      basicTwoTerms={props.basicTwoTerms}
      updateUnsavedTerm={props.updateUnsavedTerm}
      addNewUnsavedTerm={props.addNewUnsavedTerm}
      removeUnsavedTerm={props.removeUnsavedTerm}
      submitSet={props.submitSet}
      deleteUnsavedSet={props.deleteUnsavedSet}
    />
    :
    <></>
};


const mapStateToProps = state => {
  const unsavedSetTerms = state.firestore.ordered.unsavedTerms;
  const unsavedSetName = state.firebase.profile.unsavedSet;

  return ({
    unsavedSetName,
    unsavedSetTerms,
    auth: state.firebase.auth,
    location: state.location,
    lastLocation: state.lastLocation,
    isSetDeleted: state.isSetDeletedOverlayOpen,
    isTermAdded: state.isTermAdded,
    isNewTerm: state.isNewTerm,
    newSetKey: state.newSetKey,
    isLoaded: isLoaded(unsavedSetTerms, unsavedSetName)
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
      deleteUnsavedSet,
      changeLocation,
      changeLastLocation,
      askForDeleting
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
