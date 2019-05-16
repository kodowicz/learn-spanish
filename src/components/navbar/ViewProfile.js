import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { logOut } from '../../store/actions/authActions';
import { changeLocation, changeLastLocation } from '../../store/actions/locationActions';
import { Link, Redirect } from 'react-router-dom';

import { Main, Title, Button, colors, BlockShadow } from '../../styled/GlobalStyles';
import styled from 'styled-components';


const List = styled.div`
  margin: 60px 0 40px 0;
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Subtitle = styled.h2`
  text-transform: uppercase;
  color: ${colors.gray};
  font-size: 14px
`
const SetWrapper = styled(BlockShadow)`
  display: flex;
  height: 40px;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px;
  margin-bottom: 25px;
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

const Svg = styled.svg`
  width: 15px;
  margin-top: 30%;
  height: 70%;
  fill: none;
  stroke: ${colors.black};
  stroke-width: 10;
  stroke-linecap: round
`


class ViewProfile extends Component {
  componentDidMount() {
    this.props.changeLocation('profile');
    this.props.changeLastLocation("/");
  }

  handleClick = () => {
    this.props.logOut()
  }

  render() {
    const { userSets, user, auth } = this.props;
    if (!auth.uid) return <Redirect to="/signup" />;

    return (
      <Main>
        <Title>hello {user.username}</Title>
        <UserDetails user={user} />
        <Button onClick={this.handleClick}>log out</Button>
        <List>
          <Subtitle>your sets</Subtitle>
          <UserSets userSets={userSets} />
        </List>
      </Main>

    );
  }
}

const UserSets = ({ userSets }) => {
  return userSets.map(set =>
    <SetWrapper key={ set.id }>
      <Link to={`/sets/${set.id}`}>
        <Topic>{ set.name }</Topic>
        <Info>{ set.terms.length } terms</Info>
      </Link>
    </SetWrapper>
  )
};


const UserDetails = ({ user }) => (
  <List>
    <ListItem>
      <span>email</span>
      <span>{ user.email }</span>
    </ListItem>
    <ListItem>
      <span>username</span>
      <span>{ user.username }</span>
    </ListItem>
    <ListItem>
      <span>change password</span>
      <span>
        <Svg viewBox="0 0 100 100">
          <path d="M20,7 L75,50 M20,93 L75,50" />
        </Svg>
      </span>
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
  connect(mapStateToProps, { logOut, changeLocation, changeLastLocation }),
  firestoreConnect([
    { collection: 'sets' }
  ])
)(ViewProfile);
