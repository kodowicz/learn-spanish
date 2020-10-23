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
        if (time >= 0) {
          interval = setInterval(() => {
            setTime(time - 1);
          }, 1000);
        } else {
          finishGame(true);
        }
      }

      return () => clearInterval(interval);
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
  position: sticky;
  top: 7.2rem;
  left: calc(100vw - 15vw);
  width: 5rem;
`;

export default GameTimer;
