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


class SignIn extends Component {
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

export default SignIn
