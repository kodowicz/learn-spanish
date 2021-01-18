import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import { settings, SpeechVoices } from "../components/speech/speechSynthesis";
import StopLearningOverlay from "../components/overlay/StopLearningOverlay";
import GameOverOverlay from "../components/overlay/GameOverOverlay";
import ChooseBetweenTwo from "../components/game/ChooseBetweenTwo";
import ChooseBetweenFour from "../components/game/ChooseBetweenFour";
import SelectFalseOrTrue from "../components/game/SelectFalseOrTrue";
import ArrayBubbles from "../components/game/ArrayBubbles";
import TypeMeaning from "../components/game/TypeMeaning";
import PairWords from "../components/game/PairWords";
import ArrayLetters from "../components/game/ArrayLetters";
import Solution from "../components/game/Solution";
import GameTimer from "../components/game/GameTimer";
import RatioDots from "../components/RatioDots";

const PlaySet = ({
  terms,
  setid,
  answer,
  correctItem,
  isCancelOpen,
  isCompleted,
  isAnimated,
  isSkipped,
  isSpeaking,
  isGameOverOpen,
  cancelSesion,
  showGameAnswer,
  clearGameAnswer,
  skipAnswer,
  setAnimationEnd,
  changeLocation,
  setContentHeight,
  setCurrentSetId,
  finishGame,
  setSpeechStatus
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
            clearGameAnswer={clearGameAnswer}
            skipAnswer={skipAnswer}
            setAnimationEnd={setAnimationEnd}
            setSpeechStatus={setSpeechStatus}
          />
        ) : (
          <>
            { isCancelOpen && (
              <StopLearningOverlay setid={setid} cancelSesion={cancelSesion} />
            )}
            <Game
              isCompleted={isCompleted}
              isHidden={isCancelOpen}
              isSpeaking={isSpeaking}
              settings={settings}
              voices={voices}
              terms={terms}
              showGameAnswer={showGameAnswer}
              setSpeechStatus={setSpeechStatus}
            />
          </>
        )}
      </Content>
    );
  }
};

const Game = ({
  isCompleted,
  isHidden,
  isSpeaking,
  settings,
  voices,
  terms,
  showGameAnswer,
  setSpeechStatus
}) => {
  const [item, setItem] = useState({});
  const [game, setgame] = useState(0);
  const isPairingGame = game === 6;
  const isDesktop = window.innerWidth >= 768;

  useEffect(() => {
    let item = {};
    let ratio = 0;

    if (isCompleted) {
      item = getRandomItem(terms);
      ratio = Math.floor(Math.random() * 6);

    } else {
      const filtredTerms = terms.filter(item => !item.isMastered);
      item = getRandomItem(filtredTerms);
      ratio = item.ratio;
    }

    const game = pickGame(ratio, item.term.length > 20);

    setItem(item);
    setgame(game);
  }, []);

  function getRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const item = array[randomIndex];

    return item;
  }

  function filterTerms(terms) {
    return [...terms].filter(el => el.ratio > 0 && el.term.length < 20);
  };

  function pickGame(ratio, isTooLong) {
    const filtredTerms = filterTerms(terms);
    const randomPercentage = Math.random() < 0.1;
    const pairingGame = randomPercentage && filterTerms.length >= 6;
    let game;

    if (pairingGame) {
      game = 6;

    } else if (ratio <= 2) {
      game = Math.floor(Math.random() * 3);

    } else if (ratio === 5) {
      game = 5;

    } else {
      game = Math.floor(Math.random() * 2) + 3;

      if (isTooLong && game === 3) {
        game++;
      }
    }

    return game;
  }

  function randomGame(ratio) {
    switch (game) {
      case 6:
        return (
          <PairWords
            isSkipped={true}
            isSpeaking={isSpeaking}
            terms={terms}
            settings={settings}
            voices={voices}
            showGameAnswer={showGameAnswer}
            setSpeechStatus={setSpeechStatus}
          />
        );

      case 5:
        return (
          <TypeMeaning
            isSkipped={false}
            isDesktop={isDesktop}
            item={item}
            showGameAnswer={showGameAnswer}
          />
        );

      case 4:
        return (
          <ArrayLetters
            isSkipped={false}
            item={item}
            showGameAnswer={showGameAnswer}
          />
        );

      case 3:
        return (
          <ArrayBubbles
            isSkipped={false}
            item={item}
            showGameAnswer={showGameAnswer}
          />
        );

      case 2:
        return (
          <ChooseBetweenFour
            isSkipped={false}
            item={item}
            terms={terms}
            showGameAnswer={showGameAnswer}
          />
        );

      case 1:
        return (
          <SelectFalseOrTrue
            isSkipped={false}
            item={item}
            terms={terms}
            showGameAnswer={showGameAnswer}
          />
        );

      case 0:
      default:
        return (
          <ChooseBetweenTwo
            isSkipped={false}
            isDesktop={isDesktop}
            item={item}
            terms={terms}
            showGameAnswer={showGameAnswer}
          />
        );
    }
  }

  return (
    <GameWrapper isHidden={isHidden}>
      { !isPairingGame &&
        <RatioWrapper>
          <RatioDots ratio={item.ratio} />
        </RatioWrapper>
      }
      {randomGame(item.ratio)}
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

export default PlaySet;
