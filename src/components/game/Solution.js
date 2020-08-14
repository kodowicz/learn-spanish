import React, { Component } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { colors } from '../../assets/styles/GlobalStyles';
import good from '../../assets/images/good.svg';
import wrong from '../../assets/images/wrong.svg';


class Solution extends Component {
  state = {
    isAnswer: true,
    isItem: false
  }

  handleAnswer = () => {
    this.setState({
      isAnswer: false,
      isItem: true
    })
  }

  handleItem = () => {
    const { answer, correctItem, cleanGameAnswer } = this.props;
    const isCorrect = answer === 'correct' ? true : false;
    cleanGameAnswer(correctItem, isCorrect)
  }

  render() {
    const { correctItem, answer } = this.props;
    const { isItem, isAnswer } = this.state;

    return (
      <>
        {isAnswer &&
          <AnswerWrapper
            onAnimationEnd={this.handleAnswer}>
            <Answer src={answer === 'correct' ? good : wrong} />
          </AnswerWrapper>
        }
        {isItem &&
          <ItemWrapper
            onAnimationEnd={this.handleItem}>
            <Term>{correctItem.term}</Term>
            <Definition>{correctItem.definition}</Definition>
          </ItemWrapper>
        }
      </>
    )
  }
}


const zoomInOut = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%,-50%) scale3d(1.3, 1.3, 1.3);
  }

  40% {
    opacity: 1;
    transform: translate(-50%, -50%) scale3d(1, 1, 1);
  }

  60% {
    transform: translate(-50%,-50%) scale3d(1, 1, 1);
  }

  80% {
    opacity: 1;
    transform: translate(-50%,-50%) scale3d(0.6, 0.6, 0.6);
  }

  to {
    opacity: 0;
    transform: translate(-50%,-50%) scale3d(1, 1, 1);
  }
`;

const fadeInOut = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale3d(0.6, 0.6, 0.6);
  }

  15% {
    opacity: 1;
    transform: translate(-50%, -50%) scale3d(1, 1, 1);
  }

  70% {
    opacity: 1;
    transform: translate(-50%, -50%) scale3d(1, 1, 1);
  }

  85% {
    opacity: 0;
    transform: translate(-50%, -50%) scale3d(0.8, 0.8, 0.8)
  }

  to {
    opacity: 0;
  }
`;

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
  animation: ${fadeInOut} 2s ease-out 0.2s forwards;
  animation-timing-function: ease-out;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translateX(-50%, -50%);
  opacity: 0;
`;

const Item = styled.p`
  margin: 2rem 0;
  text-align: center;
`;

const Term = styled(Item)`
  font-size: 3.2rem;

  @media (min-width: 768px) {
    font-size: 4rem;
  };
`;

const Definition = styled(Item)`
  font-size: 2.2rem;
  color: ${colors.lightGray};

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

export default Solution
