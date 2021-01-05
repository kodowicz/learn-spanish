import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { chooseMethod } from "../store/actions/overlayActions";
import { createLearnSet } from "../store/actions/learnSetActions";
import { createPlaySet } from "../store/actions/playSetActions";
import { removeNewKey } from "../store/actions/createSetActions";
import { deleteSetChanges } from "../store/actions/deleteSetActions";
import { sortTerms } from "../store/actions/setActions";
import { createEditSet } from "../store/actions/editSetActions";
import {
  changeLocation,
  changeLastLocation,
  setContentHeight,
  setCurrentSetId,
  enableCreateSet,
  enableEditSet
} from "../store/actions/navigationActions";

import ViewSet from "../pages/ViewSet";

const ViewSetContainer = props => {
  return props.isLoaded ? (
    <ViewSet
      match={props.match}
      setDetails={props.setDetails}
      signedUser={props.signedUser}
      author={props.author}
      percentage={props.percentage}
      isUserSet={props.isUserSet}
      sortedBy={props.sortedBy}
      terms={props.terms}
      lastLocation={props.lastLocation}
      isEditSubmited={props.isEditSubmited}
      isOverlayOpen={props.isOverlayOpen}
      changeLocation={props.changeLocation}
      changeLastLocation={props.changeLastLocation}
      setContentHeight={props.setContentHeight}
      setCurrentSetId={props.setCurrentSetId}
      sortTerms={props.sortTerms}
      deleteSetChanges={props.deleteSetChanges}
      removeNewKey={props.removeNewKey}
      createEditSet={props.createEditSet}
      chooseMethod={props.chooseMethod}
      createLearnSet={props.createLearnSet}
      createPlaySet={props.createPlaySet}
      enableEditSet={props.enableEditSet}
      enableCreateSet={props.enableCreateSet}
    />
  ) : (
    <></>
  );
};

function compare(a, b) {
  const termA = a.term.toUpperCase();
  const termB = b.term.toUpperCase();
  let comparison = 0;

  if (termA > termB) {
    comparison = 1;
  } else if (termA < termB) {
    comparison = -1;
  }
  return comparison;
}

function orderTerms(terms, orderBy) {
  let orderedTerms = [...terms];

  if (orderBy) {
    orderedTerms = orderedTerms.sort(compare);
  }

  return orderedTerms;
}

const mapStateToProps = (state, ownProps) => {
  const setDetails = state.firestore.data.setDetails || undefined;
  const author = setDetails ? setDetails.authorId : null;
  const terms = state.firestore.ordered.viewTerms;
  const userProgress = state.firestore.data.userProgress;
  const knowledge = userProgress?.knowledge;
  const amount = userProgress?.amount;
  const isUserSet = userProgress ? true : false;
  const orderedTerms = terms && orderTerms(terms, state.sortedBy);
  const percentage = userProgress
    ? knowledge
      ? Math.round((knowledge * 100) / (amount * 5))
      : 0
    : undefined;

  return {
    percentage,
    author,
    setDetails,
    isUserSet,
    terms: orderedTerms,
    signedUser: state.firebase.auth.uid,
    lastLocation: state.navigation.lastLocation,
    sortedBy: state.setStatus.sortedBy,
    isEditSubmited: state.setStatus.isEditSubmited,
    isOverlayOpen: state.isOverlayOpen.isChosen,
    isLoaded: userProgress
      ? isLoaded(terms, setDetails, userProgress)
      : isLoaded(terms, setDetails)
  };
};

export default compose(
  connect(
    mapStateToProps,
    {
      removeNewKey,
      changeLocation,
      changeLastLocation,
      setContentHeight,
      setCurrentSetId,
      sortTerms,
      createEditSet,
      chooseMethod,
      createLearnSet,
      createPlaySet,
      enableCreateSet,
      enableEditSet,
      deleteSetChanges
    }
  ),
  firestoreConnect(props => {
    if (props.signedUser) {
      if (props.isUserSet) {
        return [
          {
            collection: "sets",
            doc: props.match.params.id,
            storeAs: "setDetails"
          },
          {
            collection: "users",
            doc: props.signedUser,
            subcollections: [
              {
                collection: "learn",
                doc: props.match.params.id,
                subcollections: [{ collection: "game" }]
              }
            ],
            storeAs: "viewTerms",
            orderBy: ["time"]
          },
          {
            collection: "users",
            doc: props.signedUser,
            subcollections: [
              {
                collection: "learn",
                doc: props.match.params.id
              }
            ],
            storeAs: "userProgress"
          }
        ];
      } else {
        return [
          {
            collection: "sets",
            doc: props.match.params.id,
            storeAs: "setDetails"
          },
          {
            collection: "sets",
            doc: props.match.params.id,
            subcollections: [{ collection: "terms" }],
            storeAs: "viewTerms",
            orderBy: ["time"]
          },
          {
            collection: "users",
            doc: props.signedUser,
            subcollections: [
              {
                collection: "learn",
                doc: props.match.params.id
              }
            ],
            storeAs: "userProgress"
          }
        ];
      }
    } else {
      return [
        {
          collection: "sets",
          doc: props.match.params.id,
          storeAs: "setDetails"
        },
        {
          collection: "sets",
          doc: props.match.params.id,
          subcollections: [{ collection: "terms" }],
          storeAs: "viewTerms",
          orderBy: ["time"]
        }
      ];
    }
  })
)(ViewSetContainer);
