import React, { Component } from "react";
import styled, { css } from "styled-components";
import { BasicTextArea, colors, fonts } from "../../assets/styles/GlobalStyles";
import { popIn, pulse, shake } from "../../assets/styles/GlobalKeyframes";

class TypeMeaning extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valueIndex: 1,
      counter: 0,
      promptingTime: 3000,
      dashesWidth: 0,
      inputPadding: 0,
      inputWidth: 0,
      inputHeight: 0,
      inputValue: "",
      definition: "",
      correctAnswer: "",
      isPrompting: false,
      isInputWrong: false,
      hasMoreLines: false,
      isWrong: false,
      isCorrect: false,
      excludedIndexes: [],
      groupedWords: [],
      promptedLetter: {
        wordIndex: 0,
        letterIndex: 0
      }
    };

    this.inputRef = React.createRef();
    this.dashesRef = React.createRef();
    this.firstWordRef = React.createRef();
    this.dashRef = React.createRef();

    this.handleTyping = this.handleTyping.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.promptingTimer = this.promptingTimer.bind(this);
  }

  componentDidMount() {
    this.createGame();
  }

  componentDidUpdate(prevProps, prevState) {
    const { inputValue, correctAnswer, counter } = this.state;
    const wordsRef = this.dashesRef.current.childNodes;
    const dashesRect = this.dashesRef.current.getBoundingClientRect();
    const wordRect = this.firstWordRef.current.getBoundingClientRect();
    const inputPadding = wordRect.left - dashesRect.left;
    const dashesWidth = dashesRect.width;
    const hasMoreLines = dashesRect.height > 60;
    const maxWidth = prevProps.isDesktop ? 400 : 250;
    let inputWidth = 0;

    wordsRef.forEach(word => {
      const width = word.getBoundingClientRect().width;
      const newWidth = inputWidth + width;

      if (newWidth < maxWidth) {
        inputWidth += width;
      }
    });

    if (dashesWidth !== prevState.dashesWidth) {
      this.setState({
        hasMoreLines,
        dashesWidth,
        inputWidth,
        inputPadding
      });
    }

    if (prevState.inputValue !== inputValue) {
      const { item, isSkipped, showGameAnswer } = prevProps;
      const isFinished =
        inputValue.toLowerCase() === correctAnswer.toLowerCase();

      if (counter === 3) {
        window.setTimeout(() => showGameAnswer(item, "wrong", isSkipped), 200);
      } else if (isFinished) {
        window.setTimeout(() => showGameAnswer(item, "correct", isSkipped), 500);
      }
    }
  }

  createGame() {
    this.setState((state, props) => {
      const { item } = props;
      const correctAnswer = item.term.replace(/\n/, "");
      const excludedIndexes = this.getExcludedIndexes(correctAnswer);
      const groupedWords = this.createGroupedWords(
        correctAnswer,
        excludedIndexes
      );
      const promptedLetter = this.findCurrentLetter(0, groupedWords);
      let nextIndex = 0;

      while (excludedIndexes.indexOf(nextIndex) !== -1) {
        nextIndex++;
      }

      if (excludedIndexes.includes(0)) {
        this.prompting = setTimeout(this.promptingTimer, 0);
      } else {
        this.prompting = setTimeout(
          this.promptingTimer,
          this.state.promptingTime
        );
      }

      return {
        promptedLetter,
        correctAnswer,
        excludedIndexes,
        groupedWords,
        index: nextIndex,
        definition: item.definition
      };
    });
  }

  excludeSpaces(word) {
    const regex = /\s/g;
    const array = [];
    let match;

    while ((match = regex.exec(word)) != null) {
      array.push(match.index);
    }

    return array;
  }

  createGroupedWords(text) {
    let array = text.split("");
    let groupedWords = [];
    let prevIndex = 0;
    let lastWordIndex = text.length - 1;
    const excludedIndexes = this.excludeSpaces(text);

    if (excludedIndexes.length) {
      const lastIndex = excludedIndexes.slice(-1)[0];

      array.forEach((letter, nextIndex) => {
        if (excludedIndexes.includes(nextIndex)) {
          let dashes = [...array];
          let subarray = [...dashes.slice(prevIndex, nextIndex)];

          groupedWords.push(subarray, [letter]);
          prevIndex = nextIndex + 1;

          if (lastIndex === nextIndex && lastIndex !== lastWordIndex) {
            let lastSubarrayLength = array.length - 1 - lastIndex;
            let lastSubarray = [...array.slice(-lastSubarrayLength)];

            groupedWords.push(lastSubarray);
          }
        }
      });
    } else {
      groupedWords.push(array);
    }

    return groupedWords.filter(subarray => subarray.length);
  }

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

  switchSpecialLetters(letters, correctLetters) {
    const chars = [
      { basic: "a", regex: /[áàâãäåą]/ },
      { basic: "e", regex: /[éèêëę]/ },
      { basic: "i", regex: /[íìîï]/ },
      { basic: "n", regex: /[ñń]/ },
      { basic: "o", regex: /[óòôõö]/ },
      { basic: "u", regex: /[úùûü]/ },
      { basic: "y", regex: /[ýÿ]/ },
      { basic: "c", regex: /[ç]/ },
      { basic: "l", regex: /ł/ },
      { basic: "z", regex: /[żź]/ },
      { basic: "s", regex: /ś/ }
    ];

    const lastLetter = letters[letters.length - 1];
    const lastCorrectLetter = correctLetters[correctLetters.length - 1];

    const isCommutable = chars.some(
      char => char.basic === lastLetter && char.regex.test(lastCorrectLetter)
    );

    if (isCommutable) {
      return correctLetters;
    }
  }

  handleTyping(event) {
    const inputValue = event.target.value.toLowerCase();

    this.setState(prevState => {
      const {
        promptingTime,
        correctAnswer,
        excludedIndexes,
        groupedWords
      } = prevState;
      let valueIndex = inputValue.length;
      let counter = prevState.counter;

      // prevent typing if task is completed
      const isFinished = inputValue.length > correctAnswer.length;

      if (!isFinished) {
        const correctLetters = correctAnswer.slice(0, valueIndex);
        const exchanged = this.switchSpecialLetters(
          inputValue,
          correctLetters.toLowerCase()
        );

        if (exchanged || inputValue === correctLetters.toLowerCase()) {
          if (prevState.valueIndex < valueIndex) {
            counter = 0;
          }

          const promptedLetter = this.findCurrentLetter(
            valueIndex,
            groupedWords
          );

          // prompting
          clearTimeout(this.prompting);
          if (excludedIndexes.includes(valueIndex)) {
            this.prompting = setTimeout(this.promptingTimer, 0);
          } else {
            this.prompting = setTimeout(this.promptingTimer, promptingTime);
          }

          return {
            counter,
            valueIndex,
            promptedLetter,
            correctLetters,
            inputValue: correctLetters,
            isInputWrong: false,
            isPrompting: false,
            isCorrect: true
          };
        } else {
          let counter = prevState.counter;

          if (prevState.valueIndex < valueIndex) {
            counter++;
          }

          clearTimeout(this.prompting);

          return {
            counter,
            valueIndex,
            inputValue,
            correctLetters,
            isPrompting: false,
            isInputWrong: true,
            isWrong: true
          };
        }
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
      inputPadding,
      inputValue,
      definition,
      hasMoreLines,
      isPrompting,
      isWrong,
      isCorrect,
      inputWidth,
      isInputWrong,
      groupedWords,
      promptedLetter
    } = this.state;
    const { isDesktop } = this.props;
    const aditionalWidth = hasMoreLines ? 0 : isDesktop ? 24 : 16;

    return (
      <GameWrapper>
        <Definition>{definition}</Definition>

        <InputWrapper
          isWrong={isWrong}
          isInputWrong={isInputWrong}
          isCorrect={isCorrect}
          onAnimationEnd={this.handleAnswer}
        >
          <Input
            ref={this.inputRef}
            value={inputValue}
            width={inputWidth + aditionalWidth} // for wrong letter at the end
            isInputWrong={isInputWrong}
            hasMoreLines={hasMoreLines}
            padding={inputPadding}
            isWrong={isWrong}
            onInput={this.handleTyping}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />

          <Dashes
            hasMoreLines={hasMoreLines}
            width={inputWidth}
            ref={this.dashesRef}
          >
            {groupedWords.map((word, wordIndex) => {
              const isFirstWord = wordIndex === 0;
              const activeWord = wordIndex === promptedLetter.wordIndex;

              return (
                <Word ref={isFirstWord && this.firstWordRef} key={wordIndex}>
                  {word.map((letter, letterIndex) => {
                    const activeLetter =
                      letterIndex === promptedLetter.letterIndex;
                    const isActive = activeWord && activeLetter;

                    return (
                      <Dash
                        letter={letter}
                        ref={isActive && this.dashRef}
                        isInputWrong={isInputWrong}
                        isActive={isPrompting && isActive}
                        index={letterIndex}
                        key={letterIndex}
                        isWrong={isWrong}
                      >
                        {letter}
                      </Dash>
                    );
                  })}
                </Word>
              );
            })}
          </Dashes>
        </InputWrapper>
      </GameWrapper>
    );
  }
}

const GameWrapper = styled.div`
  padding-top: 20vh;
  width: 80vw;
  margin: 0 auto;
`;

const Definition = styled.p`
  animation: ${popIn} 0.3s linear 0.4s forwards;
  font-size: 3rem;
  text-align: center;
  margin: 7rem 0;
  opacity: 0;
`;

const InputWrapper = styled.div`
  position: relative;
  min-height: 5rem;
  border-radius: 4rem;
  width: 80vw;
  margin: 0 auto;

  &::after {
    border: 1px solid ${colors.white};
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 4rem;

    ${({ isInputWrong }) =>
      isInputWrong
        ? css`
            border: 1px solid ${colors.warning};
          `
        : css`
            border: 1px solid ${colors.white};
          `};

    ${({ isWrong }) =>
      isWrong &&
      css`
        animation: ${shake} 0.5s linear;
      `};

    ${({ isCorrect }) =>
      isCorrect &&
      css`
        animation: ${pulse} 0.4s linear;
      `};
  }

  @media (min-width: 768px) {
    width: 50rem;
  }
`;

const Input = styled(BasicTextArea)`
  width: ${ props => `${props.width}px`};

  ${({ isInputWrong }) =>
    isInputWrong
      ? css`
          color: ${colors.warning};
        `
      : css`
          color: ${colors.white};
        `};

  ${({ hasMoreLines }) =>
    hasMoreLines
      ? css`
          transform: translateX(-50%);
        `
      : css`
          transform: translateX(calc(-50% + 8px));
        `};

  padding: 1.1rem 0;
  height: 100%;
  position: absolute;
  top: 0;
  left: 50%;
  font-size: 2rem;
  outline: none;
  margin: 0;
  z-index: 1;

  @media (min-width: 768px) {
    font-size: 2.4rem;

    ${({ hasMoreLines }) =>
      hasMoreLines
        ? css`
            transform: translateX(-50%);
          `
        : css`
            transform: translateX(calc(-50% + 12px));
          `};
  }
`;

const Dashes = styled.div`
  ${({ width }) =>
    width
      ? css`
          width: ${width}px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
        `
      : css`
          width: fit-content;
          display: flex;
          flex-wrap: wrap;
        `};

  ${({ hasMoreLines }) =>
    hasMoreLines
      ? css`
          justify-content: flex-start;
        `
      : css`
          justify-content: center;
        `};

  padding: 1.1rem 0;
  height: 100%;
  margin: 0 auto;
  font-size: 2rem;
  z-index: 0;

  @media (min-width: 768px) {
    font-size: 2.4rem;
  }
`;

const Word = styled.div`
  display: inline-block;
`;

const Dash = styled.span`
  display: inline-block;
  transition: transform 0.1s ease-out;

  ${({ isActive }) =>
    isActive
      ? css`
          color: ${colors.darkGray};
        `
      : css`
          color: transparent;
        `};

  ${({ isInputWrong, letter }) =>
    letter === " "
      ? css`
          border: none;
          width: 0.5rem;
        `
      : isInputWrong
        ? css`
            border-bottom: 1px solid ${colors.warning};
          `
        : css`
            border-bottom: 1px solid ${colors.white};
          `};

  @media (min-width: 768px) {
    width: ${ props => props.letter === " " && "0.6rem" };
  }
`;

export default TypeMeaning;
