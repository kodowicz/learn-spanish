import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import { settings, SpeechVoices } from "../components/speech/speechSynthesis";
import StopLearningOverlay from "../components/overlay/StopLearningOverlay";
import GameOverOverlay from "../components/overlay/GameOverOverlay";
import TypeMeaning from "../components/game/TypeMeaning";
import Solution from "../components/game/Solution";
import GameTimer from "../components/game/GameTimer";

const WriteSet = ({
  setid,
  terms,
  answer,
  correctItem,
  isCancelOpen,
  isAnimated,
  isSkipped,
  isGameOverOpen,
  cancelSesion,
  skipAnswer,
  showGameAnswer,
  setAnimationEnd,
  changeLocation,
  setContentHeight,
  setCurrentSetId,
  finishGame
}) => {
  const contentRef = useRef(null);
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    changeLocation("learn");
    setCurrentSetId(setid);
    setContentHeight(contentRef.current.clientHeight);
  }, []);

  useEffect(
    () => {
      if (isGameOverOpen) setContentHeight(0);
    },
    [isGameOverOpen]
  );

  useEffect(
    () => {
      if (!voices.length) {
        const speechSynthesis = new SpeechVoices();
        const voices = speechSynthesis.getVoices();

        setVoices(voices);
      }
    },
    [voices]
  );

  useEffect(
    () => {
      setAnimationEnd(false);
    },
    [isAnimated]
  );

  if (isGameOverOpen) {
    return <GameOverOverlay setid={setid} finishGame={finishGame} />;

  } else {
    return (
      <Content ref={contentRef}>
        <GameTimer
          isStopped={isCancelOpen}
          isAnswered={answer}
          isAnimated={isAnimated}
          finishGame={finishGame}
        />

        { answer ? (
          <Solution
            answer={answer}
            correctItem={correctItem}
            isSkipped={isSkipped}
            settings={settings}
            voices={voices}
            skipAnswer={skipAnswer}
            setAnimationEnd={setAnimationEnd}
          />
        ) : (
          <>
            { isCancelOpen && (
              <StopLearningOverlay setid={setid} cancelSesion={cancelSesion} />
            )}
            <WriteSentence
              terms={terms}
              isHidden={isCancelOpen}
              showGameAnswer={showGameAnswer}
            />
          </>
        )}
      </Content>
    );
  }
};

const WriteSentence = ({ isHidden, terms, showGameAnswer }) => {
  const isDesktop = window.innerWidth >= 768;
  const [item, setItem] = useState({});

  useEffect(
    () => {
      let item = getRandomItem(terms);
      setItem(item);
    },
    []
  );

  function getRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const item = array[randomIndex];

    return item;
  }

  return (
    <GameWrapper isHidden={isHidden}>
      <TypeMeaning
        item={item}
        showGameAnswer={showGameAnswer}
        isDesktop={isDesktop}
        isSkipped={true}
      />
    </GameWrapper>
  );
};

const Content = styled.div`
  height: 100%;
`;

const GameWrapper = styled.div`
  visibility: ${ props => props.isHidden && "hidden" };
  cursor: pointer;
`;

const RatioWrapper = styled.div`
  position: fixed;
  top: 8rem;
  left: 7vw;
  width: 5rem;

  @media (min-width: 768px) {
    width: 6rem;
    left: 3rem;
  }
`;

export default WriteSet;
