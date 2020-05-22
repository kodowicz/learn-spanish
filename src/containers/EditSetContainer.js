import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';

import { askForDeleting } from '../store/actions/overlayActions';
import { deleteEditSet } from '../store/actions/deleteSetActions';
import { createSetError } from '../store/actions/notificationActions';
import {
  changeLocation,
  changeLastLocation,
  setCurrentSetId
} from '../store/actions/locationActions';
import {
  createEditSet,
  editSetName,
  updateTerm,
  removeTerm,
  addNewTerm,
  submitEditSet,
  deleteSetChanges
} from '../store/actions/editSetActions';

import EditSet from '../pages/EditSet';


const EditSetContainer = (props) => {
  return props.isLoaded ?
    <EditSet
      terms={props.terms}
      setName={props.setName}
      uid={props.uid}
      setid={props.setid}
      location={props.location}
      lastLocation={props.lastLocation}
      isEditSubmited={props.isEditSubmited}
      isDeletingOverlay={props.isDeletingOverlay}
      isSetDeleted={props.isSetDeleted}
      changeLocation={props.changeLocation}
      changeLastLocation={props.changeLastLocation}
      setCurrentSetId={props.setCurrentSetId}
      askForDeleting={props.askForDeleting}
      createEditSet={props.createEditSet}
      editSetName={props.editSetName}
      updateTerm={props.updateTerm}
      removeTerm={props.removeTerm}
      addNewTerm={props.addNewTerm}
      submitEditSet={props.submitEditSet}
      deleteEditSet={props.deleteEditSet}
      createSetError={props.createSetError}
      deleteSetChanges={props.deleteSetChanges}
    />
  :
    <></>
};


const mapStateToProps = (state, ownProps) => {
  const terms = state.firestore.ordered.editedTerms;
  const editSetDetails = state.firestore.data.editSetDetails;
  const setName = editSetDetails && editSetDetails.editedSet;

  return {
    terms,
    setName,
    uid: state.firebase.auth.uid,
    setid: ownProps.match.params.id,
    isDeletingOverlay: state.isDeletingSetOverlayOpen,
    isSetDeleted: state.isSetDeleted,
    isEditSubmited: state.isEditSubmited,
    isNewTerm: state.isNewTerm,
    location: state.location,
    lastLocation: state.lastLocation,
    isLoaded: isLoaded(terms, editSetDetails)
  }
}

export default compose(
  connect(
    mapStateToProps,
    {
      createEditSet,
      editSetName,
      updateTerm,
      removeTerm,
      addNewTerm,
      submitEditSet,
      deleteEditSet,
      createSetError,
      deleteSetChanges,
      changeLocation,
      changeLastLocation,
      setCurrentSetId,
      askForDeleting
    }
  ),
  firestoreConnect(props => {
    return props.uid ?
      [
        {
          collection: 'users',
          doc: props.uid,
          storeAs: 'editSetDetails'
        },
        {
          collection: 'users',
          doc: props.uid,
          subcollections: [{
            collection: 'edit',
            doc: props.match.params.id,
            subcollections: [{
              collection: 'terms'
            }]
          }],
          storeAs: 'editedTerms',
          orderBy: ['time']
        }
      ]
    :
      []
  })
)(EditSetContainer);
