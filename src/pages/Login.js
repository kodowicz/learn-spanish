import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import SignIn from '../components/login/SignIn';
import SignUp from '../components/login/SignUp';
import Notification from '../components/navbar/Notification';

import { Main, Button, BasicInput, colors, fonts } from '../assets/styles/GlobalStyles';
import styled from 'styled-components';


class Login extends Component {
  state = {
    toggle: false
  }

  componentDidMount() {
    this.props.changeLocation('login');
    this.props.changeLastLocation("/");
  }

  handleSwitch = (toggle) => {
    this.setState({
      toggle: toggle
    })
  }

  handleKeySwitch = (event) => {
    if (event.keyCode === 39 || event.keyCode === 37) {
      this.setState({
        toggle: !this.state.toggle
      })
    }
  }

  render() {
    const { auth, authError, signIn, signUp, signUpError, removeNotification } = this.props;
    const { toggle } = this.state;

    if (auth.uid) return <Redirect to={`/profile/${auth.uid}`} />;

    return (
      <>
        {(authError) &&
          <Notification
            message={authError}
            removeNotification={removeNotification}
          />
        }

        <Main width={75} maxWidth={450} desktop={400}>
            <TabList role="tablist" aria-label="login">
              <Switch
                role="tab"
                id="signin"
                aria-controls="signin-tab"
                tabIndex={toggle ? "0" : "-1"}
                aria-selected={toggle ? "false" : "true"}
                onKeyDown={this.handleKeySwitch}
                onClick={() => this.handleSwitch(false)}
              >
                sign up
              </Switch>
              <Switch
                role="tab"
                id="signup"
                aria-controls="signup-tab"
                aria-selected={toggle ? "true" : "false"}
                tabIndex={toggle ? "-1" : "0"}
                onKeyDown={this.handleKeySwitch}
                onClick={() => this.handleSwitch(true)}
              >
                sign in
              </Switch>
              <Border toggle={toggle} />
            </TabList>

            <div
              hidden={toggle ? "" : "hidden"}
              role="tabpanel"
              id="signin-tab"
              tabIndex="0"
              aria-labelledby="signin"
            >
              {toggle &&
                <SignIn
                  auth={auth}
                  signIn={signIn}
                />
              }
            </div>

            <div
              hidden={toggle ? "hidden": ""}
              role="tabpanel"
              id="signup-tab"
              tabIndex="0"
              aria-labelledby="signup"
            >
              {!toggle &&
                <SignUp
                  auth={auth}
                  signUp={signUp}
                  signUpError={signUpError}
                />
              }
            </div>
        </Main>
      </>
    );
  }
}


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
  background: ${colors.white};
  transform: ${props => props.toggle ? 'translateX(100%)' : 'translateX(0)'};
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50%;
  height: 2px;
  transition: transform 0.4s ease-out
`;


export default Login;
