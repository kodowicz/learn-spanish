import React, { useState } from "react";
import {
  Form,
  Wrapper,
  Label,
  Input,
  Button,
  colors
} from "../../assets/styles/GlobalStyles";

const SignUp = ({ signUp, setNotification }) => {
  const [login, setLogin] = useState({
    email: "",
    username: "",
    password: "",
    confirm: ""
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
    if (login.username.length < 4) {
      setNotification("Username should be at least 4 characters.");

    } else if (login.password !== login.confirm) {
      setNotification("The password hasn't been confirmed properly.");

    } else {
      signUp(login);
    }
  }

  return (
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
        <Label htmlFor="name">username</Label>
        <Input
          required
          id="username"
          name="name"
          type="text"
          autoComplete="username"
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
      <Wrapper>
        <Label htmlFor="confirm">confirm</Label>
        <Input
          required
          id="confirm"
          name="confirm"
          type="password"
          autoComplete="new-password"
          onChange={handleChange}
        />
      </Wrapper>

      <Button center="true">sign up</Button>
    </Form>
  );
};

export default SignUp;
