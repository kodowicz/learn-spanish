import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUp, signIn, cleanError } from '../../store/actions/authActions';
import { changeLocation, changeLastLocation } from '../../store/actions/locationActions';
import { Redirect } from 'react-router-dom';

import { Main, Button, colors } from '../../styled/GlobalStyles';
import styled, { css } from 'styled-components';


const SwitchWrapper = styled.div`
  height: 60px;
  display: flex;
  position: relative;
`;

const Switch = styled.button`
  background: none;
  border: none;
  font-family: 'Open Sans', sans-serif;
  color: ${colors.black};
  font-size: 16px;
  width: 50%;
  ${'' /* outline: none */}
`;

const Border = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50%;
  height: 2px;
  background: ${colors.blue};
  transform: ${props => props.toggle ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.4s ease-out
`;

const Form = styled.form`
  margin: 60px 0;
`;

const ErrorMessage = styled.p`
  color: #F65D5D;
  font-size: 14px;
  text-align: center;
`;

const Wrapper = styled.div`
  position: relative;
  border-radius: 5px;
  box-shadow: 0 7px 15px -5px rgba(7, 22, 124, 0.2);
  margin: 40px 0;
`;

const Label = styled.label`
  position: absolute;
  top: -1.2rem;
  left: 0;
  font-size: 12px;
  color: ${colors.gray}

  ${'' /* ${props => props.error === "auth/wrong-password"} */}
`;

const Input = styled.input`
  border-radius: 5px;
  border: none;
  padding: 1rem 1rem;
  width: 100%;
  box-sizing: border-box;
  font-size: 16px;
  font-family: 'Open Sans', sans-serif;
  color: ${colors.black};
  outline-color: ${colors.blue};
`;


class Login extends Component {
  state = { toggle: true }

  componentDidMount() {
    this.props.changeLocation('log in');
    this.props.changeLastLocation("/");
  }

  handleClick = (toggle) => {
    this.props.cleanError();
    this.setState({
      toggle: toggle
    })
  }

  render() {
    const { auth, authError, signIn, signUp } = this.props;
    if (auth.uid) return <Redirect to={`/profile/${auth.uid}`} />;

    return (
      <Main>
        <SwitchWrapper>
          <Switch onClick={() => this.handleClick(true)}>sign in</Switch>
          <Switch onClick={() => this.handleClick(false)}>sign up</Switch>
          <Border toggle={this.state.toggle} />
        </SwitchWrapper>

          { this.state.toggle ?
            <SignInForm auth={ auth } error={ authError } signIn={ signIn } /> :
            <SignUpForm auth={ auth } error={ authError } signUp={ signUp } />
          }
      </Main>
    );
  }
}

class SignInForm extends Component {
  state = {
    email: "",
    password: ""
  }

  errors = [
    {
      code: "auth/invalid-email",
      message: "The email address is badly formatted."
    },
    {
      code: "auth/user-not-found",
      message: "There is no user record corresponding to this identifier. The user may have been deleted."
    },
    {
      code: "auth/wrong-password",
      message: "The password is invalid or the user does not have a password."
    }
  ]

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.signIn(this.state);
  }

  render() {
    console.log(this.props.error);
    return (
      <Form onSubmit={this.handleSubmit}>
        <ErrorMessage>{ this.props.error }</ErrorMessage>
      <Wrapper>
        <Label htmlFor="email">email</Label>
        <Input id="email" name="email" type="email" onChange={this.handleChange} required/>
      </Wrapper>
      <Wrapper>
        <Label htmlFor="password">password</Label>
        <Input id="password" name="password" type="password" onChange={this.handleChange} required/>
      </Wrapper>

      <Button>sign in</Button>
    </Form>
    );
  }
}

class SignUpForm extends Component {
  state = {
    email: "",
    username: "",
    password: ""
  }

  errors = [
    {
      code: "auth/invalid-email",
      message: "The email address is badly formatted."
    },
    {
      code: "auth/weak-password",
      message: "Password should be at least 6 characters."
    },
    {
      code: "auth/email-already-in-use",
      message: "The email address is already in use by another account."
    },
    {
      code: "",
      message: "The name should be at least 4 characters."
    }
  ]

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.signUp(this.state)
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <ErrorMessage>{ this.props.error }</ErrorMessage>
        <Wrapper>
          <Label htmlFor="email">email</Label>
          <Input id="email" name="email" type="email" onChange={this.handleChange} required/>
        </Wrapper>
        <Wrapper>
          <Label htmlFor="name">username</Label>
          <Input id="username" name="name" type="text" onChange={this.handleChange} required/>
        </Wrapper>
        <Wrapper>
          <Label htmlFor="password">password</Label>
          <Input id="password" name="password" type="password" onChange={this.handleChange} required/>
        </Wrapper>

        <Button>sign up</Button>
      </Form>
    )
  }
}


const mapStateToProps = state => ({
  auth: state.firebase.auth,
  authError: state.auth.authError
});

export default connect(
  mapStateToProps,
  { signIn, signUp, cleanError, changeLocation, changeLastLocation }
)(Login);
