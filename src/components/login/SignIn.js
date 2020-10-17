import React, { useState } from "react";
import {
  Form,
  Wrapper,
  Label,
  Input,
  Button,
  colors
} from "../../assets/styles/GlobalStyles";

const SignIn = ({ signIn }) => {
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

  return (
    <Form onSubmit={handleSubmit}>
      <Wrapper>
        <Label htmlFor="email">email</Label>
        <Input
          required
          id="email"
          name="email"
          type="email"
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
          onChange={handleChange}
        />
      </Wrapper>

      <Button color={colors.white} center="true">
        sign in
      </Button>
    </Form>
  );
};

export default SignIn;
