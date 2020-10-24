import React, { useState, useEffect } from "react";
import styled from "styled-components";

const GameTimer = ({ isStopped, finishGame }) => {
  const [time, setTime] = useState(5 * 60);
  let interval;
  const clock = timer(time);

  function timer(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return {
      minutes,
      seconds: seconds < 10 ? "0" + seconds : seconds
    };
  }

  useEffect(
    () => {
      if (!isStopped) {
        if (time > 0) {
          interval = window.setInterval(() => {
            setTime(time - 1);
          }, 1000);
        } else {
          window.setInterval(() => {
            finishGame(true);
          }, 1000);
        }
      }

      return () => window.clearInterval(interval);
    },
    [time, isStopped]
  );

  return (
    <Timer isVisible={isStopped}>
      {clock.minutes}
      :
      {clock.seconds}
    </Timer>
  );
};

const Timer = styled.span`
  visibility: ${({ isVisible }) => (isVisible ? `hidden` : `visible`)};
  position: absolute;
  top: 7.2rem;
  right: 7vw;

  @media (min-width: 768px) {
    right: 3rem;
  }
`;

export default GameTimer;
