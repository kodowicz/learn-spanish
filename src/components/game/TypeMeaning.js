import React, { Component } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { colors } from '../../assets/styles/GlobalStyles';


class TypeMeaning extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      counter: 0,
      promptingTime: 5000,
      definition: "",
      correctAnswer: "",
      prompting: "",
      isFinished: false,
      isFocused: false,
      isPrompting: false,
      isActive: false,
      isWrong: false,
      isCorrect: false,
      excludedIndexes: [],
      dashes: [],
      groupedWords: [],
      currentLetter: {
        wordIndex: 0,
        letterIndex: 0
      }
    }

    this.inputRef = React.createRef();
    this.dashRef = React.createRef();
  }

  componentDidMount() {
    this.createGame();
  }

  createGame() {
    this.setState((state, props) => {
      const { item } = props;
      const correctAnswer = item.term;
      const excludedIndexes = this.getExcludedIndexes(correctAnswer);
      const dashes = this.createDashes(correctAnswer, excludedIndexes);
      const groupedWords = this.createGroupedWords(dashes, excludedIndexes);
      const currentLetter = this.findCurrentLetter(groupedWords);
      const prompting = this.getPromptedLetter(dashes, correctAnswer);
      let nextIndex = 0;

      while (excludedIndexes.indexOf(nextIndex) !== -1) {
        nextIndex++;
      }

      return {
        currentLetter,
        correctAnswer,
        prompting,
        excludedIndexes,
        dashes,
        groupedWords,
        index: nextIndex,
        definition: item.definition
      }
    })
  };

  createGroupedWords = (array, excludedIndexes) => {
    let groupedWords = [];
    let prevIndex = 0;

    if (excludedIndexes.length) {
      array.forEach((letter, nextIndex) => {
        const lastIndex = excludedIndexes.slice(-1)[0];

        if (excludedIndexes.includes(nextIndex)) {
          let dashes = [...array];
          let subarray = [...dashes.slice(prevIndex, nextIndex)];

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

  createDashes = (term, excludedIndexes) => {
    let dashes = [];

    dashes = term.split("").map((letter, index) =>
      excludedIndexes.some(i => i === index) ? letter : ""
    );

    return dashes;
  };

  findCurrentLetter = (groupedWords) => {
    let wordIndex = groupedWords.findIndex(word => word.some(letter => !letter));
    let letterIndex = groupedWords[wordIndex]?.findIndex(letter => !letter);

    return {
      wordIndex,
      letterIndex
    }
  }

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

  switchSpecialLetters = (letterCode, correctLetter) => {
    const charCodes = [
      { basic: 65, ext: ['á', 'à', 'â', 'ã', 'ä', 'å', 'ą'] },
      { basic: 69, ext: ['é', 'è', 'ê', 'ë', 'ę'] },
      { basic: 73, ext: ['í', 'ì', 'î', 'ï'] },
      { basic: 78, ext: ['ñ'] },
      { basic: 79, ext: ['ó', 'ò', 'ô', 'õ', 'ö'] },
      { basic: 85, ext: ['ú', 'ù', 'û', 'ü'] },
      { basic: 89, ext: ['ý', 'ÿ'] },
      { basic: 67, ext: ['ç'] }
    ];
    const index = charCodes.findIndex(code => code.basic === letterCode);
    let isCommutable = false;

    if (index !== -1) {
      isCommutable = charCodes[index].ext.some(letter => letter === correctLetter.toLowerCase());
    }

    return isCommutable
  }

  handleTyping = (event) => {
    const keyCode = event;
    const currentCode = event.which || event.code;
    let currentKey = event.key;
    event.persist();

    if (!currentKey) {
      currentKey = String.fromCharCode(currentCode);
    }

    this.setState(state => {
      const { index, promptingTime, correctAnswer, excludedIndexes, dashes } = state;
      const correctLetter = correctAnswer[index];
      let userLetter = event.key;
      const isCommutable = this.switchSpecialLetters(currentCode, correctLetter);

      if (isCommutable || userLetter === correctLetter) {
        const counter = 0;
        let nextIndex = index + 1;
        userLetter = (isCommutable ? correctLetter : userLetter);

        while (excludedIndexes.indexOf(nextIndex) !== -1) {
          nextIndex++;
        }

        dashes[index] = userLetter;
        const groupedWords = this.createGroupedWords(dashes, excludedIndexes);
        const currentLetter = this.findCurrentLetter(groupedWords);

        // prompting
        clearTimeout(this.prompting);
        const prompting = this.getPromptedLetter(dashes, correctAnswer);
        this.prompting = setTimeout(this.promptingTimer, promptingTime);

        return {
          counter,
          currentLetter,
          prompting,
          dashes,
          groupedWords,
          index: nextIndex,
          isPrompting: false,
          isCorrect: true
        };

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
      const { dashes, correctAnswer, counter } = this.state;
      const isFinished = dashes.join('') === correctAnswer;

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

  handleFocus = event => {
    this.setState({
      isFocused: true
    }, () => this.prompting = setTimeout(
      this.promptingTimer,
      this.state.promptingTime
    ))
  }

  handleBlur = event => {
    this.setState({
      isFocused: false,
      isPrompting: false,
      prompting: ""
    }, () => clearTimeout(this.prompting))
  }

  promptingTimer = () => {
    this.setState((state) => {
      const prompting = this.getPromptedLetter(state.dashes, state.correctAnswer);
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
      prompting,
      dashes,
      groupedWords,
      definition,
      isFinished,
      isFocused,
      isPrompting,
      isWrong,
      isCorrect,
      index: currentIndex
    } = this.state;

    return (
      <GameWrapper isFinished={isFinished}>
        <Definition>{definition}</Definition>

        <InputWrapper
          isWrong={isWrong}
          isCorrect={isCorrect}
          onAnimationEnd={this.handleAnswer}>

          <Input
            ref={this.inputRef}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onKeyDown={this.handleTyping}
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false" />

          <Dashes>
            { groupedWords.map((word, wordIndex) => {
                const activeWord = wordIndex === currentLetter.wordIndex ? true : false;

                return (
                  <Word key={wordIndex}>
                    { word.map((letter, letterIndex) => {
                      const activeLetter = letterIndex === currentLetter.letterIndex ? true : false;
                      const isActive = isFocused && activeWord && activeLetter;

                      return (isActive && isPrompting) ?
                        <DashWrapper key={letterIndex}>
                          <Dash
                            letter={letter}
                            ref={isActive ? this.dashRef : false}
                            isActive={isActive ? true : false}
                            index={letterIndex}
                            isBlock={/\n/.test(letter)}>
                            {letter}
                          </Dash>
                          <Prompting>{prompting}</Prompting>
                        </DashWrapper>
                        :
                        <Dash
                          letter={letter}
                          ref={isActive ? this.dashRef : false}
                          isActive={isActive ? true : false}
                          index={letterIndex}
                          key={letterIndex}
                          isBlock={/\n/.test(letter)}>
                          {letter}
                        </Dash>
                    })}
                  </Word>
                )
              })
            }
          </Dashes>
        </InputWrapper>
      </GameWrapper>
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

const blink = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
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

const GameWrapper = styled.div`
  display: ${({ isChosen }) => (isChosen ? 'none' : 'block')};
  padding-top: 20vh;
  width: 80vw;
  margin: 0 auto;
`;

const Definition = styled.p`
  font-size: 3rem;
  text-align: center;
  margin: 7rem 0;
  opacity: 0;
  animation: ${popIn} .3s linear 0.4s forwards;
`;

const InputWrapper = styled.div`
  position: relative;
  border: 1px solid white;
  border-radius: 4rem;
  min-height: 5rem;
  height: auto;
  display: flex;
  align-items: center;

  width: 80vw;
  margin: 0 auto;

  @media (min-width: 768px) {
    width: 50rem;
  }

  ${({ isWrong }) => isWrong && css`
    animation: ${shake} 0.5s linear;
  `};

  ${({ isCorrect }) => isCorrect && css`
    animation: ${pulse} 0.4s linear;
  `}
`;

const Input = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  border: none;
  background: none;
  outline: none;
  color: transparent;
  caret-color: transparent;
  width: 100%;
  height: 100%;
  font-size: 1.6rem;
`;

const Dashes = styled.div`
  margin: 0 auto;
  padding: 1rem 2rem;
  text-align: center;
`;

const Word = styled.div`
  display: inline-block
`;

const DashWrapper = styled.span`
  position: relative
`;

const Dash = styled.span`
  font-size: 2.4rem;
  display: inline-block;
  transition: transform 0.1s ease-out;

  width: ${({ letter }) => letter === ' ' && '1rem'};

  ${({ isActive }) => isActive && css`
    animation: ${blink} 1s linear infinite;
    transform: translateY(4px);
  `};

  ${({ isBlock }) => isBlock && css`
    display: block;
    height: 1rem;
  `};

  ${({ letter }) => !letter && css`
    height: calc(2.8rem);
    width: 1rem;
    margin: 0 0.2rem;
    border-bottom: 1px solid white;
  `};
`;

const Prompting = styled.span`
  position: absolute;
  top: -1.2rem;
  left: 0;
  font-size: 2.4rem;
  height: 2.4rem;
  color: ${colors.bluish};

  @media (min-width: 768px) {
    top: -1rem
  }
`;

export default TypeMeaning
