import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUp, signIn } from '../../store/actions/authActions';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  state = { toggle: true }

  handleClick = (toggle) => {
    this.setState({
      toggle: toggle
    })
  }

  render() {
    const { auth, signIn, signUp } = this.props;
    if (auth.uid) return <Redirect to={`/profile/${auth.uid}`} />;

    return (
      <Main>
        <SwitchWrapper>
          <Switch onClick={() => this.handleClick(true)}>sign in</Switch>
          <Switch onClick={() => this.handleClick(false)}>sign up</Switch>
          <Border toggle={this.state.toggle} />
        </SwitchWrapper>

          { this.state.toggle ?
            <SignInForm auth={ auth } signIn={ signIn } /> :
            <SignUpForm auth={ auth } signUp={ signUp } />
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
    this.props.signIn(this.state)
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
    confirm: ""
  }

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
          <Label htmlFor="password">confirm</Label>
          <Input id="confirm" name="password" type="password" onChange={this.handleChange} required/>
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

export default connect(mapStateToProps, { signIn, signUp })(Login);
