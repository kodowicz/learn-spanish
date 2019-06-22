import React, { Component } from 'react';
import styled, { css, keyframes } from 'styled-components';

const Wrapper = styled.div`
  perspective: 1000px;
  ${'' /* position: absolute; */}
  grid-column: 1 / 1;
  grid-row: 1 / 1;
  ${'' /* top: 0;
  left: 0; */}
  width: 220px;
  height: 300px;
  background: transparent;
  -webkit-user-select: none;
  transition: transform .2s;
  z-index: ${ props => props.layerIndex };
  visibility: hidden;
  opacity: 1;

  ${ ({ layerIndex }) => layerIndex === 0 && css`
    visibility: visible;
  `};

  ${ ({ layerIndex }) => layerIndex === -1 && css`
    visibility: visible;
    transform: translate(-2px, -5px) rotate(5deg);
    box-shadow: 0 0 20px #d8d8d8;
    transition: opacity 0.1s ease-in 0.5s;

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

    ${Front}, ${Back} {
      background: #fbfbfb
    }
  `};


  /*flipping a card */
  ${ ({ flip, layerIndex }) => flip && layerIndex === 0 && css`
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
  ${ ({ transform, layerIndex }) => transform.rotate !== 0 && layerIndex === 0 && css`
    transform: translate(${transform.x}px, ${transform.y}px) rotate(${transform.rotate}deg)
  `};

  ${ ({ moveLeft, transform, layerIndex }) => moveLeft && layerIndex === 0 && css`
    animation: ${shuffle(transform)} 0.8s ease-out forwards
  `};

  ${ ({ moveRight, transform, layerIndex }) => moveRight && layerIndex === 0 && css`
    animation: ${throwOut} 0.5s ease-out forwards
  `};
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
`

const throwOut = keyframes`
  0% {
    opacity: 1
  }

  50% {
    transform: translateX(300px) rotate(15deg);
    opacity: 0.5
  }

  100% {
    transform: translateX(300px) rotate(15deg);
    opacity: 0
  }
`

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


class Card extends Component {
  constructor(props) {
    super(props);

    this.cardRef = React.createRef();

    this.state = {
      id: null,
      isFlipped: true,
      isMoved: false,
      toggle: false,
      cardCenter: 0,
      point: { x: 0, y: 0 },
      position: { x: 0, y: 0 },
      rotateFront: 0,
      rotateBack: -180,
      transformCard: { x: 0, y: 0, rotate: 0 },
      moveLeft: 0,
      moveRight: 0,
      backAmplitude: 60,
      horizontalAmp: 100,
      verticalAmp: 50
    }
  }

  componentDidMount () {
    const cardCenter = this.cardRef.current.offsetLeft + (this.cardRef.current.offsetWidth / 2);
    this.setState({
      cardCenter: cardCenter
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
    const position = event.changedTouches[0].pageX;
    const { isMoved, cardCenter, backAmplitude } = this.state;

    if (position < (cardCenter - backAmplitude) && isMoved) {
      this.moveLeft();
    } else if (position > (cardCenter + backAmplitude) && isMoved) {
      this.moveRight();
    } else {
      this.setState({ transformCard: {
        x: 0,
        y: 0,
        rotate: 0
      }})
    }
  }

  moveLeft = () => {
    const { term, shuffleCard } = this.props;

    this.setState({
      moveLeft: true
    })

    this.cardRef.current.addEventListener('animationend', function() {
      // console.log(term.id);
      shuffleCard(term);
    }, false);
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
      <Wrapper
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
        <Front
          rotate={rotateFront}>
          <Top>
            <Term>{ term.term }</Term>
          </Top>
          <Bottom>
            <Tap>tap to flip</Tap>
          </Bottom>
        </Front>

        <Back
          rotate={rotateBack}
          onTouchMove={this.moveCard}>
          <Top>
            <Term>{ term.definition }</Term>
          </Top>
          <Bottom>
            <Tap>tap to flip</Tap>
          </Bottom>
        </Back>
      </Wrapper>
    )
  }
}

export default Card
