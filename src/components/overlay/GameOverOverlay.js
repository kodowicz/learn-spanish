import React, { useState, useRef, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import {
  Background,
  Dialog,
  Buttons,
  Button,
  colors
} from "../../assets/styles/GlobalStyles";

const GameOverOverlay = ({ setid, finishGame }) => {
  const [isGameFinished, setGameFinished] = useState(false);
  const backgroundRef = useRef();

  function handleCancel() {
    setGameFinished(true);
  }

  function handleLearning() {
    finishGame(false);
  }

  useEffect(
    () => {
      if (isGameFinished) {
        finishGame(false);
      }
    },
    [isGameFinished]
  );

  if (isGameFinished) {
    return <Redirect to={`/sets/${setid}`} />;
  } else {
    return (
      <Background>
        <Dialog role="alertdialog" aria-describedby="info">
          <Header id="info">time is over!</Header>
          <Alert>Do you want to keep learning?</Alert>
          <Buttons>
            <Button color={colors.navy} center="true" onClick={handleCancel}>
              quit
            </Button>
            <Button color={colors.navy} center="true" onClick={handleLearning}>
              resume
            </Button>
          </Buttons>
        </Dialog>
      </Background>
    );
  }
};

const Header = styled.h2`
  margin-top: 2rem;
  text-align: center;
`;

const Alert = styled.p`
  font-size: 1.6rem;
  margin: 2rem 0 3rem;
  text-align: center;
`;

export default GameOverOverlay;
