import React, { Component } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { colors } from '../../assets/styles/GlobalStyles';


class ChooseBetweenTwo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChosen: false,
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

  createGame() {
    this.setState((prevState, props) => {
      const { item, terms } = props;
      const term = item.term;
      let options = [item.id];
      const styles = this.termRef.current;
      const startingPosition = {
        left: styles.offsetLeft,
        top: styles.offsetTop
      }

      while (options.length < 2) {
        const index = Math.floor(Math.random() * terms.length);
        const id = terms[index].id;
        const isTaken = options.some(element => element === id)
        if (!isTaken) {
          options.push(id)
        }
      }

      return {
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
    const { terms, isDesktop } = this.props;
    const { isChosen, term, options, startingPosition } = this.state;

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
                isDesktop={isDesktop}
                startingPosition={startingPosition}>
                {terms[elementid].definition}
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
      const { startingPosition, isDesktop } = props;
      const styles = this.optionRef.current;
      const transformStart = {
        left: isDesktop ? (startingPosition.left - styles.offsetLeft - (styles.offsetWidth / 2)) : 0,
        top: isDesktop ? 0 : (startingPosition.top - styles.offsetTop - (styles.offsetHeight / 2))
      };

      return { transformStart }
    })
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
          ref={this.optionRef}>
          {children}
        </Definition>
      </>
    );
  }
}

const move = (transformStart) => keyframes`
  from {
    transform: translate(${transformStart.left}px, ${transformStart.top}px) scale(0.6);
    opacity: 0;
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  40% {
    opacity: 0;
  }

  50% {
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
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, 1fr);
  grid-row-gap: 4rem;
  padding-top: 20vh;
  place-items: center;
  width: 80vw;
  margin: 0 auto;

  @media (min-width: 768px) {
    place-content: center;
    grid-template-columns: minmax(auto, 30rem) minmax(auto, 30rem) minmax(auto, 30rem);
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
    grid-column: 2 / 3
  }
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

export default ChooseBetweenTwo
