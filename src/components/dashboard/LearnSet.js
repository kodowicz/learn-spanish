import React, { Component } from 'react';
import { FrontCard, BackCard, Congratulations } from './Card';
import styled from 'styled-components';

const Cards = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  width: 100vw;
  height: 100vh;
  position: absolute;
  place-items: center;
`


class LearnSet extends Component {
  componentDidMount() {
    this.props.changeLocation('learn');
    this.props.changeLastLocation(`/sets/${this.props.setID}`);
    this.props.currentSetId(this.props.setID);
  }

  render() {
    const { setID, terms, shuffleCard, throwoutCard, isCardShuffled, createLearnSet } = this.props;

    return (
      <Cards>
        { (terms.length > 1) ?
          terms.map(term => {
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
          :
          (terms.length === 1) ?
            <>
              <FrontCard
                key={terms[0].id}
                layerIndex={terms[0].layerIndex}
                term={terms[0]}
                moveEnabled={false}
                shuffleCard={shuffleCard}
                throwoutCard={throwoutCard}
              />
              <Congratulations layerIndex={-1} />
            </>
            :
            <Congratulations layerIndex={0} createLearnSet={createLearnSet} setID={setID} />
        }
      </Cards>
    );
  }
}

export default LearnSet
