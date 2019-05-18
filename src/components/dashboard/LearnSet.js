import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { changeLocation, changeLastLocation } from '../../store/actions/locationActions';

import styled, { css } from 'styled-components';
// import { colors } from '../../styled/GlobalStyles';



const Cards = styled.div`
  position: relative;
  width: 220px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

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

  ${'' /* ${ ({ transform }) => transform.rotate == 0 && css`
    transform: translate(0px, 0px) rotate(0deg)
  `}; */}
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

const Top = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Bottom = styled.div`
  height: 2.5rem;
  margin: 0 0.5rem;
  border-top: 0.5px solid #C6C6C6;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Term = styled.div`
  font-size: 1.3rem;
`;

const Tap = styled.button`
  text-transform: uppercase;
  background: none;
  border: none;
  font-size: 12px;
  font-family: 'Open Sans', sans-serif;
`;



class LearnSet extends Component {
  componentDidMount() {
    this.props.changeLocation('learn');
    const setId = this.props.match.params.id;
    this.props.changeLastLocation(`/sets/${setId}`);
  }

  render() {
    const { terms } = this.props;
    let layerIndex = terms == null ? 0 : -terms.length;
    return (
      <Cards>
        { terms && terms.map(term => {
          layerIndex += 1;
          return (
            <Card
              layerIndex={layerIndex}
              key={term.termId}
              term={term}
            />
          )
        })}
      </Cards>
    )
  }
}

class Card extends Component {
  constructor(props) {
    super(props);

    this.cardRef = React.createRef();

    this.state = {
      isFlipped: true,
      isMoved: true,
      toggle: false,
      cardCenter: 0,
      point: { x: 0, y: 0 },
      position: { x: 0, y: 0 },
      rotateFront: 0,
      rotateBack: -180,
      transformCard: { x: 0, y: 0, rotate: 0 },
      backAmplitude: 120,
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
      if (this.state.isMoved) {
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
        this.setState({ isMoved: true });
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
        isMoved: false
      })
    })



  }

  stopTouch = event => {
    const position = event.changedTouches[0].pageX;
    const { cardCenter, backAmplitude } = this.state;

    if (position < (cardCenter - backAmplitude)) {
      this.moveLeft();
    } else if (position > (cardCenter + backAmplitude)) {
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
    console.log("move left");
  }

  moveRight = () => {
    console.log("move right");
  }

  render() {
    return (
      <Wrapper
        ref={this.props.layerIndex === 0 ? this.cardRef : null}

        flip={this.state.toggle}
        layerIndex={this.props.layerIndex}
        transform={this.state.transformCard}

        onClick={this.flipCard}
        onTransitionEnd={this.animateCard}
        onTouchMove={this.moveCard}
        onTouchStart={this.startTouch}
        onTouchEnd={this.stopTouch}
        >
        <Front
          rotate={this.state.rotateFront}>

          <Top>
            <Term>{ this.props.term.english }</Term>
          </Top>

          <Bottom>
            <Tap>tap to flip</Tap>
          </Bottom>

        </Front>

        <Back
          rotate={this.state.rotateBack}
          onTouchMove={this.moveCard}>

          <Top>
            <Term>{ this.props.term.polish }</Term>
          </Top>

          <Bottom>
            <Tap>tap to flip</Tap>
          </Bottom>

        </Back>

      </Wrapper>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  const setId = ownProps.match.params.id;
  const sets = state.firestore.data.sets;
  const terms = sets ? state.firestore.data.sets[setId].terms : null;

  return ({
    location: state.location,
    lastLocation: state.lastLocation,
    terms: terms
  })
}

export default compose(
  connect(
    mapStateToProps,
    { changeLocation, changeLastLocation }
  ),
  firestoreConnect([
    { collection: 'sets' }
  ])
)(LearnSet);
