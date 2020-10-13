import React from 'react';

import styled from 'styled-components';
import { BasicInput, Button, colors } from '../../assets/styles/GlobalStyles';


class Password extends React.Component {
  state = {
    password: "",
    newpassword: ""
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = (event) => {
    const { newpassword } = this.state;
    const { notificationError, changePassword } = this.props;
    event.preventDefault();

    if (newpassword.length < 6) {
      notificationError("The password must be 6 characters long or more.")
    } else {
      changePassword(this.state);
    }
  }

  render() {
    const { password, newpassword } = this.state;

    return (
      <Background>

        <Dialog aria-labelledby="change-password" onSubmit={this.handleSubmit}>
          <Alert id="change-password">Change your password</Alert>

          <Wrapper>
            <Label htmlFor="password" isHidden={password}>password</Label>
            <Input
              id="password"
              type="password"
              required
              onChange={this.handleChange}
            />
          </Wrapper>

          <Wrapper>
            <Label htmlFor="newpassword" isHidden={newpassword}>new password</Label>
            <Input
              id="newpassword"
              type="password"
              required
              onChange={this.handleChange}
            />
          </Wrapper>

          <Button
            color={colors.navy}
            center="true"
            type="submit"
            onClick={this.handleDecline}
          >
            change
          </Button>
        </Dialog>
      </Background>
    );
  }
}


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
  display: ${props => props.isHidden && 'none'};
  color: ${colors.darkGray};
  position: absolute;
  top: 0.9rem;
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

export default Password
