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
    const { terms, chooseOption } = this.props;
    const { item, isDesktop } = this.state;
    const maxNumber = isDesktop ? 6 : 5;
    let number = Math.floor(Math.random() * maxNumber);

    switch (number) {
      case 5:
        return (
          <TypeMeaning
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

      case 3:
        return (
          <ArrayBubbles
            item={item}
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

      case 1:
        return (
          <SelectFalseOrTrue
            item={item}
            terms={terms}
            chooseOption={chooseOption}
          />
        );

      case 0:
      default:
        return (
          <ChooseBetweenTwo
            item={item}
            terms={terms}
            isDesktop={isDesktop}
            chooseOption={chooseOption}
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
      clearGameAnswer
    } = this.props;
    const { item } = this.state;

    if (answer) {
      return (
        <Solution
          answer={answer}
          correctItem={correctItem}
          clearGameAnswer={clearGameAnswer} />
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

// const Solution = ({ answer, clearGameAnswer }) => {
//   const handleAnimation = (event) => {
//     clearGameAnswer()
//     // console.log(item);
//   }
//   return (
//     <>
//       {answer &&
//         <SolutionWrapper
//           onAnimationEnd={handleAnimation}
//         >
//           {answer}
//         </SolutionWrapper>
//       }
//     </>
//   );
// }


const GameWrapper = styled.div`
  display: ${({isHidden}) => isHidden && 'none'};
  cursor: pointer
`;

// const throwOut = keyframes`
//   0% {
//     opacity: 0;
//     transform: translate(-50%, 30px);
//   }
//
//   20% {
//     opacity: 0.5
//   }
//
//   40% {
//     transform: translate(-50%, -30px);
//     opacity: 1
//   }
//
//   70% {
//     transform: translate(-50%, -30px);
//     opacity: 1
//   }
//
//   80% {
//     opacity: 0.5
//   }
//
//   100% {
//     transform: translate(-50%, 0px);
//     opacity: 0
//   }
// `;
//
// const SolutionWrapper = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 50%
//   transform: translateX(-50%);
//   animation: ${throwOut} 2s ease-out forwards
// `;


export default PlaySet
