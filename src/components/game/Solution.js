import React, { useState } from "react";
import styled, { css } from "styled-components";
import { colors } from "../../assets/styles/GlobalStyles";
import { zoomInOut, fadeInOut } from "../../assets/styles/GlobalKeyframes";

import Speech from "../speech/Speech";
import good from "../../assets/images/good.svg";
import wrong from "../../assets/images/wrong.svg";

const Solution = ({
  answer,
  correctItem,
  voices,
  settings,
  cleanGameAnswer,
  setAnimationEnd
}) => {
  const [isAnswer, setIsAnswer] = useState(true);
  const [isItem, setIsItem] = useState(false);

  function handleAnswer() {
    setIsAnswer(false);
    setIsItem(true);
  }

  function handleItem() {
    const isCorrect = answer === "correct" ? true : false;
    cleanGameAnswer(correctItem, isCorrect);
    setAnimationEnd(true);
  }

  return (
    <>
      {isAnswer && (
        <AnswerWrapper onAnimationEnd={handleAnswer}>
          <Answer src={answer === "correct" ? good : wrong} />
        </AnswerWrapper>
      )}
      {isItem && (
        <ItemWrapper onAnimationEnd={handleItem}>
          <Term>{correctItem.term}</Term>
          <Definition>{correctItem.definition}</Definition>
        </ItemWrapper>
      )}
      <Speech
        settings={settings}
        voices={voices}
        text={correctItem.term}
      />
    </>
  );
};

const AnswerWrapper = styled.div`
  animation: ${zoomInOut} 1.5s both;
  position: absolute;
  top: 45%;
  left: 50%;
  text-align: center;
  width: 20rem;
  height: 20rem;
  border-radius: 10rem;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Answer = styled.img`
  width: 50%;
`;

const ItemWrapper = styled.div`
  animation: ${fadeInOut} 2s ease-out 0.2s both;
  animation-timing-function: ease-out;
  position: absolute;
  top: 45%;
  left: 50%;
  width: 70vw;
  transform: translate(-50%, -50%);
  opacity: 0;
`;

const Item = styled.p`
  margin: 2rem 0;
  text-align: center;
`;

const Term = styled(Item)`
  font-size: 3.2rem;

  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

const Definition = styled(Item)`
  font-size: 2.2rem;
  color: ${colors.lightGray};

  @media (min-width: 768px) {
    font-size: 2.8rem;
  }
`;

export default Solution;
