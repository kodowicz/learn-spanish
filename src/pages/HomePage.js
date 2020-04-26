import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { LinkButton, Main, BlockShadow, Title } from '../assets/styles/GlobalStyles';
import percent from '../assets/images/percentage.svg';

const ListWrapper = styled.div`

`;

const ListTitle = styled.p`

`;

const List = styled.ul`
  margin: 40px 0 60px 0;
  padding: 0;

  @media (min-width: 768px) {
    margin: 60px auto;
  }
`;

const ListItem = styled.li`
  list-style: none;
  margin: 30px 0;

  a {
    text-decoration: none;

  }
`;

const SetWrapper = styled(BlockShadow)`
  display: flex;
  height: 40px;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px;
  box-sizing: content-box;
`;

const Topic = styled.p`
  color: #303030;
  font-weight: 700;
  font-size: 18px;
  width: 100%;
  margin: 0;
`

const Info = styled.p`
  color: #849197;
  font-weight: 600;
  font-size: 12px;
  margin: 0
`

const Percentage = styled.div`

`


class HomePage extends Component {
  componentDidMount() {
    this.props.changeLocation('home');
    this.props.changeLastLocation("/");
  }

  render() {
    // loading page => manipulacja transform, nie top/left
    // różniaca przy zastosowaniu will-change: transform
    const { isLogged, allSets, userSets } = this.props;

    return (
      <>
        <Main width={30} minWidth={350} maxWidth={450}>
          <Title>Are you ready for a new dose of words?</Title>
          <UserSetsList sets={userSets} />
          <AllSetsList sets={allSets} />
          <LinkButton transparent={true.toString()} to={ isLogged ? "/create" : "/signup" }>create set</LinkButton>
        </Main>
      </>
    );
  }
}


const UserSetsList = ({ sets }) => {
  return(
    <ListWrapper>
      <ListTitle>get back to learn</ListTitle>

      <List>
        { sets.map(set =>
          <ListItem key={ set.id }>
            <Link to={`/sets/${set.id}`}>
              <SetWrapper>
                <Topic>{ set.name }</Topic>
                <Info>{ set.amount } terms</Info>
                <Percentage>{ set.knowledge }</Percentage>
              </SetWrapper>
            </Link>
          </ListItem>
        )}
      </List>
    </ListWrapper>
)};

const AllSetsList = ({ sets }) => {
  return (
    <ListWrapper>
      <ListTitle>available sets</ListTitle>
      <List>
        { sets.map(set =>
          <ListItem key={ set.id }>
            <Link to={`/sets/${set.id}`}>
              <SetWrapper>
                <Topic>{ set.name }</Topic>
                <Info>{ set.amount } terms</Info>
                <Info>by { set.author }</Info>
              </SetWrapper>
            </Link>
          </ListItem>
        )}
      </List>
    </ListWrapper>
  )
};



export default HomePage
