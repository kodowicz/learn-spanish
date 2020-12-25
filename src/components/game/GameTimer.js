import React, { useState, useEffect } from "react";
import styled from "styled-components";

const GameTimer = ({ isStopped, isAnswered, isAnimated, finishGame }) => {
  const [time, setTime] = useState(5 * 60);
  const clock = timer(time);
  let interval;

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
      if (isAnimated && time === 0) {
        finishGame(true);
      }
      if (!isStopped) {
        if (time > 0) {
          interval = window.setInterval(() => {
            setTime(time - 1);
          }, 1000);
        }
      }

      return () => window.clearInterval(interval);
    },
    [time, isStopped, isAnimated]
  );

  return (
    <Timer isVisible={isStopped || isAnswered}>
      {clock.minutes}
      {":"}
      {clock.seconds}
    </Timer>
  );
};

const Timer = styled.span`
  visibility: ${ props => props.isVisible && "hidden" };
  position: fixed;
  top: 7.2rem;
  right: 7vw;

  @media (min-width: 768px) {
    right: 3rem;
  }
`;

export default GameTimer;
