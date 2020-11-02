import React, { useEffect } from "react";
import styled from "styled-components";
import { colors } from "../../assets/styles/GlobalStyles";

const Notification = ({
  message,
  removeNotification,
  removeLogoutNotification
}) => {
  useEffect(
    () => {
      setTimeout(() => {
        if (message) {
          message === "logout"
            ? removeLogoutNotification()
            : removeNotification();
        }
      }, 3000);
    },
    [message]
  );

  return (
    <Wrapper>
      <Message>{message}</Message>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 3.5em;
  left: 50%;
  width: 80vw;
  max-width: 300px;
  background: white;
  border-radius: 10px;
  transform: translateX(-50%);
  z-index: 3;

  @media (min-width: 768px) {
    max-width: 400px;
    font-size: 1.6rem
  }
`;

const Message = styled.p`
  color: ${colors.blue};
  text-align: center;
  margin: 1.6rem;
`;

export default Notification;
