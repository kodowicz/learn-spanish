import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { tapPulse } from "../assets/styles/GlobalKeyframes";

const Behavior = () => {
  const [isTapped, setIsTapped] = useState(false);
  const [position, setPosition] = useState({
    top: 0,
    left: 0
  });

  useEffect(() => {
    // Disable bouncing scroll on iOS
    document.addEventListener(
      "touchmove",
      event => {
        if (window.location.pathname.match(/(learn|play)/g))
          event.preventDefault();
      },
      { passive: false }
    );

    // Prevent zoom on iOS when double tapping
    Array.from(document.querySelector("*")).forEach(el =>
      el.addEventListener("click", event => event.preventDefault())
    );

    document.addEventListener("click", function(event) {
      setPosition({
        top: event.pageY,
        left: event.pageX
      });
      setIsTapped(true);
    });
  }, []);

  function handleAnimation() {
    setIsTapped(false);
  }

  return (
    <TapShadow
      isTapped={isTapped}
      top={position.top}
      left={position.left}
      onAnimationEnd={handleAnimation}
    />
  );
};

const TapShadow = styled.div`
  ${({ top, left, isTapped }) =>
    isTapped
      ? css`
          animation: ${tapPulse} 0.3s;
          top: ${top - 10}px;
          left: ${left - 10}px;
        `
      : css`
          animation: none;
        `};
  animation-timing-function: ease-out;
  position: absolute;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
`;

export default Behavior;
