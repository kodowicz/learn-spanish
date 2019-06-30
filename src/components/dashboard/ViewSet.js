import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import styled from 'styled-components';
import { LinkButton, Main, BlockShadow, Title, colors } from '../../assets/styles/GlobalStyles';



const SetName = styled(Title)`
  text-align: left;
`

const Details = styled.div`
  height: 20px;
  display: grid;
  grid-template: 1fr / repeat(3, max-content);
  grid-column-gap: 10px;
  color: #7B91C3
`;

const Border = styled.div`
  height: 100%;
  width: 1.5px;
  background: #7B91C3
`;

const ButtonsWrapper = styled.div`
  margin: ${props => props.iseditable ? '40px 0 60px 0' : '30px 0 60px 0' };
  display: ${props => props.iseditable ? 'flex' : 'block' };
  ${props => props.iseditable ? 'justify-content: space-evenly' : false };
  max-width: 300px;

  @media (min-width: 768px) {
    ${props => props.iseditable ? 'justify-content: space-between' : false };
  }
`;

const ButtonLink = styled(LinkButton)`
  padding: 1rem 3.5rem;
  margin: 0;
  display: ${props => props.iseditable ? 'block' : 'inline' };
`;

const SubTitle = styled.h2`
  text-transform: uppercase;
  color: ${colors.gray};
  font-size: 14px
`

const List = styled.ul`
  margin: 0 0 40px 0;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 25px;
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
  font-weight: ${({ weight }) => weight};
  font-size: 16px
  margin: 0.3rem 0
`



class ViewSet extends Component {
  componentDidMount() {
    this.props.changeLocation('set');
    this.props.changeLastLocation("/");
    this.props.removeNewKey();
    this.props.submitEditedSet(false)
  }

  render() {
    const { match, set, author, terms, signedUser, createLearnSet } = this.props;
    const iseditable = author === signedUser ? true : false;

    // if (this.props.isEditSubmited) return <Redirect to={`/sets/${this.props.match.params.id}`} />

    if (set && terms) {
      return (
        <Main>
          <Description set={set} />
          <Buttons signedUser={signedUser} setId={match.params.id} iseditable={iseditable} createLearnSet={createLearnSet} />
          <TermsList terms={terms} />
        </Main>
      )
    } else {
      return (
        <Main></Main>
      )
    }
  }
}

const Description = ({ set }) => (
  <>
    <SetName>{set.name}</SetName>
    <Details>
      <span>{set.amount} terms</span>
      <Border />
      <span>by {set.author}</span>
    </Details>
  </>
);

const Buttons = ({ signedUser, setId, iseditable, createLearnSet }) => (
  <ButtonsWrapper iseditable={iseditable.toString()}>
    { iseditable &&
      <ButtonLink to={`/edit/${setId}`}>edit set</ButtonLink>
    }
    <ButtonLink
      onClick={ () => signedUser ? createLearnSet(setId) : null }
      iseditable={iseditable.toString()}
      to={signedUser ? `/learn/${setId}` : '/signup'}
      >
      learn set
    </ButtonLink>
  </ButtonsWrapper>
);

const TermsList = ({ terms }) => (
  <>
    <SubTitle>terms</SubTitle>
    <List>
      {terms.map((term, index) =>
        <ListItem key={ term.id }>
          <Counter>{ index }</Counter>
          <SetWrapper>
            <Term weight={700}>{ term.term }</Term>
            <Term weight={600}>{ term.definition }</Term>
          </SetWrapper>
        </ListItem>
      )}
    </List>
  </>
);

export default ViewSet
