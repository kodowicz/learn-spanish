import React, { Component } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { colors } from '../../assets/styles/GlobalStyles';
import { shake, scale, fadeUp, popIn } from '../../assets/styles/GlobalKeyframes';


class ArrayLetters extends Component {
  state = {
    definition: "",
    correctAnswer: "",
    prompting: "",
    counter: 0,
    index: 0,
    promptingTime: 5000,
    lastLetterIndex: null,
    isPrompting: false,
    isFinished: false,
    excludedIndexes: [],
    answer: [],
    groupedWords: [],
    letters: [],
    currentLetter: {
      wordIndex: 0,
      letterIndex: 0
    }
  }

  componentDidMount() {
    this.createGame();
    this.prompting = setTimeout(this.promptingTimer, this.state.promptingTime)
  }

  createGame() {
    this.setState((state, props) => {
      const { item: { term: correctAnswer, definition }} = props;
      const { index } = this.state;
      const excludedIndexes = this.getExcludedIndexes(correctAnswer);
      const regex = /[~`_$&+,:;=?@#|"'<>.^*(){}[\]\\%!-/\s]/g;
      let nextIndex = 0;

      let answer = correctAnswer
      .split("")
      .map((letter, index) =>
        excludedIndexes.some(char => char === index) ? letter : null
      );

      const groupedWords = this.createGroupedWords(answer, excludedIndexes);
      const currentLetter = this.findCurrentLetter(groupedWords);

      while (excludedIndexes.indexOf(nextIndex) !== -1) {
        nextIndex++;
      }

      let letters = this.randomLetters(correctAnswer, nextIndex);
      letters = this.shuffleOptions(letters);

      const lastLetterIndex = answer.lastIndexOf(null);
      const prompting = this.getPromptedLetter(answer, correctAnswer);

      return {
        lastLetterIndex,
        correctAnswer,
        definition,
        prompting,
        excludedIndexes,
        letters,
        answer,
        groupedWords,
        currentLetter,
        index: nextIndex
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
    const regex = /[~`_$&+,:;=?@#|"'<>.^*(){}[\]\\%!-/\s]/g;
    const array = [];
    let match;

    while ((match = regex.exec(word)) != null) {
      array.push(match.index)
    }

    return array
  }

  createGroupedWords = (array, excludedIndexes) => {
    let groupedWords = [];
    let prevIndex = 0;

    if (excludedIndexes.length) {
      array.forEach((letter, nextIndex) => {
        const lastIndex = excludedIndexes.slice(-1)[0];

        if (excludedIndexes.includes(nextIndex)) {
          let words = [...array];
          let subarray = [...words.slice(prevIndex, nextIndex)];

          groupedWords.push(subarray, [letter]);
          prevIndex = nextIndex + 1

          if (lastIndex === nextIndex) {
            let lastSubarrayLength = (array.length - 1) - lastIndex;
            let lastSubarray = [...array.slice(-lastSubarrayLength)];

            groupedWords.push(lastSubarray)
          }
        }
      })

    } else {
      groupedWords.push(array);
    }

    return groupedWords.filter(subarray => subarray.length)
  }

  findCurrentLetter = (groupedWords) => {
    let wordIndex = groupedWords.findIndex(word => word.some(letter => !letter));
    let letterIndex = groupedWords[wordIndex]?.findIndex(letter => !letter);

    return {
      wordIndex,
      letterIndex
    }
  }

  handlePicking = (event) => {
    event.persist();

    this.setState((state, props) => {
      const { index, lastLetterIndex, promptingTime, excludedIndexes } = state;
      const correctAnswer = state.correctAnswer;
      const correctLetter = correctAnswer[index];
      const choice = event.target.id;
      let nextIndex = index + 1;
      let answer = [...state.answer];
      let trimNumber = 1;
      let insertedAnswer = [choice];

      if (choice === correctLetter) {

        // if this is the last correct letter
        if (lastLetterIndex === index) {
          const emptyIndex = answer.findIndex(letter => !letter);
          answer.splice(emptyIndex, trimNumber, ...insertedAnswer);
          const groupedWords = this.createGroupedWords(answer, excludedIndexes);

          return {
            answer,
            groupedWords
          }

        // if this is not the last letter
        } else {
          const nextLetter = correctAnswer[nextIndex];
          if (excludedIndexes.indexOf(nextIndex) !== -1) {

            while (excludedIndexes.indexOf(nextIndex) !== -1) {
              insertedAnswer.push(correctAnswer[nextIndex]);
              trimNumber++;
              nextIndex++;
            }

            const emptyIndex = answer.findIndex(letter => !letter);
            answer.splice(emptyIndex, trimNumber, ...insertedAnswer)

          } else if (nextLetter) {
            const emptyIndex = answer.findIndex(letter => !letter);
            answer.splice(emptyIndex, trimNumber, ...insertedAnswer);
          }

          // create a new array of random letters and reset prompting
          const prompting = this.getPromptedLetter(answer, correctAnswer);
          let letters = this.randomLetters(correctAnswer, nextIndex);
          const groupedWords = this.createGroupedWords(answer, excludedIndexes);
          const currentLetter = this.findCurrentLetter(groupedWords);
          clearTimeout(this.prompting);
          this.prompting = setTimeout(this.promptingTimer, promptingTime);
          letters = this.shuffleOptions(letters);

          return {
            prompting,
            letters,
            answer,
            groupedWords,
            currentLetter,
            index: nextIndex,
            counter: 0,
            isPrompting: false,
          }
        }

      // wrong letter
      } else {
        let counter = state.counter + 1;
        let letters = state.letters;
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
    this.setState((state) => {
      const { answer, correctAnswer } = state;
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
    this.setState((state) => {
      const letters = state.letters;
      letters.forEach(element => element.isWrong = false);
      letters.forEach(element => element.isScaled = false);

      return { letters }
    })
  }

  promptingTimer = () => {
    this.setState((state) => {
      const prompting = this.getPromptedLetter(state.answer, state.correctAnswer);
      return {
        prompting,
        isPrompting: true
      }
    });
  }

  getPromptedLetter = (array, str) => {
    const index = array.findIndex(letter => !letter);
    const nextLetter = index === -1 ? str[0] : str[index];
    return nextLetter
  }

  render() {
    const {
      currentLetter,
      definition,
      groupedWords,
      correctAnswer,
      prompting,
      isPrompting,
      isFinished,
      letters,
      answer
    } = this.state;
    // const currentLetter = answer.findIndex(letter => !letter);

    return (
      <GameWrapper isFinished={isFinished}>
        <Term>{definition}</Term>

        <AnswerWrapper>
          { groupedWords.map((word, wordIndex) => {
          const activeWord = wordIndex === currentLetter.wordIndex ? true : false;

          return (
            <WordAnswer key={wordIndex}>
              { word.map((letter, letterIndex) => {
                const activeLetter = letterIndex === currentLetter.letterIndex ? true : false;
                const isActive = activeWord && activeLetter;
                // const isActive = currentLetter === index;

              return (isActive && isPrompting) ?
                <AnswerLetterWrapper key={letterIndex}>
                  <AnswerLetter
                    letter={letter}
                    isBlock={/\n/.test(letter)}
                    isFaded={letter}
                    onAnimationEnd={this.handleFadeUp}>
                    {letter}
                  </AnswerLetter>
                  <Prompting>{prompting}</Prompting>
                </AnswerLetterWrapper>
              :
                <AnswerLetter
                  key={letterIndex}
                  letter={letter}
                  isBlock={/\n/.test(letter)}
                  isFaded={letter}
                  onAnimationEnd={this.handleFadeUp}>
                  {letter}
                </AnswerLetter>
            })}
            </WordAnswer>
          )
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
              onAnimationEnd={this.handleLettersAnimation}>
              {letter}
            </PickLetter>
          ))}
        </PickWrapper>

      </GameWrapper>
    )
  }
};


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
  width: auto;
  text-align: center;
  margin: 10rem auto 5rem auto;

  @media (min-width: 768px) {
    margin: 7rem auto 8rem auto;
  }
`;

const WordAnswer = styled.div`
  display: inline-block
`;

const AnswerLetterWrapper = styled.span`
  position: relative
`;

const AnswerLetter = styled.span`
  font-size: 2.4rem;
  display: inline-block;
  position: relative;

  width: ${({ letter }) => letter === " " && "1rem" };
  bottom: ${({ letter }) => letter && "2px" };

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

  @media (min-width: 768px) {
    font-size: 3rem;
    bottom: ${({ letter }) => letter && "4px" };

    ${({ letter }) => !letter && css`
      height: calc(2.8rem * 1.333);
      width: 2rem;
      margin: 0 0.3rem;
      border-bottom: 1px solid white
    `}
  }
`;

const Prompting = styled.span`
  color: ${colors.bluish};
  position: absolute;
  text-align: center;
  top: -1.1rem;
  left: 0;
  font-size: 2.4rem;
  width: 100%;

  @media (min-width: 768px) {
    font-size: 3rem;
    top: -1.8rem;
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
