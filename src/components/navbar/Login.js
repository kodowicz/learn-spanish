import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUp, signIn, cleanError, signUpError } from '../../store/actions/authActions';
import { changeLocation, changeLastLocation } from '../../store/actions/locationActions';
import { Redirect } from 'react-router-dom';

import { Main, Button, BasicInput, colors } from '../../assets/styles/GlobalStyles';
import styled from 'styled-components';


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
  transform: ${props => props.toggle ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.4s ease-out
`;

const Form = styled.form`
  margin: 60px 0;
`;

const ErrorMessage = styled.p`
  color: ${colors.warming};
  font-size: 1.4rem;
  text-align: center;
`;

const Wrapper = styled.div`
  position: relative;
  border-radius: 5px;
  box-shadow: 0 7px 15px -5px ${colors.navyBoxShadow};
  margin: 40px 0;
`;

const Label = styled.label`
  position: absolute;
  top: -1.6rem;
  left: 0;
  font-size: 1.2rem;
  color: ${colors.gray}
`;

const Input = styled(BasicInput)`
  background: none;
  border-radius: 5px;
  padding: 1rem 1rem;
  width: 100%;
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
    const { auth, authError, signIn, signUp, signUpError } = this.props;
    const { toggle } = this.state;

    if (auth.uid) return <Redirect to={`/profile/${auth.uid}`} />;

    return (
      <Main>
        <SwitchWrapper>
          <Switch onClick={() => this.handleClick(true)}>sign in</Switch>
          <Switch onClick={() => this.handleClick(false)}>sign up</Switch>
          <Border toggle={toggle} />
        </SwitchWrapper>

          { toggle ?
            <SignInForm auth={ auth } error={ authError } signIn={ signIn } /> :
            <SignUpForm auth={ auth } error={ authError } signUp={ signUp } signUpError={ signUpError }/>
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
    password: "",
    confirm: ""
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.username.length < 4) {
      this.props.signUpError("Username should be at least 4 characters.")
    } else if (this.state.password !== this.state.confirm) {
      this.props.signUpError("The password hasn't been confirmed properly.")
    } else {
      this.props.signUp(this.state)
    }
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
        <Wrapper>
          <Label htmlFor="confirm">confirm</Label>
          <Input id="confirm" name="confirm" type="password" onChange={this.handleChange} required/>
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
  { signIn, signUp, cleanError, signUpError, changeLocation, changeLastLocation }
)(Login);
