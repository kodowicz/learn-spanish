import React, { useEffect } from "react";
import styled from "styled-components";
import { colors } from "../../assets/styles/GlobalStyles";

const Notification = ({
  message,
  cleanNotification
}) => {
  useEffect(
    () => {
      setTimeout(() => {
        cleanNotification();
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
  background: ${colors.white};
  position: fixed;
  top: 3.5em;
  left: 50%;
  width: 80vw;
  max-width: 30rem;
  border-radius: 1rem;
  transform: translateX(-50%);
  z-index: 3;

  @media (min-width: 768px) {
    max-width: 40rem;
    font-size: 1.6rem;
  }
`;

const Message = styled.p`
  color: ${colors.navy};
  text-align: center;
  margin: 1.6rem;
`;

export default Notification;
