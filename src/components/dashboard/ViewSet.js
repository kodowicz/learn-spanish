import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import styled from 'styled-components';
import { LinkButton, Main, BlockShadow, Title, colors } from '../../styled/GlobalStyles';



const SetName = styled(Title)`
  text-align: left;
`

const Details = styled.div`
  height: 20px;
  display: flex;
  justify-content: space-around;
  width: 50%;
  color: #7B91C3
`;

const Border = styled.div`
  height: 100%;
  width: 1px;
  background: #7B91C3
`;

const ButtonsWrapper = styled.div`
  margin: 40px 0 60px 0;
  display: flex;
  justify-content: space-evenly;
`;

const ButtonLink = styled(LinkButton)`
  padding: 0.5rem 2rem;
`;

const SubTitle = styled.h2`
  text-transform: uppercase;
  color: ${colors.gray};
  font-size: 14px
`

const List = styled.ul`
  margin: 35px 0 40px 0;
  padding: 0
`;

const ListItem = styled.li`
  margin: 25px 0;
  list-style: none
  position: relative;
`;

const SetWrapper = styled(BlockShadow)`
  padding: 10px 20px;
`;

const Counter = styled.span`
  position: absolute;
  top: 30%;
  left: -8vw;
  color: #E5E5E5;
  font-weight: 700;
  font-size: 25px;
`

const Term = styled.p`
  font-weight: 700;
  font-size: 16px
  margin: 0.3rem 0
`



class ViewSet extends Component {
  render() {
    const { match, set } = this.props;
    if (set) {
      return (
        <Main>
          <Description set={set} />
          <Buttons setId={match.params.id} />
          <TermsList terms={set.terms} />
        </Main>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

const Description = ({ set }) => (
  <>
    <SetName>{ set.name }</SetName>
    <Details>
      <span>{ set.terms.length } terms</span>
      <Border />
      <span>by { set.author } </span>
    </Details>
  </>
);

const Buttons = ({ setId }) => (
  <ButtonsWrapper>
    <ButtonLink to={ `/edit/${setId}` }>edit set</ButtonLink>
    <ButtonLink to={ `/learn/${setId}` }>learn set</ButtonLink>
  </ButtonsWrapper>
);

const TermsList = ({ terms }) => (
  <>
    <SubTitle>terms</SubTitle>
    <List>
      {terms.map(term =>
        <ListItem key={ term.termId }>
          <Counter>{ term.termId + 1 }</Counter>
          <SetWrapper>
            <Term>{ term.english }</Term>
            <Term>{ term.polish }</Term>
          </SetWrapper>
        </ListItem>
      )}
    </List>
  </>
);



const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const sets = state.firestore.data.sets;
  const set = sets ? sets[id] : null;
  return ({
    set: set
  })
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'sets' }
  ])
)(ViewSet);
