import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import MethodChoiceOverlay from '../components/overlay/MethodChoiceOverlay';

import styled from 'styled-components';
import { LinkButton, Button, Main, BlockShadow, Title, colors } from '../assets/styles/GlobalStyles';


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
  margin: 0;
  display: ${props => props.iseditable ? 'block' : 'inline' };
`;

const TermListWrapper = styled.div`
  @media (min-width: 786px) {
    margin: 0 40px
  }
`;

const SubTitle = styled.h2`
  text-transform: uppercase;
  color: ${colors.gray};
  font-size: 14px;
`;

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
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 20px 1px 20px;

  @media (min-width: 768px) {
    padding: 20px 0;
    grid-template-columns: 1fr 1px 1fr;
    grid-template-rows: 1fr
  }
`;

const Counter = styled.span`
  position: absolute;
  top: 30%;
  left: -8vw;
  color: #E5E5E5;
  font-weight: 700;
  font-size: 25px;

  @media (min-width: 768px) {
    left: -50px
  }
`;

const Term = styled.p`
  font-weight: ${({ weight }) => weight};
  font-size: 16px;
  margin: 0;

  @media (min-width: 768px) {
    padding-left: 40px
  }
`;

const Line = styled.div`
  @media (min-width: 768px) {
    width: 1.5px;
    height: 20px;
    background: ${colors.gray};
  }
`;

class ViewSet extends Component {
  componentDidMount() {
    this.props.changeLocation('set');
    this.props.changeLastLocation("/");
    this.props.removeNewKey();
    this.props.submitEditedSet(false)
  }

  render() {
    const { match, setDetails, author, terms, signedUser, isOverlayOpen, chooseMethod, createLearnSet, createPlaySet } = this.props;
    const iseditable = author === signedUser ? true : false;
    // if (this.props.isEditSubmited) return <Redirect to={`/sets/${this.props.match.params.id}`} />

    if (isOverlayOpen) {
      return (
        <MethodChoiceOverlay
          signedUser={signedUser}
          setid={match.params.id}
          chooseMethod={chooseMethod}
          createLearnSet={createLearnSet}
          createPlaySet={createPlaySet}
        />
      )
    } else {
      return (
        <Main width={50} maxWidth={650}>
          <Description setDetails={setDetails} />
          <Buttons setid={match.params.id} iseditable={iseditable} chooseMethod={chooseMethod} />
          <TermsList terms={terms} />
        </Main>
      )
    }
  }
}

const Description = ({ setDetails }) => (
  <>
    <SetName>{setDetails.name}</SetName>
    <Details>
      <span>{setDetails.amount} terms</span>
      <Border />
      <span>by {setDetails.author}</span>
    </Details>
  </>
);

const Buttons = ({ setid, iseditable, chooseMethod }) => {
  const handleChoice = () => {
    // open overlay then create
    chooseMethod(true)
  }

  return (
    <ButtonsWrapper iseditable={iseditable.toString()}>
      { iseditable &&
        <ButtonLink to={`/edit/${setid}`}>edit set</ButtonLink>
      }
      <Button onClick={handleChoice} iseditable={iseditable.toString()}>learn set</Button>
    </ButtonsWrapper>
  );
};

const TermsList = ({ terms }) => {
  return(
  <TermListWrapper>
    <SubTitle>terms</SubTitle>
    <List>
      {terms.map((term, index) =>
        <ListItem key={ term.id }>
          <Counter>{ index + 1 }</Counter>
          <SetWrapper>
            <Term weight={700}>{ term.term }</Term>
            <Line />
            <Term weight={600}>{ term.definition }</Term>
          </SetWrapper>
        </ListItem>
      )}
    </List>
  </TermListWrapper>
)};

export default ViewSet
