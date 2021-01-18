import React, { Component } from "react";
import styled, { css, keyframes } from "styled-components";

import Speech from "../speech/Speech";
import {
  settings,
  SpeechVoices
} from "../../components/speech/speechSynthesis";
import { colors } from "../../assets/styles/GlobalStyles";
import {
  moveForwards,
  shake,
  popIn,
  pulse
} from "../../assets/styles/GlobalKeyframes";

class PairWords extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstWord: "",
      secondWord: "",
      pairedWord: "",
      counter: 0,
      pickedIndex: null,
      isFinished: false,
      boundary: {},
      words: [],
      positions: [
        [
          { left: 0.67, top: 0.2 },
          { left: 0.45, top: 0.45 },
          { left: 0.67, top: 0.7 },
          { left: 0.1, top: 0.65 },
          { left: 0.3, top: 0 },
          { left: 0.014, top: 0.33 }
        ],
        [
          { left: 0.47, top: 0.75 },
          { left: 0.6, top: 0.17 },
          { left: 0.45, top: 0.42 },
          { left: 0.15, top: 0.65 },
          { left: 0.0, top: 0.37 },
          { left: 0.3, top: 0 }
        ]
      ]
    };

    this.boundaryRef = React.createRef();

    this.handlePairing = this.handlePairing.bind(this);
    this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
  }

  componentDidMount() {
    this.createGame();
  }

  componentDidUpdate(prevProps, prevState) {
    const { isFinished, counter, firstWord, secondWord } = this.state;
    const { isSkipped, isSpeaking, terms, showGameAnswer } = this.props;
    const item = terms.find(el => el.id === firstWord || el.id === secondWord);

    if (prevState.counter !== counter && counter === 3) {
      window.setTimeout(() => showGameAnswer(item, "wrong", isSkipped), 200);
    }

    if (isFinished && !isSpeaking) {
      const emptyItem = {
        term: "",
        definition: ""
      };
      showGameAnswer(emptyItem, "correct", isSkipped);
    }
  }

  createGame() {
    this.setState((state, props) => {
      let words = this.createWords(props.terms);
      const boundary = this.boundaryRef.current.getBoundingClientRect();

      return {
        words,
        boundary
      };
    });
  }

  createWords(terms) {
    let words = [];
    let index = 0;

    while (words.length < 6) {
      const randomIndex = Math.floor(Math.random() * terms.length);
      const isTaken = words.some(
        element => element.id === terms[randomIndex].id
      );

      if (!isTaken) {
        const item = terms[randomIndex];

        const termWord = {
          index,
          id: item.id,
          text: item.term,
          isPicked: false,
          isPaired: false,
          isWrong: false
        };
        const defWord = {
          index: index + 1,
          id: item.id,
          text: item.definition,
          isPicked: false,
          isPaired: false,
          isWrong: false
        };

        index = index + 2;
        words.push(termWord, defWord);
      }
    }

    return this.shuffleOptions(words);
  }

  shuffleOptions(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  handlePairing(event) {
    const { id: index } = event.target;
    this.setState((state, props) => {
      const { counter, pickedIndex, firstWord, words: prevWords } = state;
      const { terms } = props;
      // first pick
      if (!firstWord) {
        let pickedIndex;
        let pickedFirstWord;

        const words = [...prevWords].map(word => {
          if (word.index == index) {
            pickedFirstWord = word.id;
            pickedIndex = word.index;

            return {
              ...word,
              isPicked: true
            };
          } else {
            return word;
          }
        });

        return {
          pickedIndex,
          words,
          counter: 0,
          firstWord: pickedFirstWord
        };

      } else if (firstWord) {
        const pickedWord = prevWords.find(word => word.index == index);
        const isCorrect = pickedWord.id === firstWord;

        // unclick the word
        if (pickedWord.index === pickedIndex) {
          const words = [...prevWords].map(word => {
            if (word.index === pickedWord.index) {
              return {
                ...word,
                isPicked: false
              };
            } else {
              return word;
            }
          });

          return {
            words,
            firstWord: ""
          };

        // compare words
        } else if (isCorrect) {
          const pairedWord = terms.find(term => term.id === firstWord).term;
          const words = [...prevWords].map(word => {
            if (word.id === firstWord) {
              return {
                ...word,
                isPicked: true,
                isPaired: true
              };
            } else {
              return word;
            }
          });

          return {
            words,
            pairedWord,
            firstWord: "",
            counter: 0,
            secondWord: firstWord
          };

        } else {
          const words = [...prevWords].map(word => {
            if (word.index === pickedWord.index) {
              return {
                ...word,
                isWrong: true
              };
            } else {
              return word;
            }
          });

          return {
            words,
            counter: counter + 1
          };
        }
      }
    });
  }

  handleAnimationEnd(event) {
    this.setState((state, props) => {
      const { firstWord, secondWord, words: prevWords } = state;
      const isFinished = prevWords.every(word => word.isPaired);
      const item = props.terms.find(el =>
        el.id === firstWord || el.id === secondWord
      );

      const words = [...prevWords].map(word => ({
        ...word,
        isWrong: false
      }));

      return {
        words,
        isFinished,
        secondWord: "",
        pairedWord: ""
      };
    });
  }

  render() {
    const { isFinished, pairedWord, words, positions, boundary } = this.state;
    const { settings, voices, setSpeechStatus } = this.props;
    const randomIndex = Math.floor(Math.random() * positions.length);

    return (
      <GameWrapper>
        { pairedWord && (
          <Speech
            settings={settings}
            voices={voices}
            text={pairedWord}
            setSpeechStatus={setSpeechStatus}
          />
        )}
        <WordsWrapper ref={this.boundaryRef}>
          { words.map((word, index) => (
            <>
              <WordComponent
                key={index}
                id={word.index}
                isPicked={word.isPicked}
                isWrong={word.isWrong}
                isPaired={word.isPaired}
                boundary={boundary}
                boundaryRef={this.boundaryRef.current}
                position={positions[randomIndex][index]}
                handlePairing={this.handlePairing}
                handleAnimationEnd={this.handleAnimationEnd}
              >
                {word.text}
              </WordComponent>
            </>
          ))}
        </WordsWrapper>
      </GameWrapper>
    );
  }
}

class WordComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startOffsetTop: 0,
      startOffsetLeft: 0,
      offsetTop: 0,
      offsetLeft: 0
    };

    this.wordRef = React.createRef();
  }

  componentDidMount() {
    const { boundary, position } = this.props;
    const word = this.wordRef.current;

    const startOffset = {
      left: Math.floor(boundary.width / 2 - word.offsetWidth / 2),
      top: Math.floor(boundary.height / 2 - word.offsetHeight / 2)
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
    return (
      <WordWrapper
        ref={this.wordRef}
        startOffsetLeft={this.state.startOffsetLeft}
        startOffsetTop={this.state.startOffsetTop}
        offsetLeft={this.state.offsetLeft}
        offsetTop={this.state.offsetTop}
      >
        <Word
          id={this.props.id}
          isPicked={this.props.isPicked}
          isWrong={this.props.isWrong}
          isPaired={this.props.isPaired}
          onClick={this.props.handlePairing}
          onAnimationEnd={this.props.handleAnimationEnd}
        >
          {this.props.children}
        </Word>
      </WordWrapper>
    );
  }
}

const GameWrapper = styled.div`
  padding-top: 20vh;
  width: 90vw;
  margin: 0 auto;
`;

const WordsWrapper = styled.div`
  height: 70vh;
  margin: 0 auto;
  position: relative;

  @media (min-width: 768px) {
    width: 70rem;
  }
`;

const WordWrapper = styled.div`
  position: absolute;
  ${({ startOffsetLeft, startOffsetTop, offsetLeft, offsetTop, index }) =>
    css`
      animation-name: ${moveForwards(
        startOffsetLeft,
        startOffsetTop,
        offsetLeft,
        offsetTop
      )};
      animation-duration: 0.4s;
      animation-delay: ${0.05 + index * 0.05}s;
      animation-fill-mode: both;
    `};
`;

const Word = styled.div`
  ${({ isPicked }) =>
    isPicked
      ? css`
          animation: ${pulse} 0.3s both;
          background: ${colors.white};
          color: ${colors.blue};
        `
      : css`
          background: ${colors.blue};
        `};

  ${({ isWrong }) =>
    isWrong &&
    css`
      animation: ${shake} 0.5s both;
    `};

  ${({ isPaired }) =>
    isPaired &&
    css`
      animation: ${popIn} 0.2s both reverse;
    `};

  border: 1px solid ${colors.white};
  border-radius: 4rem;
  padding: 1rem 2rem;
  max-width: 15rem;
  text-align: center;
  width: 11rem;
  height: 11rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0.5rem;
  border-radius: 10rem;
  word-break: break-word;

  @media (min-width: 768px) {
    border: 2px solid ${colors.white};
    width: 15rem;
    height: 15rem;
  }
`;

export default PairWords;
