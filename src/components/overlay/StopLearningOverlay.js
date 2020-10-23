import React, { useState, useRef, useEffect } from "react";
import { Redirect } from "react-router-dom";
import {
  Background,
  Dialog,
  Alert,
  Buttons,
  Button,
  colors
} from "../../assets/styles/GlobalStyles";

const StopLearningOverlay = ({ setid, cancelSesion }) => {
  const backgroundRef = useRef();
  const [isCancelled, setIsCancelled] = useState(false);

  function handleKeepLearning() {
    cancelSesion(false);
  }

  function handleStopLearning() {
    setIsCancelled(true);
  }

  function handleCancel(event) {
    if (event.target === backgroundRef.current) {
      cancelSesion(false);
    }
  }

  useEffect(
    () => {
      if (isCancelled) {
        cancelSesion(false);
      }
    },
    [isCancelled]
  );

  if (isCancelled) return <Redirect to={`/sets/${setid}`} />;

  return (
    <Background ref={backgroundRef} onClick={handleCancel}>
      <Dialog role="alertdialog" aria-describedby="info">
        <Alert id="info">Are you sure you want to finish learning?</Alert>
        <Buttons>
          <Button
            color={colors.navy}
            center="true"
            onClick={handleKeepLearning}
          >
            no
          </Button>
          <Button
            color={colors.navy}
            center="true"
            onClick={handleStopLearning}
          >
            yes
          </Button>
        </Buttons>
      </Dialog>
    </Background>
  );
};

export default StopLearningOverlay;
