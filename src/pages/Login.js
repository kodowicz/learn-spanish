import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

import { Content } from "../components/Background";
import SignIn from "../components/login/SignIn";
import SignUp from "../components/login/SignUp";
import Notification from "../components/navbar/Notification";
import { Button, BasicInput, colors, fonts } from "../assets/styles/GlobalStyles";

const Login = ({
  auth,
  signIn,
  signUp,
  guestLogin,
  setNotification,
  removeNotification,
  changeLocation,
  changeLastLocation,
  setContentHeight
}) => {
  const [isToggled, setToggle] = useState(false);

  useEffect(() => {
    changeLocation("login");
    changeLastLocation("/");
  }, []);

  function handleSwitch(isToggled) {
    setToggle(isToggled);
  }

  function handleKeySwitch(event) {
    if (event.keyCode === 39 || event.keyCode === 37) {
      setToggle(!isToggled);
    }
  }

  if (auth.uid) return <Redirect to={`/profile/${auth.uid}`} />;

  return (
    <>
      <Content
        setContentHeight={setContentHeight}
        width={75}
        maxWidth={450}
        desktop={400}
      >
        <TabList role="tablist" aria-label="login">
          <Switch
            role="tab"
            id="signin"
            aria-controls="signup-tab"
            aria-selected={!isToggled}
            tabIndex={isToggled ? "0" : "-1"}
            onKeyDown={handleKeySwitch}
            onClick={() => handleSwitch(false)}
          >
            sign in
          </Switch>
          <Switch
            role="tab"
            id="signup"
            aria-controls="signin-tab"
            aria-selected={isToggled}
            tabIndex={isToggled ? "-1" : "0"}
            onKeyDown={handleKeySwitch}
            onClick={() => handleSwitch(true)}
          >
            sign up
          </Switch>
          <Border isToggled={isToggled} />
        </TabList>

        <div
          hidden={isToggled ? "hidden" : ""}
          role="tabpanel"
          id="signin-tab"
          tabIndex="0"
          aria-labelledby="signin"
        >
          { !isToggled && (
            <SignIn signIn={signIn} guestLogin={guestLogin} />
          )}
        </div>

        <div
          hidden={isToggled ? "" : "hidden"}
          role="tabpanel"
          id="signup-tab"
          tabIndex="0"
          aria-labelledby="signup"
        >
          { isToggled && (
            <SignUp signUp={signUp} setNotification={setNotification} />
          )}
        </div>
      </Content>
    </>
  );
};

const TabList = styled.div`
  height: 7rem;
  display: flex;
  position: relative;
`;

const Switch = styled.button`
  font-family: ${fonts.family};
  color: ${colors.white};
  outline: none;
  background: none;
  border: none;
  font-size: 1.6rem;
  width: 50%;
`;

const Border = styled.div`
  transform: ${ props => props.isToggled ? "translateX(100%)" : "translateX(0)"};
  background: ${colors.white};
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50%;
  height: 2px;
  transition: transform 0.4s ease-out;
`;

export default Login;
