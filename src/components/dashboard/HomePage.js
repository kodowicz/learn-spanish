import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { LinkButton, Main, BlockShadow, Title } from '../../assets/styles/GlobalStyles';



const List = styled.ul`
  margin: 40px 0 60px 0;
  padding: 0;
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


class HomePage extends Component {
  componentDidMount() {
    this.props.changeLocation('home');
    this.props.changeLastLocation("/");
  }

  render() {
    // if (!isLoaded(users)) return <LoadingComponent inverted={true} />;
    const { isLogged, sets } = this.props;

    return (
      <Main>
        <Title>flashcards</Title>
        {sets && <SetsList sets={sets} />}
        <LinkButton to={ isLogged ? "/create" : "/signup" }>add new set</LinkButton>
      </Main>
    );
  }
}


class SetsList extends Component {
  render() {
    return (
      <List>
        { this.props.sets.map(set =>
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
    )
  }
};

export default HomePage
