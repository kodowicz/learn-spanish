import React, { Component } from "react";
import styled, { css } from "styled-components";

import Speech from "../speech/Speech";
import { Button, colors, fonts } from "../../assets/styles/GlobalStyles";
import { shuffle, throwOut } from "../../assets/styles/GlobalKeyframes";

function debounce(fn, delay) {
  var timer = null;
  return function() {
    var context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  };
}

export class FrontCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: undefined,
      rotateFront: 0,
      rotateBack: -180,
      backAmplitude: 40,
      horizontalAmp: 100,
      verticalAmp: 50,
      isFlipped: true,
      isMoved: false,
      isClicked: false,
      isSpeaking: false,
      toggle: false,
      moveLeft: false,
      moveRight: false,
      cardCenter: {},
      point: { x: 0, y: 0 },
      position: { x: 0, y: 0 },
      transformCard: { x: 0, y: 0, rotate: 0 }
    };

    this.cardRef = React.createRef();

    this.flipCard = this.flipCard.bind(this);
    this.animateCard = this.animateCard.bind(this);
    this.startMoving = this.startMoving.bind(this);
    this.moveCard = debounce(this.moveCard.bind(this), 1);
    this.mouseMove = this.mouseMove.bind(this);
    this.stopMoving = this.stopMoving.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
    this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
  }

  componentDidMount() {
    const cardCenter = this.cardRef.current.getBoundingClientRect();
    const horizontalAmp = this.props.moveEnabled ? 100 : 35;
    this.setState({
      horizontalAmp,
      cardCenter: {
        left: cardCenter.left,
        right: cardCenter.right
      }
    });
  }

  flipCard() {
    if (this.state.isFlipped) {
      if (!this.state.isMoved) {
        this.setState(prevState => {
          const rotateFront = prevState.rotateFront + 180;
          const rotateBack = prevState.rotateBack + 180;

          return {
            rotateFront: rotateFront,
            rotateBack: rotateBack,
            toggle: !prevState.toggle
          };
        });
        this.setState({
          isFlipped: false,
          isClicked: false
        });
      } else {
        this.setState({ isMoved: false });
      }
    }
  }

  animateCard() {
    this.setState({ isFlipped: true });
  }

  startMoving(event) {
    const pagePosition = event.targetTouches ? event.targetTouches[0] : event;

    this.setState({
      isClicked: true,
      point: {
        x: pagePosition.pageX,
        y: pagePosition.pageY
      }
    });
  }

  moveCard(event) {
    event.persist();
    const pagePosition = event.targetTouches ? event.targetTouches[0] : event;

    const position = {
      x: pagePosition.pageX,
      y: pagePosition.pageY
    };

    this.setState({ position: position }, () => {
      const { point, position, horizontalAmp, verticalAmp } = this.state;
      let delta = {
        x:
          position.x - point.x > horizontalAmp
            ? horizontalAmp
            : position.x - point.x < -horizontalAmp
              ? -horizontalAmp
              : position.x - point.x,

        y:
          position.y - point.y > verticalAmp
            ? verticalAmp
            : position.y - point.y < -verticalAmp
              ? -verticalAmp
              : position.y - point.y
      };

      let rotate = delta.x * 0.1;

      this.setState({
        transformCard: {
          x: delta.x,
          y: delta.y,
          rotate: rotate
        },
        isMoved: true
      });
    });
  }

  mouseMove(event) {
    if (this.state.isClicked) {
      this.moveCard(event);
    }
  }

  stopMoving(event) {
    const { isMoved, cardCenter, backAmplitude } = this.state;
    const cardPosition = this.cardRef.current.getBoundingClientRect();

    if (cardCenter.left - cardPosition.left > backAmplitude && isMoved) {
      this.moveLeft();

    } else if (cardPosition.right - cardCenter.right > backAmplitude && isMoved) {
      this.moveRight();

    } else {
      this.setState({
        isClicked: false,
        transformCard: {
          x: 0,
          y: 0,
          rotate: 0
        }
      });
    }
  }

  moveLeft() {
    if (this.props.moveEnabled) {
      this.setState({
        moveLeft: true,
        isSpeaking: true
      });

    } else {
      this.setState({
        transformCard: {
          x: 0,
          y: 0,
          rotate: 0
        }
      });
    }
  }

  moveRight() {
    this.setState({
      moveRight: true,
      isSpeaking: true
    });
  }

  handleAnimationEnd(event) {
    const { item, throwoutCard, shuffleCard } = this.props;

    if (event.animationName === throwOut.name) {
      throwoutCard(item.id);
    } else {
      shuffleCard(item);
    }
  }

  render() {
    const {
      toggle,
      rotateFront,
      rotateBack,
      transformCard,
      moveLeft,
      moveRight,
      isClicked,
      isSpeaking
    } = this.state;
    const { layerIndex, item, sortedBy, settings, voices } = this.props;
    const term = sortedBy ? item.term : item.definition;
    const definition = sortedBy ? item.definition : item.term;

    return (
      <>
        { isSpeaking && (
          <Speech settings={settings} voices={voices} text={item.term} />
        )}

        <FrontWrapper
          ref={this.cardRef}
          flip={toggle}
          layerIndex={layerIndex}
          transformation={transformCard}
          moveLeft={moveLeft}
          moveRight={moveRight}
          isClicked={isClicked}
          onClick={this.flipCard}
          onAnimationEnd={this.handleAnimationEnd}
          onTransitionEnd={this.animateCard}
          onTouchMove={this.moveCard}
          onTouchStart={this.startMoving}
          onTouchEnd={this.stopMoving}
          onMouseMove={this.mouseMove}
          onMouseDown={this.startMoving}
          onMouseUp={this.stopMoving}
        >
          <Front rotate={rotateFront}>
            <Top>
              <Term>{term}</Term>
            </Top>
            <Bottom>
              <Tap>tap to flip</Tap>
            </Bottom>
          </Front>

          <Back rotate={rotateBack}>
            <Top>
              <Term>{definition}</Term>
            </Top>
            <Bottom>
              <Tap>tap to flip</Tap>
            </Bottom>
          </Back>
        </FrontWrapper>
      </>
    );
  }
}

export const BackCard = ({ item, sortedBy }) => {
  const term = sortedBy ? item.term : item.definition;
  const definition = sortedBy ? item.definition : item.term;

  return (
    <BackWrapper>
      <Front>
        <Top>
          <Term>{term}</Term>
        </Top>
        <Bottom>
          <Tap>tap to flip</Tap>
        </Bottom>
      </Front>

      <Back>
        <Top>
          <Term>{definition}</Term>
        </Top>
        <Bottom>
          <Tap>tap to flip</Tap>
        </Bottom>
      </Back>
    </BackWrapper>
  );
};

export const Congratulations = ({ setid, layerIndex, createLearnSet }) => (
  <CongratsWrapper layerIndex={layerIndex}>
    <div>
      <Title>Congratulations!</Title>
      <Text>You've learnt everything!</Text>
      <Button color={colors.navy} onClick={() => createLearnSet(setid)}>
        restart
      </Button>
    </div>
  </CongratsWrapper>
);

const Wrapper = styled.div`
  color: ${colors.navy};
  grid-column: 1 / 1;
  grid-row: 1 / 1;
  width: 22rem;
  height: 30rem;
  background: ${colors.white};
  -webkit-user-select: none;
  transition: transform 0.2s;
`;

const Card = styled.div`
  transform: ${ props => `rotateY(${props.rotate}deg)`};
  background: ${colors.white};
  box-shadow: 0 0 3rem ${colors.translucentNavy};
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
`;

const Front = styled(Card)`
  opacity: 1;
  transition: transform 0.6s, opacity 0s;
`;

const Back = styled(Card)`
  opacity: 0;
  transition: transform 0.6s, opacity 0s 0.15s;
`;

const FrontWrapper = styled(Wrapper)`
  ${({ isClicked }) =>
    isClicked &&
    css`
      cursor: grabbing;
    `};

    perspective: 1000px;
    z-index: 5;

  /*flipping a card */
  ${({ flip }) =>
    flip &&
    css`
      ${Front} {
        transition: transform 0.6s, opacity 0s 0.5s;
        transition: transform 0.6s, opacity 0s 0.15s;
        opacity: 0;
      }

      ${Back} {
        transition: transform 0.6s, opacity 0s 0.15s;
        opacity: 1;
      }
    `};

  /* move card */
  ${({ transformation }) =>
    transformation.rotate !== 0 &&
    css`
      transform: translate(${transformation.x}px, ${transformation.y}px)
        rotate(${transformation.rotate}deg);
    `};

  ${({ moveLeft, transformation }) =>
    moveLeft &&
    css`
      animation: ${shuffle(transformation)} 0.8s ease-out forwards;
    `};

  ${({ moveRight, transformation }) =>
    moveRight &&
    css`
      animation: ${throwOut} 1s ease-out forwards;
    `};
`;

const BackWrapper = styled(Wrapper)`
  box-shadow: 0 0 2remx ${colors.blueShadow};
  background: ${colors.azure};
  transform: translate(-2px, -5px) rotate(5deg);
  z-index: 3;

  &::before,
  &::after {
    background: ${colors.azure};
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
  }

  &::before {
    transform: translate(-2px, 0px) rotate(-7deg);
    z-index: -2;
  }

  &::after {
    transform: translate(-5px, 5px) rotate(-2deg);
    z-index: -1;
  }
`;

const CongratsWrapper = styled(Wrapper)`
  position: relative;
  background: ${colors.white};
  z-index: 0;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 2rem ${colors.blueShadow};
    background: ${colors.white};

    &::before,
    &::after {
      content: "";
      position: absolute;
      background: ${colors.azure};
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      box-shadow: 0 0 0.5rem ${colors.navyBoxShadow};
    }

    &::before {
      z-index: -1;
      transform: translate(7px, -2px) rotate(3deg);
    }

    &::after {
      transform: translate(-3px, 6px) rotate(-2deg);
      z-index: -2;
    }
  }
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 700;
  font-size: 2rem;
  margin: 0;
`;

const Text = styled.p`
  font-size: 1.4rem;
  margin: 0 0 40px;
`;

const Top = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Bottom = styled.div`
  border-top: 2px solid ${colors.azure};
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Term = styled.div`
  font-size: 2rem;
  text-align: center;
`;

const Tap = styled.button`
  font-family: ${fonts.family};
  color: ${colors.navy};
  text-transform: uppercase;
  background: none;
  border: none;
  font-size: 1.2rem;
`;
