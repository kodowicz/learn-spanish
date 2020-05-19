import React, { Component } from 'react';
import { Form, Wrapper, Label, Input, Button, colors } from '../../assets/styles/GlobalStyles';


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

        <Wrapper>
          <Label htmlFor="email">email</Label>
          <Input id="email" name="email" type="email" onChange={this.handleChange} required/>
        </Wrapper>
        <Wrapper>
          <Label htmlFor="password">password</Label>
          <Input id="password" name="password" type="password" onChange={this.handleChange} required/>
        </Wrapper>

        <Button
          color={colors.white}
          center="true"
        >
          sign in
        </Button>
      </Form>
    );
  }
}


export default SignIn
