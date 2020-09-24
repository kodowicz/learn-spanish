import React, { Component } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { colors } from '../../assets/styles/GlobalStyles';


class ChooseBetweenFour extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChosen: false,
      isInSpanish: true,
      term: "",
      options: [],
      startingPosition: {
        left: 0,
        top: 0
      }
    }

    this.termRef = React.createRef()
  }

  componentDidMount() {
    this.createGame();
  }

  shuffleOptions = (array) => {
    return array.sort(() => Math.random() - 0.5);
  }

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
      }

      while (options.length < 4) {
        const index = Math.floor(Math.random() * terms.length);
        const id = terms[index].id;
        const isTaken = options.some(element => element === id)
        if (!isTaken) {
          options.push(id)
        }
      }

      return {
        isInSpanish,
        term,
        startingPosition,
        options: this.shuffleOptions(options)
      }
    })
  }

  handleChosenAnswer = (answer) => {
    this.setState({
      isChosen: true
    }, () => {
      const { item, showGameAnswer } = this.props;
      const correctAnswer = item.id;

      if (answer === correctAnswer) {
        showGameAnswer(item, 'correct');
      } else {
        showGameAnswer(item, 'wrong');
      }
    })
  }

  render() {
    const { terms } = this.props;
    const { isChosen, isInSpanish, term, options, startingPosition } = this.state;

    return (
      <GameWrapper isChosen={isChosen}>
        <Term
          ref={this.termRef}>
          {term}
        </Term>

        {options.map((termid, index) => {
          const elementid = terms.findIndex(element => element.id === termid);
          return (
            <div
              key={termid}
              onClick={() => this.handleChosenAnswer(termid)}>
              <DefinitionOption
                index={index}
                startingPosition={startingPosition}>
                { isInSpanish ? terms[elementid].definition : terms[elementid].term }
              </DefinitionOption>
            </div>
          )
        })}
      </GameWrapper>
    )
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
    }
    this.optionRef = React.createRef();
  }

  componentDidMount() {
    this.setState((state, props) => {
      const { startingPosition } = props;
      const styles = this.optionRef.current;
      const transformStart = {
        left: startingPosition.left - styles.offsetLeft - (styles.offsetWidth / 2),
        top: startingPosition.top - styles.offsetTop - (styles.offsetHeight / 2)
      };

      return { transformStart }
    })
  }

  render() {
    const { transformStart } = this.state;
    const delay = this.props.index * 0.5;

    return (
      <>
        <Definition
          delay={delay}
          transformStart={transformStart}
          ref={this.optionRef}>
          {this.props.children}
        </Definition>
      </>
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

const move = (transformStart) => keyframes`
  from {
    transform: translate(${transformStart.left}px, ${transformStart.top}px) scale(0.6);
    opacity: 0;
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  50% {
    opacity: 0;
  }

  55% {
    opacity: 0.5;
  }

  80% {
    transform: translate(0, 0) scale(0.7);
    opacity: 0.7;
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
`

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 10px rgba(94, 55, 221, 1);
  }

  50% {
    box-shadow: 0 0 0 50px rgba(94, 55, 221, 0.4);
  }

  55% {
    box-shadow: 0 0 0 50px rgba(94, 55, 221, 0);
  }

  100% {
    box-shadow: 0 0 0 50px rgba(94, 55, 221, 0);
  }
`;

const GameWrapper = styled.div`
  display: ${({ isChosen }) => isChosen ? 'none' : 'grid'};
  height: 70vh;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 4rem 10vw;
  padding: 20vh 10vw 0 10vw;
  place-items: center
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
  color: ${colors.lightGray};

  ${({ transformStart, delay }) => css`
  animation: ${move(transformStart)} 0.5s ${delay * 0.3}s both;
  `};

  font-size: 2rem;
  margin: 0;
  text-align: center;
  position: relative;
  z-index: 2;

  &::before {
    animation: ${pulse} 3s infinite 2s;
    content: '';
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
`

export default ChooseBetweenFour
