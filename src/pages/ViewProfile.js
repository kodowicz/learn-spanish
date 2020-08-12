import React, { Component } from 'react';

import { Main, Button, LinkButton, fonts } from '../assets/styles/GlobalStyles';
import styled from 'styled-components';
import arrow from '../assets/images/arrow.svg';
import Password from '../components/overlay/Password';
import SetsList from '../components/dashboard/SetsList';


class ViewProfile extends Component {

  componentDidMount() {
    this.props.changeLocation('profile');
    this.props.changeLastLocation("");
    window.scrollTo(0, 0);
  }

  handleClick = () => {
    this.props.logOut()
  }

  componentDidUpdate(prevProps) {
    // if (this.props.uid !== prevProps.uid) {
    //   console.log(this.props.uid);
    // }
    if (this.props.authError !== prevProps.authError) {
      this.props.notificationError(this.props.authError)
    }
  }

  render() {
    const {
      uid,
      user,
      userSets,
      isOverlayOpen,
      openPasswordOverlay,
      changePassword,
      notificationError
    } = this.props;

    if (uid) {
      if (isOverlayOpen) {
        return (
          <Password
            notificationError={notificationError}
            changePassword={changePassword}
          />
        )
      } else {
        return (
          <Main width={75} maxWidth={450}>
            <Title>hello {user.username}</Title>
            <UserDetails
              user={user}
              openPasswordOverlay={openPasswordOverlay}
            />
            <Button
              type="button"
              center="true"
              onClick={this.handleClick}
            >
              log out
            </Button>
            { Boolean(userSets.length) ?
              <SetsList
                sets={userSets}
                title="your sets"
                margin="6rem 0"
              />
              :
              <Info>Your list of learning sets is empty. To add some pick a set from available ones.</Info>
            }
          </Main>
        )
      }
    } else {
      return (
        <Main width={75} maxWidth={450}>
          <Title>hello Stranger</Title>
          <Paragraph>To learn, add more sets or edit existing ones you have to be signed in.</Paragraph>
          <LinkButton
            to="/signup"
            center="true"
          >
            sign up
          </LinkButton>
        </Main>
      );
    }
  }
}


const UserDetails = ({ user, openPasswordOverlay }) => (
  <UserWrapper>
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
      <ArrowButton
        onClick={() => openPasswordOverlay(true)}
      >
        <Img src={arrow} alt="change password" />
      </ArrowButton>
    </UserItem>
  </UserWrapper>
);



const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin: 0;
`;

const UserWrapper = styled.ul`
  padding: 0;
  margin: 3rem 0;
  width: 100%;
  max-width: 350px;
  font-size: 1.4rem;

  @media (min-width: 768px) {
    width: 300px;
  }
`;

const UserItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin: 3px 0;
`;

const ArrowButton = styled.button`
  background: none;
  padding: 0;
  height: 2rem;
  border: none;
`;

const Img = styled.img`
  height: 100%
`;

const Info = styled.p`
  font-weight: 500;
  margin: 6rem 0;
  text-align: center;
`

const Paragraph = styled.p`
  font-weight: ${fonts.semiBold};
  margin: 2.5rem 0 3.5rem 0;
  text-align: center;
`;


export default ViewProfile;
