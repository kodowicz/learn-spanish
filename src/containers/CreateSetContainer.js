import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase'
import { compose } from 'redux'

import { askForDeleting } from '../store/actions/overlayActions';
import { deleteUnsavedSet } from '../store/actions/deleteSetActions';
import { createSetError } from '../store/actions/notificationActions';
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
  submitSet
} from '../store/actions/createSetActions';

import CreateSet from '../pages/CreateSet';


const CreateSetContainer = (props) => {
  return props.isLoaded ?
    <CreateSet
      auth={props.auth}
      location={props.location}
      lastLocation={props.lastLocation}
      isSetDeleted={props.isSetDeleted} // is overlay opened
      isEditSubmited={props.isEditSubmited} //
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
      createSetError={props.createSetError}
    />
  :
    <></>
};


const mapStateToProps = state => {
  const unsavedSetTerms = state.firestore.ordered.unsavedTerms;
  const unsavedSetName = state.firebase.profile.unsavedSet;

  return ({
    unsavedSetTerms,
    unsavedSetName,
    auth: state.firebase.auth,
    isSetDeleted: state.isSetDeletedOverlayOpen,
    isEditSubmited: state.isEditSubmited,
    isTermAdded: state.isTermAdded,
    isNewTerm: state.isNewTerm,
    newSetKey: state.newSetKey,
    location: state.location,
    lastLocation: state.lastLocation,
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
      askForDeleting,
      createSetError
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
