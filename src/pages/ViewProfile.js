import React, { Component } from 'react';
// import { Link, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { Title as TitleElement, Button, LinkButton, colors, BlockShadow } from '../assets/styles/GlobalStyles';
import styled from 'styled-components';
import arrow from '../assets/images/arrow.svg';
import Password from '../components/overlay/Password';

const Main = styled.main`
  display: grid;
  width: 76vw;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, min-content);
  grid-row-gap: 50px;
  margin: 120px auto;

  @media (min-width: 768px) {
    width: 70vw;
    grid-template-columns: 1fr minmax(200px, 1fr);
    grid-template-rows: 6rem repeat(2, min-content);
    grid-gap: 50px 15%
  }
`;

const Title = styled(TitleElement)`
  @media (min-width: 768px) {
    grid-column: 1 / 3;
    grid-row: 1 / 2
  }
`;

const User = styled.ul`
  width: 100%;
  max-width: 350px;
  justify-self: center

  @media (min-width: 768px) {
    width: 300px;
  }
`;

const UserItem = styled.li`
  display: flex;
  justify-content: space-between;
`;

const SetList = styled.ul`
  @media (min-width: 768px) {
    grid-column: 2 / 3;
    grid-row: 1 / 4;
    align-self: center;
  }
`;

const Subtitle = styled.h2`
  text-transform: uppercase;
  color: ${colors.gray};
  font-size: 14px
`

const ListItem = styled.li`
  list-style: none;
  ${'' /* margin: 30px 0; */}

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

class ViewProfile extends Component {
  componentDidMount() {
    this.props.changeLocation('profile');
    this.props.changeLastLocation("");
  }

  handleClick = () => {
    this.props.logOut()
  }

  render() {
    const { uid, user, userSets } = this.props;

    // if (!auth.uid) return <Redirect to="/signup" />;

    return ((uid) ?
      // is a will to change password ? <Passowrd /> :
      <Main>
        <Title>hello {user.username}</Title>
        <UserDetails user={user} />
        <Button type="button" onClick={this.handleClick}>log out</Button>
        { userSets &&
          <>
            <Subtitle id="set-title"> your sets </Subtitle>
            <SetList aria-labelledby="set-title">
              <UserSets userSets={userSets} />
            </SetList>
          </>
        }
      </Main>
      :
      <Main>
        <Title>hello Stranger</Title>
        <Info>To add more sets or edit existing ones, you have to be signed in.</Info>
        <LinkButton to="/signup">sign in</LinkButton>
      </Main>
    );
  }
}

// extract this component
const UserSets = ({ userSets }) => {
  return userSets.map(set =>
    <ListItem key={ set.id }>
      <Link to={`/sets/${set.id}`}>
        <SetWrapper>
          <Topic>{ set.name }</Topic>
          <Info>{ set.amount } terms</Info>
        </SetWrapper>
      </Link>
    </ListItem>
  )
};


const UserDetails = ({ user }) => (
  <User>
    <UserItem>
      <span>email</span>
      <span>{ user.email }</span>
    </UserItem>
    <UserItem>
      <span>username</span>
      <span>{ user.username }</span>
    </UserItem>
    <UserItem>
      <span>change password</span>
      <input type="image" src={arrow} alt="change password" />
        {/* <img src={arrow} alt="change password" /> */}
      {/* </button> */}
    </UserItem>
  </User>
)

export default ViewProfile;
