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


  /*flipping a card */
  ${props => props.flip && css`
    ${Front} {
      transition: transform .6s, opacity 0s .5s;
      opacity: 0;
    }

    ${Back} {
      transition: transform .6s, opacity 0s .15s;
      opacity: 1
    }
  `}
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
          console.log(layerIndex);
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
  state = {
    isFlipped: true,
    isMoved: true,
    toggle: false,
    rotateFront: 0,
    rotateBack: -180,
    backAmplitude: 120,
    horizontalAmp: 100,
    verticalAmp: 50
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

  moveCard = (event) => {
    // console.log(event.targetTouches);
  }

  render() {
    return (
      <Wrapper
        flip={this.state.toggle}
        layerIndex={this.props.layerIndex}
        onClick={this.flipCard}
        onTransitionEnd={this.animateCard}
        >
        <Front
          rotate={this.state.rotateFront}
          onTouchMove={this.moveCard}>

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
