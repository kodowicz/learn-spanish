import React, { useState, useRef } from "react";
import styled from "styled-components";

import { BasicInput, Button, colors } from "../../assets/styles/GlobalStyles";

const Password = ({
  notificationError,
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
      notificationError("The password must be 6 characters long or more.");
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
      <Dialog aria-labelledby="change-password" onSubmit={handleSubmit}>
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

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
`;

const Dialog = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 28rem;
  height: 30rem;
  padding: 0 3rem;
  background: ${colors.white};
  color: ${colors.navy};
  border-radius: 15px;
  box-shadow: 10px 10px 20px ${colors.shadow};
  transform: translate(-50%, -50%);
`;

const Alert = styled.p`
  font-size: 1.8rem;
  margin: 3.5rem 0;
  text-align: center;
`;

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
  border-radius: 20px;
`;

export default Password;
