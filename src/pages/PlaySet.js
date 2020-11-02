import React, { useState, useEffect } from "react";
import styled from "styled-components";

import StopLearningOverlay from "../components/overlay/StopLearningOverlay";
import GameOverOverlay from "../components/overlay/GameOverOverlay";
import ChooseBetweenTwo from "../components/game/ChooseBetweenTwo";
import ChooseBetweenFour from "../components/game/ChooseBetweenFour";
import SelectFalseOrTrue from "../components/game/SelectFalseOrTrue";
import ArrayBubbles from "../components/game/ArrayBubbles";
import TypeMeaning from "../components/game/TypeMeaning";
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
  isGameOverOpen,
  cancelSesion,
  cleanGameAnswer,
  showGameAnswer,
  setAnimationEnd,
  changeLocation,
  setCurrentSetId,
  finishGame
}) => {
  useEffect(() => {
    changeLocation("learn");
    setCurrentSetId(setid);
  }, []);

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
      <>
        <GameTimer
          isStopped={isCancelOpen}
          isAnswered={answer}
          isAnimated={isAnimated}
          finishGame={finishGame}
        />

        {answer ? (
          <Solution
            answer={answer}
            correctItem={correctItem}
            cleanGameAnswer={cleanGameAnswer}
            setAnimationEnd={setAnimationEnd}
          />
        ) : (
          <>
            {isCancelOpen && (
              <StopLearningOverlay setid={setid} cancelSesion={cancelSesion} />
            )}
            <Game
              setid={setid}
              isCompleted={isCompleted}
              isHidden={isCancelOpen}
              terms={terms}
              answer={answer}
              showGameAnswer={showGameAnswer}
            />
          </>
        )}
      </>
    );
  }
};

const Game = ({ setid, isCompleted, isHidden, terms, showGameAnswer }) => {
  const [item, setItem] = useState({});
  const [game, setgame] = useState(0);
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

  function pickGame(ratio, isTooLong) {
    let game;

    if (ratio <= 2) {
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
      case 5:
        return (
          <TypeMeaning
            item={item}
            showGameAnswer={showGameAnswer}
            isDesktop={isDesktop}
          />
        );

      case 4:
        return <ArrayLetters item={item} showGameAnswer={showGameAnswer} />;

      case 3:
        return <ArrayBubbles item={item} showGameAnswer={showGameAnswer} />;

      case 2:
        return (
          <ChooseBetweenFour
            item={item}
            terms={terms}
            showGameAnswer={showGameAnswer}
          />
        );

      case 1:
        return (
          <SelectFalseOrTrue
            item={item}
            terms={terms}
            showGameAnswer={showGameAnswer}
          />
        );

      case 0:
      default:
        return (
          <ChooseBetweenTwo
            item={item}
            terms={terms}
            isDesktop={isDesktop}
            showGameAnswer={showGameAnswer}
          />
        );
    }
  }

  return (
    <GameWrapper isHidden={isHidden}>
      <RatioWrapper>
        <RatioDots ratio={item.ratio} />
      </RatioWrapper>
      {randomGame(item.ratio)}
    </GameWrapper>
  );
};

const GameWrapper = styled.div`
  visibility: ${({ isHidden }) => isHidden && "hidden"};
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
