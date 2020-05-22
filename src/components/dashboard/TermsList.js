import React, { Component } from 'react';
import Term from './Term';

import styled from 'styled-components';
import { colors, fonts } from '../../assets/styles/GlobalStyles';


class TermsList extends Component {
  componentDidMount () {
    if (this.props.terms.length < 2 && this.props.basicTwoTerms) {
      this.props.basicTwoTerms(2);
    }
  }

  render() {
    const { terms, updateTerm, removeTerm } = this.props;

    return (
      <>
        {terms.map((term, index) => (
          <ListItem key={term.id}>
            <Counter
              isLessThanTen={((index + 1) < 10) ? true : false}
            >
              {index + 1}
            </Counter>
            <SetWrapper>
              <Term
                termDetails={term}
                updateTerm={updateTerm}
                removeTerm={removeTerm}
              />
            </SetWrapper>
          </ListItem>
        ))}
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

  @media (min-width: 768px) {
    padding: 20px 0;
    grid-template-columns: 1fr 1px 1fr;
    grid-template-rows: 1fr
  }
`;

const Counter = styled.span`
  left: ${props => props.isLessThanTen ? '-8vw' : '-10vw' };
  color: ${colors.azure};
  font-weight: ${fonts.bold};
  position: absolute;
  top: 50%;
  font-size: 2.5rem;
  transform: translateY(-50%);

  @media (min-width: 768px) {
    left: -50px
  }
`;


export default TermsList
