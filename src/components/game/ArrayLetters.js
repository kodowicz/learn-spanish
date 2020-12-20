import React, { Component } from "react";
import styled, { css } from "styled-components";
import { colors } from "../../assets/styles/GlobalStyles";
import { shake, scale, fadeUp, popIn } from "../../assets/styles/GlobalKeyframes";

class ArrayLetters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      definition: "",
      userAnswer: "",
      correctAnswer: "",
      counter: 0,
      index: 0,
      promptingTime: 3000,
      isPrompting: false,
      excludedIndexes: [],
      groupedWords: [],
      letters: [],
      promptedLetter: {
        wordIndex: 0,
        letterIndex: 0
      }
    }

    this.handlePicking = this.handlePicking.bind(this);
    this.promptingTimer = this.promptingTimer.bind(this);
    this.handleLettersAnimation = this.handleLettersAnimation.bind(this);
  }

  componentDidMount() {
    this.createGame();
    this.prompting = setTimeout(this.promptingTimer, this.state.promptingTime);
  }

  componentDidUpdate(prevProps, prevState) {
    const { userAnswer, counter, correctAnswer } = this.state;

    if (prevState.userAnswer !== userAnswer) {
      const { item, showGameAnswer } = prevProps;
      const isFinished = userAnswer === correctAnswer;

      if (counter === 3) {
        window.setTimeout(() => showGameAnswer(item, "wrong"), 200);
      } else if (isFinished) {
        window.setTimeout(() => showGameAnswer(item, "correct"), 500);
      }
    }
  }

  createGame() {
    this.setState((state, props) => {
      const correctAnswer = props.item.term;
      const excludedIndexes = this.getExcludedIndexes(correctAnswer);
      const groupedWords = this.createGroupedWords(
        correctAnswer,
        excludedIndexes
      );
      let nextIndex = 0;

      while (excludedIndexes.indexOf(nextIndex) !== -1) {
        nextIndex++;
      }

      const promptedLetter = this.findCurrentLetter(nextIndex, groupedWords);
      const userAnswer = correctAnswer.slice(0, nextIndex);
      let letters = this.randomLetters(correctAnswer.toLowerCase(), nextIndex);
      letters = this.shuffleOptions(letters);

      return {
        userAnswer,
        correctAnswer,
        excludedIndexes,
        letters,
        groupedWords,
        promptedLetter,
        index: nextIndex,
        definition: props.item.definition
      };
    });
  };

  randomLetters(word, index) {
    const alphabet = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "r", "s", "t", "u", "w", "z" ];
    const correctLetter = {
      letter: word[index],
      isWrong: false,
      isScaled: true
    };
    let letters = [correctLetter];

    while (letters.length < 5) {
      const index = Math.floor(Math.random() * alphabet.length);
      const isTaken = letters.some(el => el.letter === alphabet[index]);

      if (!isTaken) {
        const wrongLetter = {
          letter: alphabet[index],
          isWrong: false,
          isScaled: true
        };
        letters.push(wrongLetter);
      }
    }

    return letters;
  };

  shuffleOptions(array) {
    const newOrder = [...array];
    return newOrder.sort(() => Math.random() - 0.5);
  };

  getExcludedIndexes(word) {
    const regex = /[~`_$&+,:;=?@#|"'<>.^*(){}[\]\\%!-/\s]/g;
    const array = [];
    let match;

    while ((match = regex.exec(word)) != null) {
      array.push(match.index);
    }

    return array;
  };

  createGroupedWords(text, excludedIndexes) {
    let array = text.split("");
    let groupedWords = [];
    let prevIndex = 0;
    let lastWordIndex = text.length - 1;

    if (excludedIndexes.length) {
      const lastIndex = excludedIndexes.slice(-1)[0];

      array.forEach((letter, nextIndex) => {
        if (excludedIndexes.includes(nextIndex)) {
          let subarray = [...array.slice(prevIndex, nextIndex)];
          let excludedLetter = {
            letter,
            isVisible: true
          };

          subarray = subarray.map(letter => ({
            letter,
            isVisible: false
          }));
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
  };

  revealLetters(groupedWords) {
    let leftLetters = 1;

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
  };

  findCurrentLetter(index, groupedWords) {
    let inputIndex = index;
    let wordIndex = 0;
    let letterIndex = 0;

    groupedWords.forEach(word => {
      const wordLength = word.length;
      if (inputIndex) {
        if (wordLength - 1 < inputIndex) {
          wordIndex++;
          inputIndex = inputIndex - wordLength;
        } else {
          letterIndex = inputIndex;
          inputIndex = 0;
        }
      }
    });

    return {
      wordIndex,
      letterIndex
    };
  };

  checkIfCompleted(array) {
    let counter = 0;

    array.forEach(subarray =>
      subarray.forEach(obj => {
        if (!obj.isVisible) {
          counter++;
        }
      })
    );

    return counter === 0 ? true : false;
  };

  handlePicking(event) {
    event.persist();

    this.setState(
      (prevState, props) => {
        const { index, promptingTime, excludedIndexes } = prevState;
        const correctAnswer = prevState.correctAnswer;
        const correctLetter = correctAnswer[index].toLowerCase();
        const choice = event.target.id;
        let nextIndex = index + 1;

        if (choice === correctLetter) {
          while (excludedIndexes.indexOf(nextIndex) !== -1) {
            nextIndex++;
          }

          const groupedWords = this.revealLetters(prevState.groupedWords);
          const userAnswer = correctAnswer.slice(0, nextIndex);
          const isCompleted = this.checkIfCompleted(groupedWords);

          // if that was the last letter
          if (isCompleted) {
            return {
              userAnswer,
              groupedWords
            };
          } else {
            const promptedLetter = this.findCurrentLetter(
              nextIndex,
              groupedWords
            );
            let letters = this.randomLetters(
              correctAnswer.toLowerCase(),
              nextIndex
            );
            letters = this.shuffleOptions(letters);

            clearTimeout(this.prompting);
            this.prompting = setTimeout(this.promptingTimer, promptingTime);

            return {
              userAnswer,
              letters,
              groupedWords,
              promptedLetter,
              index: nextIndex,
              counter: 0,
              isPrompting: false
            };
          }

          // wrong letter
        } else {
          let counter = prevState.counter + 1;
          let letters = prevState.letters;
          const wrongIndex = letters.findIndex(
            element => element.letter === choice
          );
          let wrongLetter = letters[wrongIndex];

          // shake letter
          wrongLetter.isWrong = true;
          letters.splice(wrongIndex, 1, wrongLetter);

          return {
            counter,
            letters
          };
        }
      },
      () => {
        const { counter } = this.state;
        const { item, showGameAnswer } = this.props;

        if (counter === 3) {
          showGameAnswer(item, "wrong");
        }
      }
    );
  };

  handleLettersAnimation() {
    this.setState(state => {
      const letters = state.letters;
      letters.forEach(element => (element.isWrong = false));
      letters.forEach(element => (element.isScaled = false));

      return { letters };
    });
  };

  promptingTimer() {
    this.setState({
      isPrompting: true
    });
  };

  render() {
    const {
      definition,
      correctAnswer,
      isPrompting,
      isFinished,
      letters,
      groupedWords,
      promptedLetter
    } = this.state;

    return (
      <GameWrapper>
        <Term>{definition}</Term>

        <AnswerWrapper>
          {groupedWords.map((word, wordIndex) => {
            const activeWord =
              wordIndex === promptedLetter.wordIndex ? true : false;

            return (
              <WordAnswer key={wordIndex}>
                {word.map(({ letter, isVisible }, letterIndex) => {
                  const activeLetter =
                    letterIndex === promptedLetter.letterIndex ? true : false;
                  const isPrompted = isPrompting && activeWord && activeLetter;

                  return (
                    <AnswerLetter
                      key={letterIndex}
                      letter={letter}
                      isFaded={letter}
                      isPrompted={isPrompted}
                      isVisible={isVisible}
                    >
                      {letter}
                    </AnswerLetter>
                  );
                })}
              </WordAnswer>
            );
          })}
        </AnswerWrapper>

        <PickWrapper>
          {letters.map(({ letter, isScaled, isWrong }, index) => (
            <PickLetter
              id={letter}
              key={index}
              isScaled={isScaled}
              isWrong={isWrong}
              onClick={this.handlePicking}
              onAnimationEnd={this.handleLettersAnimation}
            >
              {letter}
            </PickLetter>
          ))}
        </PickWrapper>
      </GameWrapper>
    );
  }
}

const GameWrapper = styled.div`
  padding-top: 20vh;
  width: 80vw;
  margin: 0 auto;
`;

const Term = styled.p`
  animation: ${popIn} 0.3s linear 0.4s forwards;
  font-size: 3rem;
  margin: 0;
  margin-bottom: 1.5rem;
  text-align: center;
  opacity: 0;
`;

const AnswerWrapper = styled.div`
  color: ${colors.lightGray};
  height: auto;
  width: auto;
  text-align: center;
  margin: 7rem auto;
`;

const WordAnswer = styled.div`
  display: inline-block;
`;

const AnswerLetterWrapper = styled.span`
  position: relative;
`;

const AnswerLetter = styled.span`
  font-size: 2.4rem;
  display: inline-block;
  position: relative;
  color: transparent;

  ${({ isVisible }) =>
    isVisible &&
    css`
      animation: ${fadeUp} 0.3s forwards;
    `};

  ${({ letter }) =>
    letter === " "
      ? css`
          width: 1rem;
        `
      : css`
          border-bottom: 1px solid white;
        `};

  &:after {
    content: "${p => p.letter}";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;

    ${({ isPrompted, isVisible }) =>
      isPrompted && !isVisible
        ? css`
            color: ${colors.darkGray};
          `
        : css`
            color: transparent;
          `};
  }

  @media (min-width: 768px) {
    font-size: 2.8rem;
    bottom: ${({ letter }) => letter && "4px"};

    ${({ letter }) =>
      !letter &&
      css`
        height: calc(2.8rem * 1.333);
        width: 1.7rem;
        margin: 0 0.2rem;
        border-bottom: 1px solid white;
      `};
  }
`;

const PickWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  max-width: 30rem;
  margin: 0 auto;
`;

const PickLetter = styled.span`
  ${({ isScaled }) =>
    isScaled &&
    css`
      animation: ${scale} 0.4s linear both;
    `};

  ${({ isWrong }) =>
    isWrong &&
    css`
      animation: ${scale} 0.3s linear, ${shake} 0.5s linear;
    `};

  padding: 0.7rem 0;
  width: 4rem;
  text-align: center;
  border: 1px solid white;
  border-radius: 7px;
  font-size: 2.6rem;
  text-transform: capitalize;

  @media (min-width: 768px) {
    padding: 0.8rem 0;
    width: 4.2rem;
    font-size: 2.8rem;
  }
`;

export default ArrayLetters;
