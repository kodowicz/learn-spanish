import React, { Component } from "react";
import styled, { css } from "styled-components";
import { colors } from "../../assets/styles/GlobalStyles";
import { popIn, pulse, moveBackards, pulseShadow } from "../../assets/styles/GlobalKeyframes";

class ChooseBetweenFour extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isInSpanish: true,
      term: "",
      options: [],
      startingPosition: {
        left: 0,
        top: 0
      }
    };

    this.termRef = React.createRef();
  }

  componentDidMount() {
    this.createGame();
  }

  shuffleOptions(array) {
    return array.sort(() => Math.random() - 0.5);
  };

  createGame() {
    this.setState((prevState, props) => {
      const { item, terms } = props;
      const styles = this.termRef.current;
      const isInSpanish = Math.random() > 0.5 ? true : false;
      const term = isInSpanish ? item.term : item.definition;
      let options = [item.id];

      const startingPosition = {
        left: styles.offsetLeft,
        top: styles.offsetTop
      };

      while (options.length < 4) {
        const index = Math.floor(Math.random() * terms.length);
        const id = terms[index].id;
        const isTaken = options.some(element => element === id);
        if (!isTaken) {
          options.push(id);
        }
      }

      return {
        isInSpanish,
        term,
        startingPosition,
        options: this.shuffleOptions(options)
      };
    });
  }

  handleChosenAnswer(answer) {
    const { item, showGameAnswer } = this.props;
    const correctAnswer = item.id;

    if (answer === correctAnswer) {
      showGameAnswer(item, "correct");
    } else {
      showGameAnswer(item, "wrong");
    }
  };

  render() {
    const { terms } = this.props;
    const {
      isChosen,
      isInSpanish,
      term,
      options,
      startingPosition
    } = this.state;

    return (
      <GameWrapper>
        <Term ref={this.termRef}>{term}</Term>

        {options.map((termid, index) => {
          const elementid = terms.findIndex(element => element.id === termid);
          return (
            <div key={termid} onClick={() => this.handleChosenAnswer(termid)}>
              <DefinitionOption
                index={index}
                startingPosition={startingPosition}
              >
                {isInSpanish
                  ? terms[elementid].definition
                  : terms[elementid].term}
              </DefinitionOption>
            </div>
          );
        })}
      </GameWrapper>
    );
  }
}

class DefinitionOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transformStart: {
        left: 0,
        top: 0
      }
    };
    this.optionRef = React.createRef();
  }

  componentDidMount() {
    this.setState((state, props) => {
      const { startingPosition } = props;
      const styles = this.optionRef.current;
      const transformStart = {
        left:
          startingPosition.left - styles.offsetLeft - styles.offsetWidth / 2,
        top: startingPosition.top - styles.offsetTop - styles.offsetHeight / 2
      };

      return { transformStart };
    });
  }

  render() {
    const { transformStart } = this.state;
    const { index, children } = this.props;
    const delay = index * 0.5;

    return (
      <>
        <Definition
          delay={delay}
          transformStart={transformStart}
          ref={this.optionRef}
        >
          {children}
        </Definition>
      </>
    );
  }
}

const GameWrapper = styled.div`
  display: grid;
  height: 70vh;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 4rem 10vw;
  padding: 20vh 10vw 0 10vw;
  place-items: center;
`;

const Term = styled.span`
  animation: ${popIn} 0.5s forwards;
  font-size: 3rem;
  margin: 0;
  text-align: center;
  grid-row: 2 / 3;
  grid-column: span 2;
  opacity: 0;
`;

const Definition = styled.p`
  ${({ transformStart, delay }) => css`
    animation: ${moveBackards(transformStart)} 0.5s ${delay * 0.3}s both;
  `};

  color: ${colors.lightGray};
  font-size: 2rem;
  margin: 0;
  text-align: center;
  position: relative;
  z-index: 2;

  &::before {
    animation: ${pulse} 3s infinite 2s;
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 6rem;
    border-radius: 100%;
    width: 2px;
    z-index: -1;
    transform: translate(-50%, -50%);
    height: 2px;
  }

  @media (min-width: 768px) {
    max-width: 30rem;
  }
`;

export default ChooseBetweenFour;
