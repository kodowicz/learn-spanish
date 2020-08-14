import React, { Component } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { colors, fonts } from '../../assets/styles/GlobalStyles';

class ArrayBubbles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      isChosen: false,
      boundary: {},
      bubbles: [],
      bubblesPositions: [
        [
          { left: 0.394, top: 0.615 },
          { left: 0.59, top: 0.55 },
          { left: 0.62, top: 0.23 },
          { left: 0.81, top: 0 },
          { left: 0.03, top: 0.675 },
          { left: 0.78, top: 0.68 },
          { left: 0.014, top: 0.33 },
          { left: 0.344, top: 0.29 },
          { left: 0.45, top: 0.035 },
          { left: 0.217, top: 0 },
          { left: 0.814, top: 0.36 },
          { left: 0.194, top: 0.495 },
          { left: 0, top: 0 }
        ],
        [
          {left: 0.494, top: 0.535},
          { left: 0.134, top: 0.42},
          { left: 0.652, top: 0.36},
          { left: 0.334, top: 0.37},
          { left: 0.45, top: 0.115},
          { left: 0.71, top: 0.68},
          { left: 0.23, top: 0.06},
          { left: 0.27, top: 0.68},
          { left: 0.62, top: 0.03},
          { left: 0.85, top: 0.4},
          { left: 0, top: 0},
          { left: 0.83, top: 0.06},
          { left: 0, top: 0.68}
        ],
         [
          { left: 0.206, top: 0.36 },
          { left: 0.606, top: 0.66 },
          { left: 0.434, top: 0.345 },
          { left: 0.567, top: 0.11 },
          { left: 0.228, top: 0.69 },
          { left: 0.42, top: 0.68 },
          { left: 0.79, top: 0.715 },
          { left: 0.01, top: 0.315 },
          { left: 0.72, top: 0.36 },
          { left: 0.81, top: 0.04 },
          { left: 0.11, top: 0.03 },
          { left: 0.3, top: 0 },
          { left: 0, top: 0.65 }
        ]
      ],
      letters: []
    }

    this.boundaryRef = React.createRef();
  }

  componentDidMount() {
    this.createGame();
  }

  createGame() {
    this.setState((state, props) => {
      const { item } = props;
      const letters = this.createLetters(item.term);
      let prevIndex = 0;
      const excludedIndexes = this.getExcludedIndexes(item.term);
      let nextIndex = 0;
      const boundary = this.boundaryRef.current.getBoundingClientRect();

      while (excludedIndexes.indexOf(nextIndex) !== -1) {
        nextIndex++;
      }

      while (prevIndex < nextIndex) {
        prevIndex++
      }

      const term = props.item.term;
      let bubbles = this.createBubbles(term);

      return {
        boundary,
        letters,
        definition: item.definition,
        index: nextIndex,
        definition: item.definition,
        correctAnswer: item.term,
        bubbles: this.shuffleOptions(bubbles),
      }
    })
  }

  chunkString = (reducedStr, index, chunkLength) => {
  	let bubbles = [];

  	while (index < reducedStr.length) {
  		chunkLength.forEach(length => {
  			let chunk = reducedStr.substring(index, index + length);

  			if (chunk) {
  					bubbles.push(chunk);
  					index += chunk.length;
  			}
  		});
  	}

  	bubbles = bubbles.flatMap(bubble => bubble.trim().split(" "));

  	return bubbles
  }

  createBubbles = (str) => {
    let index = 0;
    let chunkLength = [2, 3];
    let bubbles = [];
    const isSingle = Math.random() > 0.5 ? true : false;
    const isLong = str.length < 10 ? true : false;
    const excludedIndexes = this.getExcludedIndexes(str);
    let reducedStr = str
    .split("")
    .map((letter, index) =>
      excludedIndexes.some(char => char === index) ?
        letter === " " ? letter : " "
        :
        letter
    )
    .join("");

    if (isSingle && isLong) {
      bubbles = reducedStr.replace(/ /g, "").split("");

    } else {
      bubbles = this.chunkString(reducedStr, index, chunkLength)

    }

    return bubbles
  }

  createLetters = (term) => {
    let letters = [];
    const excludedIndexes = this.getExcludedIndexes(term);

    letters = term.split("").map((letter, index) =>
      excludedIndexes.some(i => i === index) ? letter : ""
    );

    return letters;
  };

  getExcludedIndexes = (word) => {
    // it won't catch special char like
    const regex = /[$&+,:;=?@#|'<>.^*()%!-\s]/g
    const array = [];
    let match;

    while ((match = regex.exec(word)) != null) {
      array.push(match.index)
    }

    return array
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

  handlePicking = (event) => {
    const userPick = event.target.id;
    let bubbleLength = userPick.length;

    this.setState((state) => {
      const { index, correctAnswer, letters, bubbles } = state;
      const correctLetters = correctAnswer.slice(index, index + bubbleLength);

      if (userPick === correctLetters) {
        const counter = 0;
        const excludedIndexes = this.getExcludedIndexes(correctAnswer);
        let nextIndex = index + bubbleLength;
        let bubbleIndex = bubbles.findIndex(bubble => bubble === userPick);

        bubbles.splice(bubbleIndex, 1, "");
        letters.splice(index, bubbleLength, ...correctLetters);

        while (excludedIndexes.indexOf(nextIndex) !== -1) {
          nextIndex++;
        }

        return {
          counter,
          letters,
          bubbles,
          index: nextIndex,
          isCorrect: true
        }

      } else {
        const counter = state.counter + 1;

        return {
          counter,
          isWrong: true
        };
      }
    });
  }

  handleAnswer = () => {
    this.setState((state) => {
      const { letters, correctAnswer, counter } = this.state;
      const reducedAnswer = correctAnswer.replace(/ |\n/g, "");
      const reducedUserAnswer = letters.join("").replace(/ |\n/g, "")
      const isFinished = reducedUserAnswer === reducedAnswer;

      if (isFinished || counter === 3) {
        return {
          isFinished: true
        }
      } else {
        return {
          isCorrect: false,
          isWrong: false
        }
      }
    }, () => {
      const { item, showGameAnswer } = this.props;
      const { isFinished, counter } = this.state;

      if (isFinished) {
        if (counter === 3) {
          showGameAnswer(item, 'wrong');
        } else {
          showGameAnswer(item, 'correct');
        }
      }
    });
  };

  render() {
    const {
      definition,
      boundary,
      bubbles,
      bubblesPositions,
      letters,
      isChosen,
      isWrong,
      isCorrect
    } = this.state;

    const randomIndex = Math.floor(Math.random() * bubblesPositions.length);

    return (
      <GameWrapper isChosen={isChosen}>
        <Definition>{definition}</Definition>

        <BubblesWrapper ref={this.boundaryRef}>
          {bubbles.map((bubble, index) => (
            <BubbleComponent
              id={bubble}
              key={index}
              index={index}
              position={bubblesPositions[randomIndex][index]}
              boundary={boundary}
              boundaryRef={this.boundaryRef.current}
              handlePicking={this.handlePicking}>
              {bubble}
            </BubbleComponent>
          ))}
        </BubblesWrapper>

        <AnswerWrapper
          isWrong={isWrong}
          isCorrect={isCorrect}
          onAnimationEnd={this.handleAnswer}>
          <Letters>
            {letters.map((letter, index) =>
              <Letter
                letter={letter}
                index={index}
                key={index}
                isBlock={/\n/.test(letter)}>
                {letter}
              </Letter>
            )}
          </Letters>
        </AnswerWrapper>
      </GameWrapper>
    );
  }
}

class BubbleComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startOffsetTop: 0,
      startOffsetLeft: 0,
      offsetTop: 0,
      offsetLeft: 0
    }

    this.bubbleRef = React.createRef()
  }

  componentDidMount() {
    const { boundary, position } = this.props;
    const bubble = this.bubbleRef.current;

    const startOffset = {
      left: Math.floor(boundary.width / 2 - bubble.offsetWidth / 2),
      top: Math.floor(boundary.height / 2  - bubble.offsetHeight / 2)
    }

    const offset = {
      left: boundary.width * position.left,
      top: boundary.height * position.top
    }

    this.setState({
      offsetLeft: offset.left,
      offsetTop: offset.top,
      startOffsetLeft: startOffset.left,
      startOffsetTop: startOffset.top
    })
  }

  render() {
    const { startOffsetLeft, startOffsetTop, offsetLeft, offsetTop } = this.state;
    const { id, index, children, handlePicking } = this.props;

    return (
      <Bubble
        id={id}
        index={index}
        ref={this.bubbleRef}
        startOffsetLeft={startOffsetLeft}
        startOffsetTop={startOffsetTop}
        offsetLeft={offsetLeft}
        offsetTop={offsetTop}
        onClick={handlePicking}>
        {children}
      </Bubble>
    );
  }
}


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
`;

const pulse = keyframes`
  from {
    transform: scale3d(1, 1, 1);
  }

  50% {
    transform: scale3d(1.05, 1.05, 1.05);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
`;

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

const move = (
  startOffsetLeft,
  startOffsetTop,
  offsetLeft,
  offsetTop
) => keyframes`
  from {
    transform: translate(${startOffsetLeft}px, ${startOffsetTop}px);
  }

  to {
    transform: translate(${offsetLeft}px, ${offsetTop}px);
  }
`

const GameWrapper = styled.div`
  display: ${({ isChosen }) => (isChosen ? 'none' : 'block')};
  padding-top: 20vh;
  width: 90vw;
  margin: 0 auto;
`;

const Definition = styled.p`
  animation: ${popIn} .3s linear 0.5s forwards;
  font-size: 3rem;
  text-align: center;
  margin: 0 0 4rem;
  opacity: 0;

  @media (min-width: 768px) {
    font-size: 4rem;
  }
`;

const BubblesWrapper = styled.div`
  width: 90vw;
  height: 20rem;
  margin: 0 auto;
  position: relative;

  @media (min-width: 768px) {
    width: 50rem;
  }
`;

const Bubble = styled.div`
  ${({ startOffsetLeft, startOffsetTop, offsetLeft, offsetTop, index }) =>
    css`
      animation-name: ${move(startOffsetLeft, startOffsetTop, offsetLeft, offsetTop)};
      animation-duration: 0.4s;
      animation-delay: ${0.05 + index*0.05}s;
      animation-fill-mode: both;
      animation-timing-funtion:cubic-bezier(0.755, 0.05, 0.855, 0.06);
    `
  };
  visibility: ${({ id }) => !id && 'hidden'};
  font-weight: ${fonts.bold};
  color: ${colors.blue};
  background: ${colors.white};
  width: 5.5rem;
  height: 5.5rem;
  position: absolute;
  border-radius: 4rem;
  display: flex;
  justify-content: center;
  font-size: 2rem;
  align-items: center;

  @media (min-width: 768px) {
    width: 6.5rem;
    height: 6.5rem;
    font-size: 2.3rem;
  }
`;

const AnswerWrapper = styled.div`
  ${({ isWrong }) => isWrong && css`
  animation: ${shake} 0.5s linear;
  `};

  ${({ isCorrect }) => isCorrect && css`
  animation: ${pulse} 0.4s linear;
  `};

  position: relative;
  border: 1px solid white;
  border-radius: 4rem;
  min-height: 5rem;
  height: auto;
  display: flex;
  align-items: center;

  width: 80vw;
  margin: 4rem auto 0;

  @media (min-width: 768px) {
    width: 50rem;
  }
`;

const Letters = styled.div`
  margin: 0 auto;
  padding: 0.5rem 1rem 1.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const Letter = styled.span`
  width: ${({ letter }) => letter === ' ' && '1rem'};

  ${({ isBlock }) => isBlock && css`
  display: block;
  height: 1rem;
  `};

  ${({ letter }) => !letter && css`
  height: calc(2.4rem);
  width: 1.2rem;
  margin: 0 0.3rem;
  border-bottom: 1px solid white;
  `};

  font-size: 2.4rem;
  height: calc(2.2rem * 1.345);
  display: inline-block;
  transition: transform 0.1s ease-out;

  @media (min-width: 768px) {
    ${({ letter }) => !letter && css`
      width: 1.5rem;
    `};
  }
`

export default ArrayBubbles
