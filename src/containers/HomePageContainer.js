import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import {
  changeLocation,
  changeLastLocation,
  enableEditSet
} from "../store/actions/navigationActions";

import HomePage from "../pages/HomePage";

const HomePageContainer = props => {
  return props.isLoaded ? (
    <HomePage
      isLogged={props.isLogged}
      userSets={props.userSets}
      otherSets={props.otherSets}
      allSets={props.allSets}
      changeLocation={props.changeLocation}
      changeLastLocation={props.changeLastLocation}
      enableEditSet={props.enableEditSet}
    />
  ) : (
    <></>
  );
};

const mapStateToProps = state => {
  const uid = state.firebase.auth.uid;
  const allSets = state.firestore.ordered.allSets;
  const userSets = state.firestore.ordered.userSets;
  const isEmpty = state.firebase.auth.isEmpty;
  const userSetsId = userSets && Object.keys(state.firestore.data.userSets);
  const otherSets =
    userSetsId && allSets?.filter(set => !userSetsId.some(id => id === set.id));

  return {
    uid,
    allSets,
    userSets,
    otherSets,
    isEmpty,
    isLogged: uid ? true : false,
    isLoaded: isEmpty ? isLoaded(allSets) : isLoaded(otherSets, userSets)
  };
};

export default compose(
  connect(
    mapStateToProps,
    {
      changeLocation,
      changeLastLocation,
      enableEditSet
    }
  ),
  firestoreConnect(props => {
    if (props.isEmpty) {
      return [
        {
          collection: "sets",
          storeAs: "allSets"
        }
      ];
    } else {
      return [
        {
          collection: "sets",
          storeAs: "allSets"
        },
        {
          collection: "users",
          doc: props.uid,
          subcollections: [{ collection: "learn" }],
          storeAs: "userSets"
        }
      ];
    }
  })
)(HomePageContainer);
