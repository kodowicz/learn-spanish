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
      isGuest={props.isGuest}
      location={props.location}
      lastLocation={props.lastLocation}
      isOverlayOpen={props.isOverlayOpen}
      isSetDeleted={props.isSetDeleted}
      isEditSubmited={props.isEditSubmited}
      setName={props.setName}
      terms={props.terms}
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
  const isGuest = state.firebase.auth.email === "guest@gmail.com";

  return {
    terms,
    setName,
    uid,
    isGuest,
    isOverlayOpen: state.isOverlayOpen.isDeleted,
    isSetDeleted: state.setStatus.isSetDeleted,
    isEditSubmited: state.setStatus.isEditSubmited,
    newSetKey: state.navigation.newSetKey,
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
