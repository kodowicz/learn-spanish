import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import styled from 'styled-components';

import { LinkButton, Main, BlockShadow, Title } from '../../styled/GlobalStyles';



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


class Home extends Component {
  render() {
    return (
      <Main>
        <Title>flashcards</Title>
        {this.props.sets && <Sets sets={this.props.sets} />}
        <LinkButton to="/create">add new set</LinkButton>
      </Main>
    );
  }
}


class Sets extends Component {
  render() {
    return (
      <List>
        { this.props.sets.map(set =>
          <ListItem key={ set.id }>
            <Link to={`/sets/${set.id}`}>
              <SetWrapper>
                <Topic>{ set.name }</Topic>
                <Info>{ set.terms.length } terms</Info>
                <Info>by { set.author }</Info>
              </SetWrapper>
            </Link>
          </ListItem>
        )}
      </List>
    )
  }
};

const mapStateToProps = state => {
  console.log(state);
  return({
  sets: state.firestore.ordered.sets
})}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'sets' }
  ])
)(Home);
