import React, { Component } from 'react';
import { Form, Wrapper, Label, Input, Button, colors } from '../../assets/styles/GlobalStyles';


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
    const { signUp, signUpError } = this.props;
    const { username, password, confirm } = this.state;

    event.preventDefault();
    if (username.length < 4) {
      signUpError("Username should be at least 4 characters.")
    } else if (password !== confirm) {
      signUpError("The password hasn't been confirmed properly.")
    } else {
      signUp(this.state)
    }
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>

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

        <Button
          color={colors.white}
          center="true"
        >
          sign up
        </Button>

      </Form>
    )
  }
}


export default SignUp
