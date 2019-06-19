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

    if (this.props.terms) {
      this.setState({
        terms: this.renderCards(this.props.terms)
      })
    }
  }

  componentWillReceiveProps (newProps) {
    if (this.props.terms !== newProps.terms) {
      this.setState({
        terms: this.renderCards(newProps.terms)
      })
    }
  }

  renderCards = (terms) => {
    let orderedTerms = this.orderTermsByTime(terms);
    let layerIndex = 1;

    let visibleCards = orderedTerms.map(term => {
      layerIndex -= 1;

      return Object.assign({}, term, { layerIndex: layerIndex })
    });

    return visibleCards
  }

  orderTermsByTime (terms) {
    return terms.sort((prev, next) => prev.time - next.time)
  }


  render() {
    const { shuffleCard, throwoutCard, isCardShuffled } = this.props;
    const { terms } = this.state;
    return (
      <Cards>
        { terms &&
          terms.map(term => {
            if (term.layerIndex >= -1) {
              return (
                <Card
                  layerIndex={term.layerIndex}
                  key={term.id}
                  term={term}
                  // isCardShuffled={isCardShuffled}
                  shuffleCard={shuffleCard}
                  throwoutCard={throwoutCard}
                  />
              )
            } else {
              return <></>
            }
          })
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
