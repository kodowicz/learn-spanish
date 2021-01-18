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
  clearGameAnswer,
  skipAnswer,
  setAnimationEnd,
  setSpeechStatus
} from "../store/actions/playSetActions";

import PlaySet from "../pages/PlaySet";

const PlaySetContainer = props => {
  return props.isLoaded ? (
    <PlaySet
      setid={props.setid}
      terms={props.terms}
      answer={props.answer}
      correctItem={props.correctItem}
      isCancelOpen={props.isCancelOpen}
      isCompleted={props.isCompleted}
      isAnimated={props.isAnimated}
      isSkipped={props.isSkipped}
      isSpeaking={props.isSpeaking}
      isGameOverOpen={props.isGameOverOpen}
      changeLocation={props.changeLocation}
      changeLastLocation={props.changeLastLocation}
      setContentHeight={props.setContentHeight}
      setCurrentSetId={props.setCurrentSetId}
      cancelSesion={props.cancelSesion}
      showGameAnswer={props.showGameAnswer}
      clearGameAnswer={props.clearGameAnswer}
      skipAnswer={props.skipAnswer}
      setSpeechStatus={props.setSpeechStatus}
      changeKnowledge={props.changeKnowledge}
      setAnimationEnd={props.setAnimationEnd}
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
  const isCompleted = details?.isCompleted;

  return {
    terms,
    isCompleted,
    isLoaded: isLoaded(terms, details) && isFullyFetched,
    setid: ownProps.match.params.id,
    uid: state.firebase.auth.uid,
    answer: state.gameAnswer.answer,
    correctItem: state.gameAnswer.item,
    isAnimated: state.gameAnswer.isAnimated,
    isSkipped: state.gameAnswer.isSkipped,
    isSpeaking: state.gameAnswer.isSpeaking,
    location: state.navigation.location,
    lastLocation: state.navigation.lastLocation,
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
      clearGameAnswer,
      skipAnswer,
      setAnimationEnd,
      finishGame,
      setSpeechStatus
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
)(PlaySetContainer);
