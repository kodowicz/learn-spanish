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
  state = {
    terms: []
  }

  componentWillMount() {
    this.props.fetchTerms(this.props.fetchedTerms)
  }

  componentDidMount() {
    const setId = this.props.match.params.id;

    this.props.changeLocation('learn');
    this.props.changeLastLocation(`/sets/${setId}`);
    this.props.currentSetId(setId);

    // console.log(this.props.terms);
    // if (this.props.terms) {
    //   this.setState({
    //     terms: this.renderCards(this.props.terms)
    //   })
    // }
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
    const orderedTerms = terms.slice();
    return orderedTerms.sort((prev, next) => prev.time - next.time)
  }


  render() {
    const { shuffleCard, throwoutCard, isCardShuffled } = this.props;
    const { terms } = this.state;

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
              return <></>
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
              <BackCard
                key={0}
                layerIndex={0}
                term={terms[0]}
              />
            </>
            :
            <Congratulations />
        }
      </Cards>
    );
  }
}

export default LearnSet
