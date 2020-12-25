import React, { useState, useRef } from "react";
import styled from "styled-components";
import {
  Background,
  Dialog,
  Alert,
  BasicInput,
  Button,
  colors
} from "../../assets/styles/GlobalStyles";

const Password = ({
  setNotification,
  changePassword,
  openPasswordOverlay
}) => {
  const backgroundRef = useRef();
  const [login, setLogin] = useState({
    password: "",
    newpassword: ""
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

    if (login.newpassword.length < 6) {
      setNotification("The password must be 6 characters long or more.");
    } else {
      changePassword(login);
    }
  }

  function handleCancel(event) {
    if (event.target === backgroundRef.current) {
      openPasswordOverlay(false);
    }
  }

  return (
    <Background ref={backgroundRef} onClick={handleCancel}>
      <Dialog height="30" aria-labelledby="change-password" onSubmit={handleSubmit}>
        <Alert id="change-password">Change your password</Alert>

        <Wrapper>
          <Label htmlFor="password" isHidden={login.password}>
            old password
          </Label>
          <Input
            required
            id="password"
            type="password"
            onChange={handleChange}
          />
        </Wrapper>

        <Wrapper>
          <Label htmlFor="newpassword" isHidden={login.newpassword}>
            new password
          </Label>
          <Input
            required
            id="newpassword"
            type="password"
            onChange={handleChange}
          />
        </Wrapper>

        <Button color={colors.navy} center="true" type="submit">
          change
        </Button>
      </Dialog>
    </Background>
  );
};

const Wrapper = styled.div`
  position: relative;
  margin: 2rem 0;
`;

const Label = styled.label`
  display: ${props => props.isHidden && "none"};
  color: ${colors.darkGray};
  position: absolute;
  top: 1rem;
  left: 1.6rem;
  font-size: 1.2rem;
`;

const Input = styled(BasicInput)`
  background: ${colors.lightGray};
  color: ${colors.navy};
  width: 100%;
  margin: 0 auto;
  display: block;
  padding: 0.8rem 1.6rem;
  border-radius: 2rem;
`;

export default Password;
