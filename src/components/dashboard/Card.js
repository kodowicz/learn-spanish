import React, { Component } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Button } from '../../assets/styles/GlobalStyles';


const Wrapper = styled.div`
  grid-column: 1 / 1;
  grid-row: 1 / 1;
  width: 220px;
  height: 300px;
  background: transparent;
  -webkit-user-select: none;
  transition: transform .2s;
`;

const Front = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: white;
  box-shadow: 0 0 10px #d8d8d8;
  transition: transform .6s, opacity 0s;
  transform: ${props => `rotateY(${props.rotate}deg)`};
  opacity: 1
`;

const Back = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: white;
  box-shadow: 0 0 10px #d8d8d8;
  transition: transform .6s, opacity 0s .2s;
  transform: ${props => `rotateY(${props.rotate}deg)`};
  opacity: 0
`;

const FrontWrapper = styled(Wrapper)`
  perspective: 1000px;
  z-index: 1;

  /*flipping a card */
  ${ ({ flip }) => flip && css`
    ${Front} {
      transition: transform .6s, opacity 0s .5s;
      opacity: 0;
    }

    ${Back} {
      transition: transform .6s, opacity 0s .15s;
      opacity: 1
    }
  `};

  /* move card */
  ${ ({ transform }) => transform.rotate !== 0 && css`
    transform: translate(${transform.x}px, ${transform.y}px) rotate(${transform.rotate}deg)
  `};

  ${ ({ moveLeft, transform }) => moveLeft && css`
    animation: ${shuffle(transform)} 0.8s ease-out forwards
  `};

  ${ ({ moveRight, transform }) => moveRight && css`
    animation: ${throwOut} 1s ease-out forwards
  `};
`;

const BackWrapper = styled(Wrapper)`
  z-index: -1
  transform: translate(-2px, -5px) rotate(5deg);
  box-shadow: 0 0 20px #d8d8d8;

  &::before, &::after {
    content: "";
    position: absolute;
    background: #f7f7f7;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    box-shadow: 0 0 5px #d8d8d8;
  }

  &::before {
    transform: translate(-2px, 0px) rotate(-7deg)
  }

  &::after {
    transform: translate(-5px, 5px) rotate(-2deg);
    z-index: -1
  }
`;

const CongratsWrapper = styled(Wrapper)`
  box-shadow: 0 0 20px #d8d8d8;
  position: relative;
  background: white;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    height: 100%;

    &::before, &::after {
      content: "";
      position: absolute;
      background: #f7f7f7;
      background: white;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      box-shadow: 0 0 5px #d8d8d8;
    }

    &::before {
      z-index: -3;
      transform: translate(7px, -7px) rotate(3deg)
    }

    &::after {
      transform: translate(-5px, 5px) rotate(-2deg);
      z-index: -2
    }
  }
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 700;
  font-size: 2rem;
  margin: 0
`;

const Text = styled.p`
  font-size: 1.4rem;
  margin: 0 0 40px
`;

const Restart = styled(Button)`
  font-size: 1.4rem;
  padding: 1rem 4rem;
`;

const shuffle = (transform) => keyframes`
  0% {
   z-index: 1
  }

  50% {
    transform: translate(-200px, ${transform.y}px) rotate(-15deg);
  }

  70% {
    z-index: -1
  }

  100% {
    transform: rotate(0deg);
    z-index: -1
  }
`;

const throwOut = keyframes`
  0% {
    opacity: 1
  }

  30% {
    opacity: 0.5
  }

  50% {
    transform: translateX(300px) rotate(15deg);
    opacity: 0.5
  }

  100% {
    transform: translateX(300px) rotate(15deg);
    opacity: 0
  }
`;

const Top = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Bottom = styled.div`
  height: 3.5rem;
  margin: 0 0.7rem;
  border-top: 0.5px solid #C6C6C6;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Term = styled.div`
  font-size: 1.8rem;
`;

const Tap = styled.button`
  text-transform: uppercase;
  background: none;
  border: none;
  font-size: 12px;
  font-family: 'Open Sans', sans-serif;
`;


export class FrontCard extends Component {
  constructor(props) {
    super(props);

    this.cardRef = React.createRef();

    this.state = {
      id: null,
      isFlipped: true,
      isMoved: false,
      toggle: false,
      cardCenter: {},
      point: { x: 0, y: 0 },
      position: { x: 0, y: 0 },
      rotateFront: 0,
      rotateBack: -180,
      transformCard: { x: 0, y: 0, rotate: 0 },
      moveLeft: false,
      moveRight: false,
      backAmplitude: 20,
      horizontalAmp: 100,
      verticalAmp: 50
    }
  }

  componentDidMount () {
    const cardCenter = this.cardRef.current.getBoundingClientRect();
    const horizontalAmp = this.props.moveEnabled ? 100 : 35;
    this.setState({
      horizontalAmp,
      cardCenter: {
        left: cardCenter.left,
        right: cardCenter.right
      }
    })
  }

  flipCard = () => {
    if (this.state.isFlipped) {
      if (!this.state.isMoved) {
        this.setState(prevState => {
          const rotateFront = prevState.rotateFront + 180;
          const rotateBack = prevState.rotateBack + 180;

          return ({
            rotateFront: rotateFront,
            rotateBack: rotateBack,
            toggle: !prevState.toggle
          })
        })
        this.setState({ isFlipped: false });
      } else {
        this.setState({ isMoved: false });
      }
    }
  }

  animateCard = () => {
    this.setState({ isFlipped: true });
  }

  startTouch = event => {
    this.setState({
      point: {
        x: event.targetTouches[0].pageX,
        y: event.targetTouches[0].pageY
      }
    })
  }

  moveCard = event => {
    const position = {
      x: event.targetTouches[0].pageX,
      y: event.targetTouches[0].pageY
    };

    this.setState({ position: position }, () => {
      const { point, position, horizontalAmp, verticalAmp } = this.state;
      let delta = {
        x: ((position.x - point.x) > horizontalAmp) ?
        horizontalAmp :
        ((position.x - point.x) < -horizontalAmp) ?
        -horizontalAmp :
        position.x - point.x,

        y: ((position.y - point.y) > verticalAmp) ?
        verticalAmp :
        ((position.y - point.y) < -verticalAmp) ?
        -verticalAmp :
        position.y - point.y
      };

      let rotate = delta.x * 0.1;

      this.setState({
        transformCard: {
          x: delta.x,
          y: delta.y,
          rotate: rotate
        },
        isMoved: true
      })
    })
  }

  stopTouch = event => {
    const { isMoved, cardCenter, backAmplitude } = this.state;
    const cardPosition = this.cardRef.current.getBoundingClientRect();

    if (cardCenter.left - cardPosition.left > backAmplitude && isMoved) {
      this.moveLeft();

    } else if (cardPosition.right - cardCenter.right > backAmplitude && isMoved) {
      this.moveRight();

    } else {
      this.setState({
        transformCard: {
          x: 0,
          y: 0,
          rotate: 0
        }
      })
    }
  }

  moveLeft = () => {
    const { term, shuffleCard, moveEnabled } = this.props;

    if (moveEnabled) {
      this.setState({
        moveLeft: true
      })

      this.cardRef.current.addEventListener('animationend', function() {
        shuffleCard(term);
      }, false);

    } else {
      this.setState({
        transformCard: {
          x: 0,
          y: 0,
          rotate: 0
        }
      })
    }
  }

  moveRight = () => {
    const { term, throwoutCard } = this.props;

    this.setState({
      moveRight: true
    })

    this.cardRef.current.addEventListener('animationend', function() {
      throwoutCard(term.id);
    }, false);
  }

  render() {
    const { toggle, rotateFront, rotateBack, transformCard, moveLeft, moveRight } = this.state;
    const { layerIndex, term } = this.props;

    return (
      <FrontWrapper
        ref={this.cardRef}
        flip={toggle}
        layerIndex={layerIndex}
        transform={transformCard}
        moveLeft={moveLeft}
        moveRight={moveRight}
        onClick={this.flipCard}
        onTransitionEnd={this.animateCard}
        onTouchMove={this.moveCard}
        onTouchStart={this.startTouch}
        onTouchEnd={this.stopTouch}
      >
        <Front rotate={rotateFront}>
          <Top>
            <Term>{ term.term }</Term>
          </Top>
          <Bottom>
            <Tap>tap to flip</Tap>
          </Bottom>
        </Front>

        <Back rotate={rotateBack} onTouchMove={this.moveCard}>
          <Top>
            <Term>{ term.definition }</Term>
          </Top>
          <Bottom>
            <Tap>tap to flip</Tap>
          </Bottom>
        </Back>
      </FrontWrapper>
    )
  }
}


export const BackCard = ({ term }) => (
  <BackWrapper>
    <Front>
      <Top>
        <Term>{ term.term }</Term>
      </Top>
      <Bottom>
        <Tap>tap to flip</Tap>
      </Bottom>
    </Front>

    <Back>
      <Top>
        <Term>{ term.definition }</Term>
      </Top>
      <Bottom>
        <Tap>tap to flip</Tap>
      </Bottom>
    </Back>
  </BackWrapper>
)


export const Congratulations = ({ setId, layerIndex, createLearnSet }) => (
  <CongratsWrapper layerIndex={layerIndex}>
    <div>
      <Title>Congratulations!</Title>
      <Text>You've learnt everything!</Text>
      <Restart onClick={() => createLearnSet(setId)}>restart</Restart>
    </div>
  </CongratsWrapper>
)
