import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import MethodChoiceOverlay from '../components/overlay/MethodChoiceOverlay';
import ProgressBar from '../components/ProgressBar';

import styled from 'styled-components';
import { LinkButton, Button, Main, BlockElement, colors, fonts } from '../assets/styles/GlobalStyles';


class ViewSet extends Component {
  state = {
    redirect: false
  }

  componentDidMount() {
    this.props.changeLocation('set');
    this.props.changeLastLocation("/");
    this.props.removeNewKey();
    this.props.enableEditSet();
    this.props.deleteSetChanges()  // if user changes location by searchbar
  }

  componentWillMount() {
    this.props.setCurrentSetId(this.props.match.params.id);
  }

  render() {
    const {
      match,
      setDetails,
      author,
      percentage,
      terms,
      signedUser,
      isOverlayOpen,
      chooseMethod,
      createLearnSet,
      createPlaySet
    } = this.props;

    const iseditable = author === signedUser ? true : false;

    // handle if set doesn't exist
    if (this.props.redirect) return <Redirect to='/404' />; //?

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
        <Main width={80} maxWidth={650} desktop={600}>
          <Description setDetails={setDetails} percentage={percentage} />
          <Buttons setid={match.params.id} iseditable={iseditable} chooseMethod={chooseMethod} />
          <TermsList terms={terms} />
        </Main>
      )
    }
  }
}

const Description = ({ setDetails, percentage }) => (
  <>
    <DetailsWrapper>
      <SetName>{setDetails.name}</SetName>
        <Info>{setDetails.amount} terms</Info>
        <Border />
        <Info>by {setDetails.author}</Info>
        { (percentage !== undefined && percentage !== null) &&
          <Progress>
            <ProgressBar
              percentage={percentage}
              width='6rem'
              bgColor={colors.progress}
            />
          </Progress>
        }
    </DetailsWrapper>
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
        <LinkButton isCentre={true} to={`/edit/${setid}`}>
          edit set
        </LinkButton>
      }
      <Button onClick={handleChoice}>
        learn set
      </Button>
    </ButtonsWrapper>
  );
};

const TermsList = ({ terms }) => (
  <TermListWrapper>
    <SubTitle>terms</SubTitle>
    <List>
      {terms.map((term, index) => (
        <ListItem key={ term.id }>
          <Counter
            isLessThanTen={((index + 1) < 10) ? true : false}
          >
            { index + 1 }
          </Counter>
          <SetWrapper>
            <Term id="term">{ term.term }</Term>
            <Line />
            <Term id="definition">{ term.definition }</Term>
          </SetWrapper>
        </ListItem>
      ))}
    </List>
  </TermListWrapper>
);


const DetailsWrapper = styled.div`
  display: grid;
  grid-template-columns: max-content 15px max-content 1fr 90px;
  grid-template-rows: repeat(2, min-content);
  grid-row-gap: 0.7rem
`;

const SetName = styled.h1`
  grid-column: span 4;
  font-size: 3.2rem;
  font-weight: ${fonts.bold};
  margin: 0;
`;

const Info = styled.span`
  color: ${colors.azure};
  grid-row: 2 / 3;
`;

const Border = styled.div`
  height: 1.8rem;
  width: 1.5px;
  background: ${colors.azure};
  grid-column: 2 / 3;
  grid-row: 2 /3;
  place-self: center;
`;

const Progress = styled.figure`
  height: 6rem;
  margin: 0;
  grid-row: 1 / 3;
  grid-column: 5 / 6;
  align-self: center;
`;

const ButtonsWrapper = styled.div`
  margin: 40px auto 60px auto;
  display: flex;
  justify-content: space-evenly;
  max-width: 300px;

  ${'' /* @media (min-width: 768px) {
    ${props => props.iseditable ? 'justify-content: space-between' : false };
  } */}
`;

const TermListWrapper = styled.div`
  width: 76vw;
  margin: 0 auto;

  @media (min-width: 786px) {
    margin: 0 40px
  }
`;

const SubTitle = styled.h2`
  color: ${colors.white};
  font-size: 1.6rem;
  margin-bottom: 0.8rem;
`;

const List = styled.ul`
  margin: 0 0 40px 0;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 1.6rem;
  height: 7.7rem;
  height: auto;
  list-style: none
  position: relative;
`;

const SetWrapper = styled(BlockElement)`
  padding: 1.6rem 2rem;
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

const Term = styled.p`
  font-weight: ${(props) => props.id === 'term' ? `${fonts.bold}` : `${fonts.semiBold}`};
  font-size: ${(props) => props.id === 'term' ? '1.6rem' : '1.4rem'};
  color: ${(props) => props.id === 'term' ? `${colors.white}` : `${colors.lightGray}`};
  margin: 0;
  white-space: pre-line;

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

export default ViewSet
