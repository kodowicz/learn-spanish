import React from "react";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { compose } from "redux";

import { askForDeleting } from "../store/actions/overlayActions";
import { deleteCreateSet } from "../store/actions/deleteSetActions";
import { setNotification } from "../store/actions/notificationActions";
import {
  changeLocation,
  changeLastLocation,
  setContentHeight
} from "../store/actions/navigationActions";
import {
  setUnsavedName,
  updateUnsavedTerm,
  addNewUnsavedTerm,
  removeUnsavedTerm,
  submitCreateSet
} from "../store/actions/createSetActions";

import CreateSet from "../pages/CreateSet";

const CreateSetContainer = props => {
  return props.isLoaded ? (
    <CreateSet
      uid={props.uid}
      location={props.location}
      lastLocation={props.lastLocation}
      isOverlayOpen={props.isOverlayOpen}
      isSetDeleted={props.isSetDeleted}
      isEditSubmited={props.isEditSubmited}
      setName={props.setName}
      terms={props.terms}
      isTermAdded={props.isTermAdded}
      isNewTerm={props.isNewTerm}
      newSetKey={props.newSetKey}
      changeLocation={props.changeLocation}
      changeLastLocation={props.changeLastLocation}
      setContentHeight={props.setContentHeight}
      askForDeleting={props.askForDeleting}
      setUnsavedName={props.setUnsavedName}
      updateUnsavedTerm={props.updateUnsavedTerm}
      addNewUnsavedTerm={props.addNewUnsavedTerm}
      removeUnsavedTerm={props.removeUnsavedTerm}
      submitCreateSet={props.submitCreateSet}
      deleteCreateSet={props.deleteCreateSet}
      setNotification={props.setNotification}
    />
  ) : (
    <></>
  );
};

const mapStateToProps = state => {
  const terms = state.firestore.ordered.unsavedTerms;
  const setName = state.firebase.profile.unsavedSet;
  const uid = state.firebase.auth.uid;

  return {
    terms,
    setName,
    uid,
    isOverlayOpen: state.isOverlayOpen.isDeleted,
    isSetDeleted: state.isSetDeleted,
    isEditSubmited: state.isEditSubmited,
    isTermAdded: state.isTermAdded,
    isNewTerm: state.isNewTerm,
    newSetKey: state.newSetKey,
    location: state.navigation.location,
    lastLocation: state.navigation.lastLocation,
    isLoaded: uid ? isLoaded(terms, setName) : true
  };
};

export default compose(
  connect(
    mapStateToProps,
    {
      setUnsavedName,
      updateUnsavedTerm,
      addNewUnsavedTerm,
      removeUnsavedTerm,
      submitCreateSet,
      deleteCreateSet,
      changeLocation,
      changeLastLocation,
      setContentHeight,
      askForDeleting,
      setNotification
    }
  ),
  firestoreConnect(props => {
    return props.uid
      ? [
          {
            collection: "users",
            doc: props.uid,
            subcollections: [{ collection: "unsaved" }],
            storeAs: "unsavedTerms",
            orderBy: ["time"]
          }
        ]
      : [];
  })
)(CreateSetContainer);
