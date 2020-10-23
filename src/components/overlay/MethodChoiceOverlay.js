import React, { useRef, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import {
  Background,
  Dialog,
  Alert,
  Buttons,
  Button,
  colors
} from "../../assets/styles/GlobalStyles";

const MethodChoiceOverlay = ({
  setid,
  signedUser,
  chooseMethod,
  createLearnSet,
  createPlaySet
}) => {
  const [chosenMethod, setChosenMethod] = useState("");
  const backgroundRef = useRef();

  function handleCancel(event) {
    if (backgroundRef.current === event.target) {
      chooseMethod(false);
    }
  }

  function handleLearnChoice() {
    setChosenMethod("learn");
    createLearnSet(setid);
    createPlaySet(setid);
  }

  function handlePlayChoice() {
    setChosenMethod("play");
    createPlaySet(setid);
  }

  useEffect(() => {
    return () => {
      chooseMethod(false);
    };
  }, []);

  if (!signedUser) {
    return <Redirect to="/signup" />;
  } else if (chosenMethod === "learn") {
    return <Redirect to={`/learn/${setid}`} />;
  } else if (chosenMethod === "play") {
    return <Redirect to={`/play/${setid}`} />;
  } else {
    return (
      <Background ref={backgroundRef} onClick={handleCancel}>
        <Dialog role="alertdialog" aria-describedby="info">
          <Alert id="info">
            Do you want to learn words by flashcards or by game?
          </Alert>
          <Buttons>
            <Button
              color={colors.navy}
              center="true"
              onClick={handleLearnChoice}
            >
              flashcards
            </Button>
            <Button
              color={colors.navy}
              center="true"
              onClick={handlePlayChoice}
            >
              game
            </Button>
          </Buttons>
        </Dialog>
      </Background>
    );
  }
};

export default MethodChoiceOverlay;
