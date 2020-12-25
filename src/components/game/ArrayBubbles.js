import React, { Component } from "react";
import styled, { css } from "styled-components";
import { colors, fonts } from "../../assets/styles/GlobalStyles";
import { shake, pulse, popIn, prompt, moveForwards } from "../../assets/styles/GlobalKeyframes";

class ArrayBubbles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      index: 0,
      tabIndex: 0,
      promptingTime: 5000,
      correctAnswer: "",
      userAnswer: "",
      definition: "",
      isCorrect: false,
      isWrong: false,
      isPrompting: false,
      boundary: {},
      excludedIndexes: [],
      bubbles: [],
      groupedWords: [],
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
          { left: 0.494, top: 0.535 },
          { left: 0.134, top: 0.42 },
          { left: 0.652, top: 0.36 },
          { left: 0.334, top: 0.37 },
          { left: 0.45, top: 0.115 },
          { left: 0.71, top: 0.68 },
          { left: 0.23, top: 0.06 },
          { left: 0.27, top: 0.68 },
          { left: 0.62, top: 0.03 },
          { left: 0.85, top: 0.4 },
          { left: 0, top: 0 },
          { left: 0.83, top: 0.06 },
          { left: 0, top: 0.68 }
        ],
        [
          { left: 0.206, top: 0.36 },
          { left: 0.606, top: 0.66 },
          { left: 0.01, top: 0.315 },
          { left: 0.567, top: 0.11 },
          { left: 0.228, top: 0.69 },
          { left: 0.434, top: 0.345 },
          { left: 0.42, top: 0.68 },
          { left: 0.79, top: 0.715 },
          { left: 0.72, top: 0.36 },
          { left: 0.81, top: 0.04 },
          { left: 0.11, top: 0.03 },
          { left: 0.3, top: 0 },
          { left: 0, top: 0.65 }
        ]
      ]
    };

    this.boundaryRef = React.createRef();

    this.handlePicking = this.handlePicking.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.promptingTimer = this.promptingTimer.bind(this);
  }

  componentDidMount() {
    this.createGame();
    this.prompting = setTimeout(this.promptingTimer, this.state.promptingTime);
  }

  componentDidUpdate(prevProps, prevState) {
    const { userAnswer, counter, correctAnswer } = this.state;
    const { item, showGameAnswer } = prevProps;

    if (prevState.counter !== counter && counter === 3) {
      window.setTimeout(() => showGameAnswer(item, "wrong"), 200);
    }

    if (prevState.userAnswer !== userAnswer) {
      const isFinished = userAnswer === correctAnswer;

      if (isFinished) {
        window.setTimeout(() => showGameAnswer(item, "correct"), 500);
      }
    }
  }

  createGame() {
    this.setState((state, props) => {
      let nextIndex = 0;
      let tabIndex = 0;
      const correctAnswer = props.item.term;
      const lastWordIndex = correctAnswer.length - 1;
      const excludedIndexes = this.getExcludedIndexes(correctAnswer);
      const letters = this.createLetters(correctAnswer, excludedIndexes);
      const boundary = this.boundaryRef.current.getBoundingClientRect();
      const groupedWords = this.createGroupedWords(
        correctAnswer,
        excludedIndexes
      );

      while (excludedIndexes.indexOf(nextIndex) !== -1) {
        nextIndex++;
      }

      const userAnswer = correctAnswer.slice(0, nextIndex);

      let bubbles = this.createBubbles(correctAnswer, excludedIndexes);

      return {
        correctAnswer,
        userAnswer,
        boundary,
        excludedIndexes,
        groupedWords,
        index: nextIndex,
        definition: props.item.definition,
        bubbles: this.shuffleOptions(bubbles)
      };
    });
  }

  chunkString(reducedStr) {
    let bubbles = [];
    let index = 0;

    while (index < reducedStr.length) {
      const chunkLength = Math.random() > 0.5 ? [2, 3] : [3, 2];

      chunkLength.forEach(length => {
        let chunk = reducedStr.substring(index, index + length);

        if (chunk) {
          bubbles.push(chunk);
          index += chunk.length;
        }
      });
    }

    bubbles = bubbles.flatMap(bubble => bubble.trim().split(" "));

    return bubbles;
  }

  createBubbles(str) {
    let bubbles = [];
    const isLong = str.length < 10 ? true : false;
    const isShort = str.length < 5 ? true : false;
    const isSingle = isShort ? true : Math.random() > 0.5 ? true : false;
    let regex = /[~`_$&+,:;=?@#|"'<>.^* (){}[\]\\%!-/\s]/g;

    if (isSingle && isLong) {
      bubbles = str.replace(regex, "").split("");
    } else {
      let arrayOfString = str.split(regex).filter(str => str);
      bubbles = arrayOfString.flatMap(str => this.chunkString(str));
    }

    bubbles = bubbles.map((text, index) => ({ text, index }));

    return bubbles;
  }

  createLetters(term, excludedIndexes) {
    let letters = [];

    letters = term
      .split("")
      .map(
        (letter, index) =>
          excludedIndexes.some(i => i === index) ? letter : ""
      );

    return letters;
  }

  createGroupedWords(text, excludedIndexes) {
    let array = text.split("");
    let groupedWords = [];
    let prevIndex = 0;
    let lastWordIndex = text.length - 1;

    if (excludedIndexes.length) {
      const lastIndex = excludedIndexes.slice(-1)[0];

      array.forEach((letter, nextIndex) => {
        if (excludedIndexes.includes(nextIndex)) {
          let dashes = [...array];
          let subarray = [...dashes.slice(prevIndex, nextIndex)];
          subarray = subarray.map(letter => ({
            letter,
            isVisible: false
          }));
          let excludedLetter = {
            letter,
            isVisible: true
          };
          groupedWords.push(subarray, [excludedLetter]);
          prevIndex = nextIndex + 1;

          if (lastIndex === nextIndex && lastIndex !== lastWordIndex) {
            let lastSubarrayLength = array.length - 1 - lastIndex;
            let lastSubarray = [...array.slice(-lastSubarrayLength)];
            lastSubarray = lastSubarray.map(letter => ({
              letter,
              isVisible: false
            }));

            groupedWords.push(lastSubarray);
          }
        }
      });
    } else {
      let extendedArray = array.map(letter => ({
        letter,
        isVisible: false
      }));
      groupedWords.push(extendedArray);
    }

    return groupedWords.filter(subarray => subarray.length);
  }

  getExcludedIndexes(word) {
    // it won't catch special char like
    const regex = /[~`_$&+,:;=?@#|"'<>.^*(){}[\]\\%!-/\s]/g;
    const array = [];
    let match;

    while ((match = regex.exec(word)) != null) {
      array.push(match.index);
    }

    return array;
  }

  shuffleOptions(array) {
    const newOrder = [...array];
    return newOrder.sort(() => Math.random() - 0.5);
  }

  revealLetters(currentIndex, groupedWords) {
    let leftLetters = currentIndex;

    return groupedWords.map(word => {
      return word.map(obj => {
        if (leftLetters) {
          if (!obj.isVisible) {
            leftLetters--;
            return Object.assign({}, obj, { isVisible: true });
          }
        }
        return obj;
      });
    });
  }

  handlePicking(event) {
    const pickedBubble = event.target.id;
    const pickedIndex = event.target.tabIndex;
    let bubbleLength = pickedBubble.length;

    this.setState(prevState => {
      const {
        index,
        promptingTime,
        correctAnswer,
        userAnswer,
        excludedIndexes
      } = prevState;
      let tabIndex = prevState.tabIndex;
      let bubbles = prevState.bubbles;
      const groupedWords = this.revealLetters(
        bubbleLength,
        prevState.groupedWords
      );
      const correctBubble = bubbles.find(bubble => bubble.index === tabIndex)
        ?.text;

      if (pickedBubble === correctBubble) {
        const counter = 0;
        const bubbleIndex = bubbles.findIndex(
          bubble => bubble.index === pickedIndex
        );

        // remove picked bubble
        if (pickedIndex === tabIndex) {
          bubbles.splice(bubbleIndex, 1, {});
        } else {
          const pickedBubbleIndex = bubbles.findIndex(
            bubble => bubble.index === pickedIndex
          );
          const suitableBubbleIndex = bubbles.findIndex(
            bubble => bubble.index === tabIndex
          );
          bubbles.splice(pickedBubbleIndex, 1, {}); // remove picked bubble
          bubbles[suitableBubbleIndex].index = pickedIndex; // change index
        }

        // user answer with excluded letters
        let nextIndex = index + pickedBubble.length;
        while (excludedIndexes.indexOf(nextIndex) !== -1) {
          nextIndex++;
        }
        const userAnswer = correctAnswer.slice(0, nextIndex);

        tabIndex++;

        // prompting
        clearTimeout(this.prompting);
        this.prompting = setTimeout(this.promptingTimer, promptingTime);

        return {
          counter,
          tabIndex,
          userAnswer,
          bubbles,
          groupedWords,
          index: nextIndex,
          isCorrect: true,
          isPrompting: false
        };
      } else {
        const counter = prevState.counter + 1;

        return {
          counter,
          isWrong: true
        };
      }
    });
  }

  handleAnswer() {
    this.setState({
      isCorrect: false,
      isWrong: false
    });
  }

  promptingTimer() {
    this.setState({
      isPrompting: true
    });
  }

  render() {
    const {
      definition,
      tabIndex,
      boundary,
      bubbles,
      bubblesPositions,
      groupedWords,
      isPrompting,
      isWrong,
      isCorrect
    } = this.state;

    const randomIndex = Math.floor(Math.random() * bubblesPositions.length);

    return (
      <GameWrapper>
        <Definition>{definition}</Definition>

        <BubblesWrapper ref={this.boundaryRef}>
          { bubbles.map(({ text, index }, bubbleIndex) => {
            const isShaken = isPrompting && index === tabIndex;

            return (
              <BubbleComponent
                id={text}
                key={bubbleIndex}
                tabIndex={index}
                index={index}
                boundary={boundary}
                position={bubblesPositions[randomIndex][bubbleIndex]}
                boundaryRef={this.boundaryRef.current}
                isShaken={isShaken}
                handlePicking={this.handlePicking}
              >
                {text}
              </BubbleComponent>
            );
          })}
        </BubblesWrapper>

        <AnswerWrapper
          isWrong={isWrong}
          isCorrect={isCorrect}
          onAnimationEnd={this.handleAnswer}
        >
          <Letters>
            { groupedWords.map((word, wordIndex) => (
              <Word key={wordIndex}>
                { word.map(({ letter, isVisible }, letterIndex) => (
                  <Letter
                    letter={letter}
                    index={letterIndex}
                    isWrong={isWrong}
                    isVisible={isVisible}
                    key={letterIndex}
                  >
                    {letter}
                  </Letter>
                ))}
              </Word>
            ))}
          </Letters>
        </AnswerWrapper>
      </GameWrapper>
    );
  }
}

class BubbleComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startOffsetTop: 0,
      startOffsetLeft: 0,
      offsetTop: 0,
      offsetLeft: 0
    };

    this.bubbleRef = React.createRef();
  }

  componentDidMount() {
    const { boundary, position } = this.props;
    const bubble = this.bubbleRef.current;

    const startOffset = {
      left: Math.floor(boundary.width / 2 - bubble.offsetWidth / 2),
      top: Math.floor(boundary.height / 2 - bubble.offsetHeight / 2)
    };

    const offset = {
      left: boundary.width * position.left,
      top: boundary.height * position.top
    };

    this.setState({
      offsetLeft: offset.left,
      offsetTop: offset.top,
      startOffsetLeft: startOffset.left,
      startOffsetTop: startOffset.top
    });
  }

  render() {
    const {
      startOffsetLeft,
      startOffsetTop,
      offsetLeft,
      offsetTop
    } = this.state;
    const {
      id,
      index,
      tabIndex,
      isShaken,
      children,
      handlePicking
    } = this.props;

    return (
      <BubbleWrapper
        id={id}
        ref={this.bubbleRef}
        startOffsetLeft={startOffsetLeft}
        startOffsetTop={startOffsetTop}
        offsetLeft={offsetLeft}
        offsetTop={offsetTop}
      >
        <Bubble
          id={id}
          tabIndex={tabIndex}
          onClick={handlePicking}
          isShaken={isShaken}
        >
          {children}
        </Bubble>
      </BubbleWrapper>
    );
  }
}

const GameWrapper = styled.div`
  padding-top: 20vh;
  width: 90vw;
  margin: 0 auto;
`;

const Definition = styled.p`
  animation: ${popIn} 0.3s linear 0.5s forwards;
  font-size: 3rem;
  text-align: center;
  margin: 0 1.5rem 4rem;
  opacity: 0;
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

const BubbleWrapper = styled.div`
  ${({ startOffsetLeft, startOffsetTop, offsetLeft, offsetTop, index }) =>
    css`
      animation-name: ${moveForwards(startOffsetLeft,startOffsetTop,offsetLeft,offsetTop)};
      animation-duration: 0.4s;
      animation-delay: ${0.05 + index * 0.05}s;
      animation-fill-mode: both;
    `};
  visibility: ${({ id }) => !id && "hidden" };
  width: 5.5rem;
  height: 5.5rem;
  position: absolute;
  border-radius: 4rem;

  @media (min-width: 768px) {
    width: 6.5rem;
    height: 6.5rem;
    font-size: 2.3rem;
  }
`;

const Bubble = styled.div`
  ${({ isShaken }) =>
    isShaken &&
    css`
      animation-name: ${prompt};
      animation-duration: 3s;
      animation-fill-mode: both;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    `};

  font-weight: ${fonts.bold};
  color: ${colors.blue};
  background: ${colors.white};
  outline: none;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  font-size: 2rem;
  align-items: center;
  border-radius: 4rem;
`;

const AnswerWrapper = styled.div`
  ${({ isWrong }) =>
    isWrong
      ? css`
          animation: ${shake} 0.5s linear;
          border: 1px solid ${colors.warning};
        `
      : css`
          border: 1px solid ${colors.white};
        `};

  ${({ isCorrect }) =>
    isCorrect &&
    css`
      animation: ${pulse} 0.4s linear;
    `};

  position: relative;
  border-radius: 4rem;
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
  padding: 0.5rem 2rem 1.5rem;
  text-align: center;
`;

const Word = styled.div`
  display: inline-block;
  position: relative;
`;

const Letter = styled.span`
  height: 3rem;
  font-size: 2.4rem;
  display: inline-block;
  transition: transform 0.1s ease-out;

  ${({ isVisible, isWrong }) =>
    isVisible
      ? isWrong &&
        css`
          color: ${colors.warning};
        `
      : css`
          color: transparent;
        `};

  ${({ letter, isWrong }) =>
    letter === " "
      ? css`
          width: 1rem;
          border: none;
        `
      : isWrong
        ? css`
            border-bottom: 1px solid ${colors.warning};
          `
        : css`
            border-bottom: 1px solid ${colors.white};
          `};
`;

export default ArrayBubbles;
