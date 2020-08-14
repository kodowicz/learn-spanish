import React, { Component } from 'react';
import styled, { css, keyframes } from 'styled-components';


class TypeMeaning extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      dashes: null,
      definition: "",
      isFinished: false,
      correctAnswer: "",
      isActive: false,
      isWrong: false,
      isCorrect: false,
      counter: 0
    }

    this.dashRef = React.createRef();
  }

  componentDidMount() {
    this.createGame();
    document.addEventListener("keydown", this.handleTyping);
  }

  createGame() {
    this.setState((state, props) => {
      const { item } = props;
      const dashes = this.createDashes(item.term);
      const excludedIndexes = this.getExcludedIndexes(item.term);
      let nextIndex = 0;

      while (excludedIndexes.indexOf(nextIndex) !== -1) {
        nextIndex++;
      }

      return {
        dashes,
        index: nextIndex,
        definition: item.definition,
        correctAnswer: item.term
      }
    })
  };

  createDashes = (term) => {
    let dashes = [];
    const excludedIndexes = this.getExcludedIndexes(term);

    dashes = term.split("").map((letter, index) =>
      excludedIndexes.some(i => i === index) ? letter : ""
    );

    return dashes;
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

  switchSpecialLetters = (letterCode, correctLetter) => {
    const charCodes = [
      { basic: 65, ext: 'á'},
      { basic: 69, ext: 'é'},
      { basic: 73, ext: 'í'},
      { basic: 78, ext: 'ñ'},
      { basic: 79, ext: 'ó'},
      { basic: 85, ext: 'ú'}
    ];
    const index = charCodes.findIndex(code => code.basic === letterCode);

    if (index !== -1) {
      const isCommutable = correctLetter.toLowerCase() === charCodes[index].ext;
      if (isCommutable) {
        return true
      }
    }
  }

  handleTyping = (event) => {
    this.setState(state => {
      const { index, correctAnswer, dashes } = state;
      const correctLetter = correctAnswer[index];
      let userLetter = event.key;
      const isCommutable = this.switchSpecialLetters(event.keyCode, correctLetter);

      if (isCommutable || userLetter === correctLetter) {
        const counter = 0;
        const excludedIndexes = this.getExcludedIndexes(state.correctAnswer);
        let nextIndex = index + 1;
        userLetter = (isCommutable ? correctLetter : userLetter);

        while (excludedIndexes.indexOf(nextIndex) !== -1) {
          nextIndex++;
        }

        dashes[index] = userLetter;

        return {
          counter,
          dashes,
          index: nextIndex,
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

  render() {
    const {
      dashes,
      definition,
      isFinished,
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
          <Dashes>
            {dashes &&
              dashes.map((letter, index) =>
                <Dash
                  letter={letter}
                  ref={currentIndex === index ? this.dashRef : false}
                  isActive={currentIndex === index}
                  index={index}
                  key={index}
                  isBlock={/\n/.test(letter)}>
                  {letter}
                </Dash>
              )
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

const Dashes = styled.div`
  margin: 0 auto;
`;

const Dash = styled.span`
  font-size: 2.8rem;
  height: calc(2.2rem * 1.345);
  display: inline-block;
  transition: transform 0.1s ease-out;

  width: ${({ letter }) => letter === ' ' && '1rem'};

  ${({ isActive }) => isActive && css`
    animation: ${blink} 1s linear infinite;
    transform: translateY(2px);
  `};

  ${({ isBlock }) => isBlock && css`
    display: block;
    height: 1rem;
  `};

  ${({ letter }) => !letter && css`
    height: calc(2.8rem);
    width: 1.5rem;
    margin: 0 0.3rem;
    border-bottom: 1px solid white;
  `}
`

export default TypeMeaning
