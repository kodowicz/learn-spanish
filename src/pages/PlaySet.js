import React, { Component } from 'react';
import StopLearningOverlay from '../components/overlay/StopLearningOverlay';
import ChooseBetweenTwo from '../components/game/ChooseBetweenTwo';
import ChooseBetweenFour from '../components/game/ChooseBetweenFour';
import SelectFalseOrTrue from '../components/game/SelectFalseOrTrue';
import ArrayBubbles from '../components/game/ArrayBubbles';
import TypeMeaning from '../components/game/TypeMeaning';
import ArrayLetters from '../components/game/ArrayLetters';

import styled, { keyframes } from 'styled-components';


class PlaySet extends Component {
  state = {
    item: {}
  }

  componentDidMount() {
    this.props.changeLocation('learn');
    this.props.changeLastLocation(`/sets/${this.props.setid}`);
    this.props.setCurrentSetId(this.props.setid);
  }

  componentWillMount() {
    this.setState((state, props) => {

      const randomIndex = Math.round(Math.random() * 10);
      const item = props.terms[randomIndex];

      return {
        item
      }
    })
    // this.props.createPlaySet(this.props.setid)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.terms !== prevProps.terms) {
      this.setState((state, props) => {
        const randomIndex = Math.round(Math.random() * 10);
        const item = props.terms[randomIndex];

        return {
          item
        }
      })
    }
  }

  render() {
    const {
      setid,
      terms,
      answer,
      isOverlayOpen,
      cancelSesion,
      clearGameAnswer,
      chooseOption
    } = this.props;
    const { item } = this.state;

    if (isOverlayOpen) {
      return <StopLearningOverlay setid={setid} cancelSesion={cancelSesion} />

    } else {
      if (answer) {
        return <Solution answer={answer} clearGameAnswer={clearGameAnswer} />

      } else {
        // choose a game
        // create random game related to ratio
        switch (item.ratio) {
          case 0:
            return (
              <SelectFalseOrTrue
                item={item}
                terms={terms}
                chooseOption={chooseOption}
              />
            );

          case 1:
            return (
              <ChooseBetweenTwo
                item={item}
                terms={terms}
                chooseOption={chooseOption}
              />
            );

          case 2:
            return (
              <ChooseBetweenFour
                item={item}
                terms={terms}
                chooseOption={chooseOption}
              />
            );

          case 3:
            return (
              <ArrayBubbles
                item={item}
                chooseOption={chooseOption}
              />
            );

          case 4:
            return (
              <ArrayLetters
                item={item}
                chooseOption={chooseOption}
              />
            );

          case 5:
          default:
            return (
              <TypeMeaning
                item={item}
                chooseOption={chooseOption}
              />
            );
        }
      }
    }
  }
}

const Solution = ({ answer, clearGameAnswer }) => {
  const handleAnimation = (event) => {
    clearGameAnswer()
  }

  return (
    <>
      {answer &&
        <SolutionWrapper
          onAnimationEnd={handleAnimation}
        >
          {answer}
        </SolutionWrapper>
      }
    </>
  );
}



const throwOut = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, 30px);
  }

  20% {
    opacity: 0.5
  }

  40% {
    transform: translate(-50%, -30px);
    opacity: 1
  }

  70% {
    transform: translate(-50%, -30px);
    opacity: 1
  }

  80% {
    opacity: 0.5
  }

  100% {
    transform: translate(-50%, 0px);
    opacity: 0
  }
`;

const SolutionWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%
  transform: translateX(-50%);
  animation: ${throwOut} 2s ease-out forwards
`;


export default PlaySet
