import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase'
import { compose } from 'redux'

import { askForDeleting } from '../store/actions/overlayActions';
import { deleteCreateSet } from '../store/actions/deleteSetActions';
import { notificationError } from '../store/actions/notificationActions';
import {
  changeLocation,
  changeLastLocation
} from '../store/actions/navigationActions';
import {
  setUnsavedName,
  createBasicTerms,
  updateUnsavedTerm,
  addNewUnsavedTerm,
  removeUnsavedTerm,
  submitCreateSet
} from '../store/actions/createSetActions';

import CreateSet from '../pages/CreateSet';


const CreateSetContainer = (props) => {
  return props.isLoaded ?
    <CreateSet
      uid={props.uid}
      location={props.location}
      lastLocation={props.lastLocation}
      isOverlayOpen={props.isOverlayOpen}
      isSetDeleted={props.isSetDeleted}
      isEditSubmited={props.isEditSubmited}
      unsavedSetName={props.unsavedSetName}
      unsavedSetTerms={props.unsavedSetTerms}
      isTermAdded={props.isTermAdded}
      isNewTerm={props.isNewTerm}
      newSetKey={props.newSetKey}
      changeLocation={props.changeLocation}
      changeLastLocation={props.changeLastLocation}
      askForDeleting={props.askForDeleting}
      setUnsavedName={props.setUnsavedName}
      createBasicTerms={props.createBasicTerms}
      updateUnsavedTerm={props.updateUnsavedTerm}
      addNewUnsavedTerm={props.addNewUnsavedTerm}
      removeUnsavedTerm={props.removeUnsavedTerm}
      submitCreateSet={props.submitCreateSet}
      deleteCreateSet={props.deleteCreateSet}
      notificationError={props.notificationError}
    />
  :
    <></>
};


const mapStateToProps = state => {
  const unsavedSetTerms = state.firestore.ordered.unsavedTerms;
  const unsavedSetName = state.firebase.profile.unsavedSet;
  const uid = state.firebase.auth.uid;
  
  return {
    unsavedSetTerms,
    unsavedSetName,
    uid,
    isOverlayOpen: state.isOverlayOpen.isDeleted,
    isSetDeleted: state.isSetDeleted,
    isEditSubmited: state.isEditSubmited,
    isTermAdded: state.isTermAdded,
    isNewTerm: state.isNewTerm,
    newSetKey: state.newSetKey,
    location: state.navigation.location,
    lastLocation: state.navigation.lastLocation,
    isLoaded: uid ? isLoaded(unsavedSetTerms, unsavedSetName) : true
  }
}

export default compose(
  connect(
    mapStateToProps,
    {
      setUnsavedName,
      createBasicTerms,
      updateUnsavedTerm,
      addNewUnsavedTerm,
      removeUnsavedTerm,
      submitCreateSet,
      deleteCreateSet,
      changeLocation,
      changeLastLocation,
      askForDeleting,
      notificationError
    }
  ),
  firestoreConnect(props => {
    return props.uid ?
      [{
        collection: 'users',
        doc: props.uid,
        subcollections: [{ collection: 'unsaved' }],
        storeAs: 'unsavedTerms',
        orderBy: ['time']
      }]
    :
      []
  })
)(CreateSetContainer);
