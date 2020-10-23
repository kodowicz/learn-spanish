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
  isGameOverOpen,
  cancelSesion,
  cleanGameAnswer,
  showGameAnswer,
  changeLocation,
  setCurrentSetId,
  finishGame
}) => {
  useEffect(() => {
    changeLocation("learn");
    setCurrentSetId(setid);
  }, []);

  if (isGameOverOpen) {
    return <GameOverOverlay setid={setid} finishGame={finishGame} />;
  } else {
    return (
      <>
        <GameTimer isStopped={isCancelOpen || answer} finishGame={finishGame} />

        {answer ? (
          <Solution
            answer={answer}
            correctItem={correctItem}
            cleanGameAnswer={cleanGameAnswer}
          />
        ) : (
          <>
            {isCancelOpen && (
              <StopLearningOverlay setid={setid} cancelSesion={cancelSesion} />
            )}
            <Game
              setid={setid}
              isHidden={isCancelOpen}
              terms={terms}
              answer={answer}
              correctItem={correctItem}
              showGameAnswer={showGameAnswer}
              finishGame={finishGame}
            />
          </>
        )}
      </>
    );
  }
};

const Game = ({ setid, isHidden, terms, showGameAnswer, finishGame }) => {
  const [item, setItem] = useState({});
  const [game, setgame] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const isDesktop = window.innerWidth >= 768;
    const filtredTerms = terms.filter(item => !item.isMastered);
    const randomIndex = Math.floor(Math.random() * filtredTerms.length);
    const item = filtredTerms[randomIndex];
    const game = pickGame(item.ratio, item.term.length > 20);

    setItem(item);
    setgame(game);
    setIsDesktop(isDesktop);
  }, []);

  function pickGame(ratio, isTooLong) {
    let game;

    if (ratio <= 2) {
      game = Math.floor(Math.random() * 3);
    } else if (ratio === 5) {
      game = 5;
    } else {
      game = Math.floor(Math.random() * 2) + 3;

      if (isTooLong && game === 4) {
        game--;
      }
    }

    return game;
  }

  function randomGame(ratio) {
    switch (game) {
      case 5:
        return <TypeMeaning item={item} showGameAnswer={showGameAnswer} />;

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
  position: sticky;
  top: 8rem;
  left: 7vw;
  width: 5rem;

  @media (min-width: 768px) {
    width: 6rem;
  }
`;

export default PlaySet;
