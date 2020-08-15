import React, { Component } from 'react';
import styled from 'styled-components';
import StopLearningOverlay from '../components/overlay/StopLearningOverlay';
import {
  FrontCard,
  BackCard,
  Congratulations
} from '../components/dashboard/Flashcard';


class LearnSet extends Component {
  componentDidMount() {
    this.props.setCurrentSetId(this.props.setid);
    this.props.createLearnSet(this.props.setid)
    this.props.changeLocation('learn');
    this.props.changeLastLocation(`/sets/${this.props.setid}`);
  }

  render() {
    const {
      amount,
      leftTerms,
      setid,
      terms,
      isOverlayOpen,
      cancelSesion,
      shuffleCard,
      throwoutCard,
      createLearnSet
    } = this.props;
    let flashcards;

    if (isOverlayOpen) {
      return <StopLearningOverlay setid={setid} cancelSesion={cancelSesion} />
    } else {

      if (terms.length > 1) {

        flashcards = terms.map(term => {
          if (term.layerIndex === 0) {
            return (
              <FrontCard
                key={term.id}
                layerIndex={term.layerIndex}
                term={term}
                moveEnabled={true}
                shuffleCard={shuffleCard}
                throwoutCard={throwoutCard}
              />
            )

          } else if (term.layerIndex === -1) {
            return (
              <BackCard
                key={term.id}
                layerIndex={term.layerIndex}
                term={term}
              />
            )
          } else {
            return <div key={term.id}></div>
          }
        })

      } else if (terms.length === 1) {
        flashcards = (
          <>
            <FrontCard
              key={terms[0].id}
              layerIndex={terms[0].layerIndex}
              term={terms[0]}
              moveEnabled={false}
              shuffleCard={shuffleCard}
              throwoutCard={throwoutCard}/>
            <Congratulations layerIndex={-1} />
          </>
        )

      } else {
        flashcards = (
          <Congratulations
            layerIndex={0}
            setid={setid}
            createLearnSet={createLearnSet} />
        )
      }

      return (
        <>
          <Counter>{ leftTerms } / {amount}</Counter>
          <Cards>{ flashcards }</Cards>
        </>
      );
    }
  }
}


const Counter = styled.span`
  position: absolute;
  top: 7rem;
  left: 7vw;

  @media (min-width: 768px) {
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Cards = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  width: 100vw;
  height: 100vh;
  position: absolute;
  place-content: center;
  grid-template-rows: 300px;
  grid-template-columns: 220px;
  cursor: grab;

  @media (min-width: 768px) {
    height: 90vh;
  }
`

export default LearnSet
