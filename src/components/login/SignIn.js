import React, { useState } from "react";
import {
  Form,
  Wrapper,
  Label,
  Input,
  Button,
  colors
} from "../../assets/styles/GlobalStyles";

const SignIn = ({ signIn, guestLogin }) => {
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  function handleChange(event) {
    const { id, value } = event.target;
    setLogin(state => ({
      ...state,
      [id]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    signIn(login);
  }

  function handleLoginGuest() {
    guestLogin()
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Wrapper>
          <Label htmlFor="email">email</Label>
          <Input
            required
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            onChange={handleChange}
          />
        </Wrapper>
        <Wrapper>
          <Label htmlFor="password">password</Label>
          <Input
            required
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            onChange={handleChange}
          />
        </Wrapper>

        <Button center="true">sign in</Button>
      </Form>
      <Button center="true" onClick={handleLoginGuest}>as guest</Button>
    </>
  );
};

export default SignIn;
