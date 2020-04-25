import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import SignIn from '../components/login/SignIn';
import SignUp from '../components/login/SignUp';

import { Main, Button, BasicInput, colors } from '../assets/styles/GlobalStyles';
import styled from 'styled-components';


const TabList = styled.div`
  height: 60px;
  display: flex;
  position: relative;
`;

const Switch = styled.button`
  background: none;
  border: none;
  font-family: 'Open Sans', sans-serif;
  color: ${colors.black};
  font-size: 1.6rem;
  width: 50%;
  outline-color: ${colors.blue}
`;

const Border = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50%;
  height: 2px;
  background: ${colors.blue};
  transform: ${props => props.toggle ? 'translateX(100%)' : 'translateX(0)'};
  transition: transform 0.4s ease-out
`;



class Login extends Component {
  state = { toggle: false }

  componentDidMount() {
    // this.props.changeLocation('log in');
    // this.props.changeLastLocation("/");
  }

  handleClick = (toggle) => {
    // this.props.cleanError();
    this.setState({
      toggle: toggle
    })
  }

  render() {
    const { auth, authError, signIn, signUp, signUpError } = this.props;
    const { toggle } = this.state;

    if (auth.uid) return <Redirect to={`/profile/${auth.uid}`} />;

    return (
      <Main>
        <div>

          <TabList role="tablist" aria-label="login">
            <Switch
              onClick={() => this.handleClick(false)}
              role="tab"
              aria-selected="true"
              aria-controls="signin-tab"
              id="signin"
            >
              sign up
            </Switch>
            <Switch
              onClick={() => this.handleClick(true)}
              role="tab"
              aria-selected="false"
              aria-controls="signup-tab"
              id="signup"
              data-deletable=""
              tabIndex="-1"
            >
              sign in
            </Switch>
            <Border toggle={toggle} />
          </TabList>

          <div tabIndex="0" role="tabpanel" id="signin-tab" aria-labelledby="signin" hidden={!toggle ? "hidden": ""}>
            {toggle &&
              <SignIn
                auth={auth}
                error={authError}
                signIn={signIn}
              />
            }
          </div>

          <div tabIndex="0" role="tabpanel" id="signup-tab" aria-labelledby="signup" hidden={toggle ? "hidden": ""}>
            {!toggle &&
              <SignUp
                auth={auth}
                error={authError}
                signUp={signUp}
                signUpError={signUpError}
              />
            }
          </div>

        </div>
      </Main>
    );
  }
}

export default Login;
