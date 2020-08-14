import React, { Component } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { colors } from '../../assets/styles/GlobalStyles';

class ArrayLetters extends Component {
  state = {
    definition: "",
    correctAnswer: "",
    counter: 0,
    index: 0,
    lastUserLetter: null,
    isFinished: false,
    answer: [],
    letters: []
  }

  componentDidMount() {
    this.createGame();
  }

  createGame() {
    this.setState((prevState, props) => {
      const { item } = this.props;
      const { index } = this.state;
      const definition = item.definition;
      const correctAnswer = item.term;
      const regex = /(\(|\)|\s|\n)/;

      let answer = correctAnswer
        .split("")
        .map(letter => regex.test(letter) ? letter : null);

      let letters = this.randomLetters(item.term, index);
      letters = this.shuffleOptions(letters);

      const lastUserLetter = answer.lastIndexOf(null);

      return {
        definition,
        letters,
        answer,
        correctAnswer,
        lastUserLetter
      }
    })
  }

  randomLetters = (word, index) => {
    const correctLetter = {
      letter: word[index],
      isWrong: false,
      isScaled: true
    };
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'w', 'z'];
    let letters = [correctLetter];

    while (letters.length < 5) {
      const index = Math.floor(Math.random() * alphabet.length);
      const isTaken = letters.some(el => el.letter === alphabet[index]);

      if (!isTaken) {
        const wrongLetter = {
          letter: alphabet[index],
          isWrong: false,
          isScaled: true
        }
        letters.push(wrongLetter)
      }
    }

    return letters
  }

  shuffleOptions = (array) => {
    let counter = array.length - 1;
    let newOrder = [...array];

    while (counter > 0) {
      let index = Math.floor(Math.random() * counter);
      let temp = newOrder[counter];
      newOrder[counter] = newOrder[index];
      newOrder[index] = temp;
      counter--;
    }

    return newOrder;
  }

  getExcludedIndexes = (word) => {
    const regex = /[$&+,:;=?@#|'<>.^*()%!-\s]/g
    const array = [];
    let match;

    while ((match = regex.exec(word)) != null) {
      array.push(match.index)
    }

    return array
  }

  handlePicking = (event) => {
    event.persist();

    this.setState((prevState, props) => {
      const correctAnswer = prevState.correctAnswer;
      const correctLetter = correctAnswer[prevState.index];
      const choice = event.target.id;
      let nextIndex = prevState.index + 1;
      let answer = [...prevState.answer];
      let trimNumber = 1;
      let insertedAnswer = [choice];

      // last answer letter; don't pick a new array of random letters
      if (prevState.lastUserLetter === prevState.index) {
        const emptyIndex = answer.findIndex(letter => !letter);
        answer.splice(emptyIndex, trimNumber, ...insertedAnswer);

        return {
          answer,
          index: nextIndex
        }

      } else if (choice === correctLetter) {
        const excludedIndexes = this.getExcludedIndexes(correctAnswer);
        const nextLetter = correctAnswer[nextIndex];

        if (excludedIndexes.indexOf(nextIndex) !== -1) {

          while (excludedIndexes.indexOf(nextIndex) !== -1) {
            insertedAnswer.push(prevState.correctAnswer[nextIndex]);
            trimNumber++;
            nextIndex++;
          }

          const emptyIndex = answer.findIndex(letter => !letter);
          answer.splice(emptyIndex, trimNumber, ...insertedAnswer)

        } else if (nextLetter) {
          const emptyIndex = answer.findIndex(letter => !letter);
          answer.splice(emptyIndex, trimNumber, ...insertedAnswer);
        }

        // create a new array of random letters
        let letters = this.randomLetters(prevState.correctAnswer, nextIndex);
        letters = this.shuffleOptions(letters);

        return {
          letters,
          answer,
          index: nextIndex,
          counter: 0
        }

      // wrong letter
      } else {
        let counter = prevState.counter + 1;
        let letters = prevState.letters;
        const wrongIndex = letters.findIndex(element => element.letter === choice);
        let wrongLetter = letters[wrongIndex];

        // shake letter
        wrongLetter.isWrong = true;
        letters.splice(wrongIndex, 1, wrongLetter);

        return {
          counter,
          letters
        }
      }

    }, () => {
      const { counter } = this.state;
      const { item, showGameAnswer } = this.props;

      if (counter === 3) {
        showGameAnswer(item, 'wrong');
      }
    })
  }

  handleFadeUp = () => {
    this.setState((prevState) => {
      const { answer } = prevState;
      const isFinished = answer.every(letter => letter !== null)

      if (isFinished) {
        return {
          isFinished: true
        }
      }

    }, () => {
      const { item, showGameAnswer } = this.props;
      const { isFinished } = this.state;

      if (isFinished) {
        showGameAnswer(item, 'correct');
      }
    })
  }

  handleLettersAnimation = () => {
    this.setState((prevState) => {
      const letters = prevState.letters;
      letters.forEach(element => element.isWrong = false);
      letters.forEach(element => element.isScaled = false);

      return { letters }
    })
  }

  render() {
    const { definition, isFinished, letters, answer } = this.state;

    return (
      <GameWrapper isFinished={isFinished}>
        <Term>{definition}</Term>

        <AnswerWrapper>
          {answer.map((letter, index) =>
            <AnswerLetter
              key={index}
              letter={letter}
              isBlock={/\n/.test(letter)}
              isFaded={letter}
              onAnimationEnd={this.handleFadeUp}>
              {letter}
            </AnswerLetter>
          )}
        </AnswerWrapper>

        <PickWrapper>
          {letters.map(({ letter, isScaled, isWrong }, index) =>
            <PickLetter
              id={letter}
              key={index}
              isScaled={isScaled}
              isWrong={isWrong}
              onClick={this.handlePicking}
              onAnimationEnd={this.handleLettersAnimation}>
              {letter}
            </PickLetter>
          )}
        </PickWrapper>

      </GameWrapper>
    )
  }
};


const shake = keyframes`
  0% {
    transform: translateX(0px);
    opacity: 0.5;
  }

  25% {
    transform: translateX(3px);
  }

  50% {
    transform: translateX(-3px);
  }

  75% {
    transform: translateX(3px);
  }

  100% {
    transform: translateX(0px);
    opacity: 1
  }
`;

const scale = keyframes`
  from {
    transform: scale(0.7);
  }

  70% {
    transform: scale(1.2);
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 30%, 0);
  }

  60% {
    opacity: 0.9;
    transform: translate3d(0, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const popIn = keyframes`
  from {
    opacity: 0;
    transform: scale3d(1, 1, 1);
  }

  20% {
    opacity: 1;
  }

  50% {
    transform: scale3d(1.15, 1.15, 1.15);
  }

  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
`

const GameWrapper = styled.div`
  display: ${({isFinished}) => isFinished ? 'none' : 'block'};
  padding-top: 20vh;
  width: 80vw;
  margin: 0 auto
`;

const Term = styled.p`
  animation: ${popIn} .3s linear 0.4s forwards;
  font-size: 3rem;
  margin: 0;
  margin-bottom: 1.5rem;
  text-align: center;
  opacity: 0;

  @media (min-width: 768px) {
    font-size: 4rem
  }
`;

const AnswerWrapper = styled.div`
  color: ${colors.lightGray};
  height: auto;
  width: max-content;
  margin: 10rem auto 5rem auto;

  @media (min-width: 768px) {
    margin: 7rem auto 8rem auto;
  }
`;

const AnswerLetter = styled.span`
  width: ${({ letter }) => letter === " " && "1rem"};

  ${({ isBlock }) => isBlock && css`
    display: block;
    height: 1rem;
  `};

  ${({ letter }) => !letter && css`
    height: calc(2.4rem * 1.333);
    width: 1rem;
    margin: 0 0.2rem;
    border-bottom: 1px solid white;
  `};

  ${({ isFaded }) => isFaded && css`
    animation: ${fadeUp} 0.3s linear
  `};

  font-size: 2.4rem;
  display: inline-block;

  @media (min-width: 768px) {
    font-size: 3rem;

    ${({ letter }) => !letter && css`
      height: calc(2.8rem * 1.333);
      width: 2rem;
      margin: 0 0.3rem;
      border-bottom: 1px solid white
    `}
  }
`;

const PickWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 23rem;
  margin: 0 auto;

  @media (min-width: 768px) {
    width: 30rem
  }
`;

const PickLetter = styled.span`
  ${({ isScaled }) => isScaled && css`
  animation: ${scale} 0.4s linear both;
  `};

  ${({ isWrong }) => isWrong && css`
  animation: ${scale} 0.3s linear, ${shake} 0.5s linear;
  `};

  padding: 0.5rem 0;
  width: 3.7rem;
  text-align: center;
  border: 1px solid white;
  border-radius: 7px;
  font-size: 2.4rem;
  text-transform: capitalize;

  @media (min-width: 768px) {
    padding: 0.8rem 0;
    width: 4.5rem;
    font-size: 2.8rem;
  }
`;

export default ArrayLetters
