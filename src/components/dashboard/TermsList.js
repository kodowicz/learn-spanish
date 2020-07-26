import React, { Component } from 'react';
import Term from './Term';

import styled from 'styled-components';
import { colors, fonts } from '../../assets/styles/GlobalStyles';


class TermsList extends Component {
  state = {
    isMoved: false,
    movedElement: null
  }

  componentDidMount () {
    if (this.props.terms.length < 2 && this.props.basicTwoTerms) {
      this.props.basicTwoTerms(2);
    }
  }

  onElementMove = (isMoved, element) => {
    this.setState({
      isMoved: isMoved,
      movedElement: element
    })
  }

  render() {
    const { terms, updateTerm, removeTerm } = this.props;

    return (
      <>
        {terms.map((term, index) => {
          let isVisible = (this.state.movedElement === index && this.state.isMoved) ? false : true;

          return (
          <ListItem key={term.id}>
            <Counter
              isVisible={isVisible}
              isLessThanTen={((index + 1) < 10) ? true : false}
            >
              {index + 1}
            </Counter>
            <SetWrapper>
              <Term
                isVisible={isVisible}
                element={index}
                termDetails={term}
                updateTerm={updateTerm}
                removeTerm={removeTerm}
                onMove={this.onElementMove}
              />
            </SetWrapper>
          </ListItem>
        )
      })}
      </>
    );
  }
}


const ListItem = styled.li`
  margin-bottom: 2rem;
  list-style: none;
  position: relative;
`;

const SetWrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, min-content);
  grid-row-gap: 2px;
  align-content: center;
`;

const Counter = styled.span`
  opacity: ${props => props.isVisible ? 1 : 0 };
  left: ${props => props.isLessThanTen ? '-8vw' : '-10vw' };
  color: ${colors.azure};
  font-weight: ${fonts.bold};
  position: absolute;
  top: 50%;
  font-size: 2.5rem;
  transform: translateY(-50%);
  user-select: none;

  @media (min-width: 768px) {
    left: -50px
  }
`;


export default TermsList
