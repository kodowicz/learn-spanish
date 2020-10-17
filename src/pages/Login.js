import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

import SignIn from "../components/login/SignIn";
import SignUp from "../components/login/SignUp";
import Notification from "../components/navbar/Notification";
import {
  Main,
  Button,
  BasicInput,
  colors,
  fonts
} from "../assets/styles/GlobalStyles";

const Login = ({
  auth,
  authError,
  signIn,
  signUp,
  signUpError,
  removeNotification,
  changeLocation,
  changeLastLocation
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
      {authError && (
        <Notification
          message={authError}
          removeNotification={removeNotification}
        />
      )}

      <Main width={75} maxWidth={450} desktop={400}>
        <TabList role="tablist" aria-label="login">
          <Switch
            role="tab"
            id="signin"
            aria-controls="signin-tab"
            tabIndex={isToggled ? "0" : "-1"}
            aria-selected={isToggled ? "false" : "true"}
            onKeyDown={handleKeySwitch}
            onClick={() => handleSwitch(false)}
          >
            sign up
          </Switch>
          <Switch
            role="tab"
            id="signup"
            aria-controls="signup-tab"
            aria-selected={isToggled ? "true" : "false"}
            tabIndex={isToggled ? "-1" : "0"}
            onKeyDown={handleKeySwitch}
            onClick={() => handleSwitch(true)}
          >
            sign in
          </Switch>
          <Border isToggled={isToggled} />
        </TabList>

        <div
          hidden={isToggled ? "" : "hidden"}
          role="tabpanel"
          id="signin-tab"
          tabIndex="0"
          aria-labelledby="signin"
        >
          {isToggled && <SignIn auth={auth} signIn={signIn} />}
        </div>

        <div
          hidden={isToggled ? "hidden" : ""}
          role="tabpanel"
          id="signup-tab"
          tabIndex="0"
          aria-labelledby="signup"
        >
          {!isToggled && (
            <SignUp auth={auth} signUp={signUp} signUpError={signUpError} />
          )}
        </div>
      </Main>
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
  transform: ${props =>
    props.isToggled ? "translateX(100%)" : "translateX(0)"};
  background: ${colors.white};
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50%;
  height: 2px;
  transition: transform 0.4s ease-out;
`;

export default Login;
