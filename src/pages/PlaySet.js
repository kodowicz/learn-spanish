import React, { Component } from 'react';
import StopLearningOverlay from '../components/overlay/StopLearningOverlay';
import ChooseBetweenTwo from '../components/game/ChooseBetweenTwo';
import ChooseBetweenFour from '../components/game/ChooseBetweenFour';
import SelectFalseOrTrue from '../components/game/SelectFalseOrTrue';
import ArrayBubbles from '../components/game/ArrayBubbles';
import TypeMeaning from '../components/game/TypeMeaning';
import ArrayLetters from '../components/game/ArrayLetters';
import Solution from '../components/game/Solution';

import styled from 'styled-components';


class PlaySet extends Component {
  state = {
    item: {},
    isDesktop: false
  }

  componentDidMount() {
    this.props.changeLocation('learn');
    this.props.changeLastLocation(`/sets/${this.props.setid}`);
    this.props.setCurrentSetId(this.props.setid);

    const isDesktop = window.innerWidth >= 768;

    this.setState((state, props) => {
      const terms = props.terms;
      const randomIndex = Math.floor(Math.random() * terms.length);
      const item = terms[randomIndex];

      return {
        item,
        isDesktop
      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.terms !== prevProps.terms) {
      this.setState((state, props) => {
        const terms = props.terms;

        const randomIndex = Math.floor(Math.random() * terms.length);
        const item = terms[randomIndex];

        return { item }
      })
    }
  }

  randomGame = (ratio) => {
    const { terms, isReady, showGameAnswer } = this.props;
    const { item, isDesktop } = this.state;
    const maxNumber = isDesktop ? 6 : 5;
    let number = Math.floor(Math.random() * maxNumber);

    if (item.term.length > 20 && number === 3) {
      number--
    };

    switch (number) {
      case 5:
        return (
          <TypeMeaning
            item={item}
            showGameAnswer={showGameAnswer}
          />
        );

      case 4:
        return (
          <ArrayLetters
            item={item}
            showGameAnswer={showGameAnswer}
          />
        );

      case 3:
        return (
          <ArrayBubbles
            item={item}
            showGameAnswer={showGameAnswer}
          />
        );

      case 2:
        return (
          <ChooseBetweenFour
            item={item}
            terms={terms}
            showGameAnswer={showGameAnswer}
          />
        );

      case 1:
        return (
          <SelectFalseOrTrue
            item={item}
            terms={terms}
            showGameAnswer={showGameAnswer}
          />
        );

      case 0:
      default:
        return (
          <ChooseBetweenTwo
            item={item}
            terms={terms}
            isDesktop={isDesktop}
            showGameAnswer={showGameAnswer}
          />
        );
    }
  }

  render() {
    const {
      setid,
      answer,
      correctItem,
      isOverlayOpen,
      cancelSesion,
      cleanGameAnswer
    } = this.props;
    const { item } = this.state;

    if (answer) {
      return (
        <Solution
          answer={answer}
          correctItem={correctItem}
          cleanGameAnswer={cleanGameAnswer} />
        )

    } else {
      // choose a game
      return (
        <>
          {
            isOverlayOpen &&
            <StopLearningOverlay setid={setid} cancelSesion={cancelSesion} />
          }
          { !answer &&
            <GameWrapper
              isHidden={isOverlayOpen}>
              {item.term && this.randomGame(item.ratio)}
            </GameWrapper>
          }
        </>
      )
    }
  }
}


const GameWrapper = styled.div`
  display: ${({isHidden}) => isHidden && 'none'};
  cursor: pointer
`;

export default PlaySet
