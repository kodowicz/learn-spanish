import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { logOut } from '../../store/actions/authActions';
import { Link, Redirect } from 'react-router-dom';

import { Main, Title, Button, colors, BlockShadow } from '../../styled/GlobalStyles';
import styled from 'styled-components';


const List = styled.div`
  margin: 35px 0 40px 0;
`;

const ListItem = styled.div`
  display: flex;
  margin: 5px 0;
  justify-content: space-between;
`;

const Span = styled.span`
  
`

const Subtitle = styled.h2`
  font-size: 22px;
  color: ${colors.black};
  text-align: center;
  margin: 60px 0 30px 0;
`
const SetWrapper = styled(BlockShadow)`
  display: flex;
  height: 40px;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px;

  a {
    text-decoration: none
  }
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


class ViewProfile extends Component {

  handleClick = () => {
    this.props.logOut()
  }

  listOfSets = (sets) => {
    return sets.map((set, index) =>
      <SetWrapper key={ index }>
        <Link to={`/sets/${set.name}`}>
          <Topic>{ set.name }</Topic>
          <Info>{ set.terms.length } terms</Info>
        </Link>
      </SetWrapper>
    )
  }

  render() {
    const { userSets, user, auth } = this.props;

    if (!auth.uid) return <Redirect to="/signup" />;

    return (
      <Main>
        <Title>hello { user.username }</Title>

        <UserDetails user={ user }/>

        <Button onClick={this.handleClick}>log out</Button>

        <List>
          <Subtitle>your sets</Subtitle>
          { this.listOfSets(userSets) }
        </List>
      </Main>

    );
  }
}

const UserDetails = ({ user }) => (
  <List>
    <ListItem>
      <Span>email</Span>
      <Span>{ user.email }</Span>
    </ListItem>
    <ListItem>
      <Span>username</Span>
      <Span>{ user.username }</Span>
    </ListItem>
    <ListItem>
      <Span>change password</Span>
    </ListItem>
  </List>
)


const mapStateToProps = state => {
  const userId = state.firebase.auth.uid;
  const sets = state.firestore.ordered.sets;
  const userSets = sets ? sets.filter(set => set.authorId === userId) : [];

  return ({
    userSets: userSets,
    user: state.firebase.profile,
    auth: state.firebase.auth,
    authError: state.auth.authError
  })
}

export default compose(
  connect(mapStateToProps, { logOut }),
  firestoreConnect([
    { collection: 'sets' }
  ])
)(ViewProfile);
