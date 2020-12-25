import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";

import { cancelSesion, finishGame } from "../store/actions/overlayActions";
import {
  changeLocation,
  changeLastLocation,
  setContentHeight,
  setCurrentSetId
} from "../store/actions/navigationActions";
import {
  showGameAnswer,
  cleanWriting,
  setAnimationEnd
} from "../store/actions/playSetActions";

import WriteSet from "../pages/WriteSet";

const WriteSetContainer = props => {
  return props.isLoaded ? (
    <WriteSet
      setid={props.setid}
      terms={props.terms}
      answer={props.answer}
      correctItem={props.correctItem}
      isCancelOpen={props.isCancelOpen}
      isAnimated={props.isAnimated}
      isGameOverOpen={props.isGameOverOpen}
      cancelSesion={props.cancelSesion}
      cleanGameAnswer={props.cleanWriting}
      showGameAnswer={props.showGameAnswer}
      setAnimationEnd={props.setAnimationEnd}
      changeLocation={props.changeLocation}
      setContentHeight={props.setContentHeight}
      setCurrentSetId={props.setCurrentSetId}
      finishGame={props.finishGame}
    />
  ) : (
    <></>
  );
};

const mapStateToProps = (state, ownProps) => {
  const terms = state.firestore.ordered.playTerms;
  const details = state.firestore.data.playDetails;
  const isFullyFetched = terms?.length == details?.amount;

  return {
    terms,
    isLoaded: isLoaded(terms, details) && isFullyFetched,
    setid: ownProps.match.params.id,
    uid: state.firebase.auth.uid,
    answer: state.gameAnswer.answer,
    correctItem: state.gameAnswer.item,
    isAnimated: state.gameAnswer.isAnimated,
    isCancelOpen: state.isOverlayOpen.isCancelled,
    isGameOverOpen: state.isOverlayOpen.isGameOver
  };
};

export default compose(
  connect(
    mapStateToProps,
    {
      changeLocation,
      changeLastLocation,
      setContentHeight,
      setCurrentSetId,
      cancelSesion,
      showGameAnswer,
      cleanWriting,
      setAnimationEnd,
      finishGame
    }
  ),
  firestoreConnect(props => {
    return props.uid
      ? [
          {
            collection: "users",
            doc: props.uid,
            subcollections: [
              {
                collection: "learn",
                doc: props.match.params.id,
                subcollections: [{ collection: "game" }]
              }
            ],
            storeAs: "playTerms"
          },
          {
            collection: "users",
            doc: props.uid,
            subcollections: [
              {
                collection: "learn",
                doc: props.match.params.id
              }
            ],
            storeAs: "playDetails"
          }
        ]
      : [];
  })
)(WriteSetContainer);
