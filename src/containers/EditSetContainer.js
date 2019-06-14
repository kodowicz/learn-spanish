import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import { changeLocation, changeLastLocation } from '../store/actions/locationActions';
import { editSetName, updateTerm, addNewTerm, removeTerm, submitEditedSet, deleteSet } from '../store/actions/editSetActions';

import EditSet from '../components/dashboard/EditSet';


const EditSetContainer = (props) => (
  <EditSet
    match={props.match}
    signedUser={props.signedUser}
    author={props.author}
    terms={props.terms}
    setId={props.setId}
    setName={props.setName}
    location={props.location}
    lastLocation={props.lastLocation}
    isTermDeleted={props.isTermDeleted}
    isEditSubmited={props.isEditSubmited}
    isSetDeleted={props.isSetDeleted}
    changeLocation={props.changeLocation}
    changeLastLocation={props.changeLastLocation}
    editSetName={props.editSetName}
    addNewTerm={props.addNewTerm}
    updateTerm={props.updateTerm}
    removeTerm={props.removeTerm}
    removeNewKey={props.removeNewKey}
    submitEditedSet={props.submitEditedSet}
    deleteSet={props.deleteSet}
  />
)

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const set = state.firestore.data.set ? state.firestore.data.set[id] : null;
  const authorId = set ? set.authorId : null;
  const terms =  state.firestore.ordered.terms;
  const name = set ? set.name : null;

  return ({
    signedUser: state.firebase.auth.uid,
    author: authorId,
    terms: terms,
    setId: id,
    setName: name,
    isNewTerm: state.isNewTerm,
    isTermDeleted: state.isTermDeleted,
    isEditSubmited: state.isEditSubmited,
    isSetDeleted: state.isSetDeleted,
    location: state.location,
    lastLocation: state.lastLocation
  })
}

export default compose(
  connect(
    mapStateToProps,
    {
      editSetName,
      updateTerm,
      addNewTerm,
      removeTerm,
      submitEditedSet,
      deleteSet,
      changeLocation,
      changeLastLocation
    }
  ),
  firestoreConnect(props => [
    {
      collection: 'sets',
      doc: props.match.params.id,
      storeAs: 'set'
    },
    {
      collection: 'sets',
      doc: props.match.params.id,
      subcollections: [{ collection: 'terms' }],
      storeAs: 'terms',
      orderBy: ["time"]
    }
  ])
)(EditSetContainer);
