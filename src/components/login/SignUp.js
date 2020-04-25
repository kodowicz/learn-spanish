import React, { Component } from 'react';
import { Main, Button, BasicInput, colors } from '../../assets/styles/GlobalStyles';
import styled from 'styled-components';


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



class SignUp extends Component {
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

export default SignUp
