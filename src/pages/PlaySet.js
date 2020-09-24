import React, { Component } from 'react';
import StopLearningOverlay from '../components/overlay/StopLearningOverlay';
import ChooseBetweenTwo from '../components/game/ChooseBetweenTwo';
import ChooseBetweenFour from '../components/game/ChooseBetweenFour';
import SelectFalseOrTrue from '../components/game/SelectFalseOrTrue';
import ArrayBubbles from '../components/game/ArrayBubbles';
import TypeMeaning from '../components/game/TypeMeaning';
import ArrayLetters from '../components/game/ArrayLetters';
import Solution from '../components/game/Solution';
import RatioDots from '../components/RatioDots';

import styled from 'styled-components';


class PlaySet extends Component {
  componentDidMount() {
    this.props.changeLocation('learn');
    this.props.setCurrentSetId(this.props.setid);
  }

  render() {
    const {
      terms,
      setid,
      answer,
      correctItem,
      isOverlayOpen,
      cancelSesion,
      cleanGameAnswer,
      showGameAnswer
    } = this.props;

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
            <Game
              isHidden={isOverlayOpen}
              terms={terms}
              answer={answer}
              correctItem={correctItem}
              showGameAnswer={showGameAnswer} />
            }
        </>
      )
    }
  }
}

class Game extends Component {
  state = {
    item: {},
    game: 0,
    isDesktop: false
  }

  componentDidMount() {
    const isDesktop = window.innerWidth >= 768;

    this.setState((state, props) => {
      const filtredTerms = props.terms.filter(item => !item.isMastered);
      const randomIndex = Math.floor(Math.random() * filtredTerms.length);
      let item = filtredTerms[randomIndex];
      let game =  this.pickGame(item.ratio, item.term.length > 20);

      return {
        item,
        game,
        isDesktop
      }
    })
  }

  pickGame(ratio, isTooLong) {
    let game;

    if (ratio <= 2) {
      game = Math.floor(Math.random() * 3);

    } else if (ratio === 5) {
      game = 5;

    } else {
      game = Math.floor(Math.random() * 2) + 3;

      if (isTooLong && game === 4) {
        game--
      };
    }

    return game
  }

  randomGame(ratio) {
    const { terms, showGameAnswer } = this.props;
    const { item, game, isDesktop } = this.state;

    switch (game) {
      case 5:
        return (
          <TypeMeaning
            item={item}
            showGameAnswer={showGameAnswer} />
        );

      case 4:
        return (
          <ArrayLetters
            item={item}
            showGameAnswer={showGameAnswer} />
        );

      case 3:
        return (
          <ArrayBubbles
            item={item}
            showGameAnswer={showGameAnswer} />
        );

      case 2:
        return (
          <ChooseBetweenFour
            item={item}
            terms={terms}
            showGameAnswer={showGameAnswer} />
        );

      case 1:
        return (
          <SelectFalseOrTrue
            item={item}
            terms={terms}
            showGameAnswer={showGameAnswer} />
        );

      case 0:
      default:
        return (
          <ChooseBetweenTwo
            item={item}
            terms={terms}
            isDesktop={isDesktop}
            showGameAnswer={showGameAnswer} />
        );
    }
  }

  render() {
    const { item } = this.state;

    return (
      <GameWrapper isHidden={this.props.isHidden}>
        <RatioWrapper>
          <RatioDots ratio={item.ratio} />
        </RatioWrapper>
        {this.randomGame(item.ratio)}

      </GameWrapper>
    );
  }
}


const GameWrapper = styled.div`
  visibility: ${({ isHidden }) => isHidden && 'hidden'};
  cursor: pointer
`;

const RatioWrapper = styled.div`
  position: relative;
  top: 10rem;
  left: 10vw;
  width: 5rem;

  @media (min-width: 768px) {
    left: 3rem;
    width: 6rem
  }
`;

export default PlaySet
