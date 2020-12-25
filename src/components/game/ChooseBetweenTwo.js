import React, { Component } from "react";
import styled, { css, keyframes } from "styled-components";
import { colors } from "../../assets/styles/GlobalStyles";
import { moveBackards, pulseShadow } from "../../assets/styles/GlobalKeyframes";

class ChooseBetweenTwo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isInSpanish: true,
      term: "",
      options: [],
      startPosition: {
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
  }

  createGame() {
    this.setState((prevState, props) => {
      const { item, terms } = props;
      const styles = this.termRef.current;
      const isInSpanish = Math.random() > 0.5 ? true : false;
      const term = isInSpanish ? item.term : item.definition;
      let options = [item.id];

      const startPosition = {
        left: styles.offsetLeft,
        top: styles.offsetTop
      };

      while (options.length < 2) {
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
        startPosition,
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
  }

  render() {
    const { terms, isDesktop } = this.props;
    const { isInSpanish, term, options, startPosition } = this.state;

    return (
      <GameWrapper>
        <Term ref={this.termRef}>{term}</Term>

        { options.map((termid, index) => {
          const elementid = terms.findIndex(element => element.id === termid);
          return (
            <div key={termid} onClick={() => this.handleChosenAnswer(termid)}>
              <DefinitionOption
                index={index}
                isDesktop={isDesktop}
                startPosition={startPosition}
              >
                { isInSpanish
                  ? terms[elementid].definition
                  : terms[elementid].term
                }
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
      const { startPosition, isDesktop } = props;
      const styles = this.optionRef.current;
      const transformStart = {
        left: isDesktop
          ? startPosition.left - styles.offsetLeft - styles.offsetWidth / 2
          : 0,
        top: isDesktop
          ? 0
          : startPosition.top - styles.offsetTop - styles.offsetHeight / 2
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
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, 1fr);
  grid-row-gap: 4rem;
  padding-top: 20vh;
  place-items: center;
  width: 80vw;
  margin: 0 auto;

  @media (min-width: 768px) {
    place-content: center;
    grid-template-columns: repeat(3, minmax(auto, 30rem));
    grid-template-rows: 1fr;
    grid-column-gap: 4rem;
  }
`;

const Term = styled.span`
  font-size: 3rem;
  margin: 0;
  text-align: center;
  grid-row: 2 / 3;

  @media (min-width: 768px) {
    max-width: 30rem;
    grid-row: 1 / 2;
    grid-column: 2 / 3;
  }
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
    animation: ${pulseShadow} 3s infinite 2s;
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

export default ChooseBetweenTwo;
