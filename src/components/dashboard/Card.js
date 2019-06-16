import React, { Component } from 'react';
import styled, { css, keyframes } from 'styled-components';

const Wrapper = styled.div`
  perspective: 1000px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  -webkit-user-select: none;
  transition: transform .2s;
  z-index: ${ props => props.layerIndex };
  visibility: hidden;

  ${ props => props.layerIndex === 0 && css`
    visibility: visible;

  `};

  ${ props => props.layerIndex === -1 && css`
    visibility: visible;
    opacity: 0.5;
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

    ${Front}, ${Back} {
      background: #fbfbfb
    }
  `};


  /*flipping a card */
  ${ props => props.flip && css`
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

  ${ ({ moveLeft, layerIndex }) => moveLeft && layerIndex === 0 && css` /* front*/
    animation: ${shuffle} 0.8s ease-out forwards
  `};

  ${ ({ moveRight, layerIndex }) => moveRight && layerIndex === -1 && css`  /* back */
    animation: ${throwOut} 0.5s ease-out forwards
  `};
`;


const shuffle = keyframes`
  0% {
    /*transform: rotate(0deg)*/
  }

  50% {
    transform: translateX(-200px) rotate(-15deg);
  }

  55% {
    z-index: -10
  }

  100% {
    transform: rotate(0deg);
    z-index: -10
  }
`

const throwOut = keyframes`
  0% {
    /*transform: rotate(0deg);
    opacity: 1 */
  }

  30% {
    /*opacity: 1*/
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
    if (this.cardRef.current) {
      this.setState({
        cardCenter: this.cardRef.current.offsetParent.offsetLeft
      })
    }
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
    this.props.shuffleCard(this.props.term.id);
  }

  moveRight = () => {
    this.props.throwoutCard(this.props.term.id);
  }

  render() {
    return (
      <Wrapper
        ref={this.props.layerIndex === 0 ? this.cardRef : null}

        flip={this.state.toggle}
        layerIndex={this.props.layerIndex}
        transform={this.state.transformCard}
        moveLeft={this.state.moveLeft}
        moveRight={this.state.moveRight}

        onClick={this.flipCard}
        onTransitionEnd={this.animateCard}
        onTouchMove={this.moveCard}
        onTouchStart={this.startTouch}
        onTouchEnd={this.stopTouch}
      >
        <Front
          rotate={this.state.rotateFront}>

          <Top>
            <Term>{ this.props.term.term }</Term>
          </Top>

          <Bottom>
            <Tap>tap to flip</Tap>
          </Bottom>

        </Front>

        <Back
          rotate={this.state.rotateBack}
          onTouchMove={this.moveCard}>

          <Top>
            <Term>{ this.props.term.definition }</Term>
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
