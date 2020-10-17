import React, { useRef, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import styled from "styled-components";
import { Button, colors } from "../../assets/styles/GlobalStyles";

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

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
`;

const Dialog = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 25rem;
  height: 30rem;
  background: ${colors.white};
  color: ${colors.navy};
  border-radius: 15px;
  box-shadow: 10px 10px 20px ${colors.shadow};
  transform: translate(-50%, -50%);
`;

const Alert = styled.p`
  font-size: 1.6rem;
  margin: 3rem;
  text-align: center;
  user-select: none;
`;

const Buttons = styled.div`
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default MethodChoiceOverlay;
