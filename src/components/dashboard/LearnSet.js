import React, { Component } from 'react';
import Card from './Card';
import styled from 'styled-components';

const Cards = styled.div`
  position: relative;
  width: 220px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;


class LearnSet extends Component {
  state = {
    terms: []
  }

  componentDidMount() {
    const setId = this.props.match.params.id;

    this.props.changeLocation('learn');
    this.props.changeLastLocation(`/sets/${setId}`);
    this.props.currentSetId(setId);
  }

  render() {
    return (
      <Cards>
        { this.props.terms &&
          <CardList
            terms={this.props.terms}
            shuffled={this.props.shuffled}
            shuffleCard={this.props.shuffleCard}
            throwoutCard={this.props.throwoutCard}
          />
        }
      </Cards>
    );
  }
}

class CardList extends Component {
  state = {
    terms: []
  }

  render() {
    return (
      <div>
        {
          this.props.terms.map(term => {
            if (term.layerIndex >= -1) {
              return (
                <Card
                  layerIndex={term.layerIndex}
                  key={term.id}
                  term={term}
                  shuffleCard={this.props.shuffleCard}
                  throwoutCard={this.props.throwoutCard}
                />
              )
            } else {
              return <></>
            }
          })
        }
      </div>
    );
  }
}

export default LearnSet
