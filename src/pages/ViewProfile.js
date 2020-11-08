import React, { useEffect } from "react";
import styled from "styled-components";

import { Content } from "../components/Background";
import Password from "../components/overlay/Password";
import SetsList from "../components/dashboard/SetsList";
import { Button, LinkButton, fonts } from "../assets/styles/GlobalStyles";
import arrow from "../assets/images/arrow.svg";

const ViewProfile = ({
  uid,
  user,
  userSets,
  isOverlayOpen,
  openPasswordOverlay,
  changePassword,
  changeLocation,
  changeLastLocation,
  setContentHeight,
  notificationError,
  logOut,
  logoutNotification
}) => {
  useEffect(() => {
    changeLocation("profile");
    changeLastLocation("");
  }, []);

  useEffect(
    () => {
      if (isOverlayOpen) setContentHeight(0);
    },
    [isOverlayOpen]
  );
  
  function handleClick() {
    logOut();
    logoutNotification();
  }

  if (uid) {
    if (isOverlayOpen) {
      return (
        <Password
          notificationError={notificationError}
          changePassword={changePassword}
          openPasswordOverlay={openPasswordOverlay}
        />
      );
    } else {
      return (
        <Content
          setContentHeight={setContentHeight}
          width={75}
          maxWidth={450}
          desktop={720}
        >
          <Title>hello {user.username}</Title>
          <UserDetails user={user} openPasswordOverlay={openPasswordOverlay} />
          <Button type="button" center="true" onClick={handleClick}>
            log out
          </Button>
          {userSets?.length ? (
            <SetsList
              isPercentage={true}
              sets={userSets}
              title="your sets"
              margin="6rem 0"
            />
          ) : (
            <Info>
              Your list of learning sets is empty. To add some pick a set from
              available ones.
            </Info>
          )}
        </Content>
      );
    }
  } else {
    return (
      <Content setContentHeight={setContentHeight} width={75} maxWidth={450}>
        <Title>hello Stranger</Title>
        <Paragraph>
          To learn, create sets or edit existing ones you have to be signed in.
        </Paragraph>
        <LinkButton to="/signup" center="true">
          sign up
        </LinkButton>
      </Content>
    );
  }
};

const UserDetails = ({ user, openPasswordOverlay }) => (
  <UserWrapper>
    <UserItem>
      <span>email</span>
      <span>{user.email}</span>
    </UserItem>
    <UserItem>
      <span>username</span>
      <span>{user.username}</span>
    </UserItem>
    <UserItem>
      <span>change password</span>
      <ArrowButton onClick={() => openPasswordOverlay(true)}>
        <Img src={arrow} alt="change password" />
      </ArrowButton>
    </UserItem>
  </UserWrapper>
);

const Title = styled.h1`
  font-weight: ${fonts.bold};
  font-size: 2.5rem;
  text-align: center;
  margin: 0;

  @media (min-width: 768px) {
    font-size: 4.5rem;
  }
`;

const UserWrapper = styled.ul`
  padding: 0;
  margin: 3rem auto;
  width: 100%;
  max-width: 350px;
  font-size: 1.4rem;

  @media (min-width: 768px) {
    width: 350px;
    margin: 4rem auto;
    font-size: 1.6rem;
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
  height: 100%;
`;

const Info = styled.p`
  font-weight: 500;
  margin: 6rem 0;
  text-align: center;
`;

const Paragraph = styled.p`
  font-weight: ${fonts.semiBold};
  margin: 2.5rem 0 3.5rem 0;
  text-align: center;
`;

export default ViewProfile;
