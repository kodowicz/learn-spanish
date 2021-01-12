import styled, { css, keyframes } from "styled-components";
import { colors } from "./GlobalStyles";
import { rgbHue } from "../../constants/mutualFunctions";

export const popIn = keyframes`
  from {
    opacity: 0;
    transform: scale3d(1, 1, 1);
  }

  20% {
    opacity: 1;
  }

  50% {
    transform: scale3d(1.15, 1.15, 1.15);
  }

  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
`;

export const moveBackards = transformStart => keyframes`
  from {
    transform: translate(${transformStart.left}px, ${transformStart.top}px) scale(0.6);
    opacity: 0;
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  50% {
    opacity: 0;
  }

  55% {
    opacity: 0.5;
  }

  80% {
    transform: translate(0, 0) scale(0.7);
    opacity: 0.7;
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

export const pulseShadow = keyframes`
  0% {
    box-shadow: 0 0 0 1rem ${rgbHue(colors.navy, 0.2)};
  }

  50% {
    box-shadow: 0 0 0 5rem ${rgbHue(colors.navy, 0.05)};
  }

  55% {
    box-shadow: 0 0 0 5rem ${rgbHue(colors.navy, 0)};
  }

  100% {
    box-shadow: 0 0 0 5rem ${rgbHue(colors.navy, 0)};
  }
`;

export const tapPulse = keyframes`
  0% {
    box-shadow: 0 0 0 1rem ${colors.tapShadow};
    background: ${colors.tapShadow};
  }

  100% {
    box-shadow: 0 0 0 2rem ${colors.tapShadow};
    background: ${colors.tapShadow};
  }
`;

export const pulse = keyframes`
  from {
    transform: scale3d(1, 1, 1);
  }

  50% {
    transform: scale3d(1.05, 1.05, 1.05);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
`;

export const shake = keyframes`
  0% {
    transform: translateX(0);
    opacity: 0.5;
  }

  25% {
    transform: translateX(3px);
  }

  50% {
    transform: translateX(-3px);
  }

  75% {
    transform: translateX(3px);
  }

  100% {
    transform: translateX(0);
    opacity: 1
  }
`;

export const moveForwards = (
  startOffsetLeft,
  startOffsetTop,
  offsetLeft,
  offsetTop
) => keyframes`
  from {
    transform: translate(${startOffsetLeft}px, ${startOffsetTop}px);
  }

  to {
    transform: translate(${offsetLeft}px, ${offsetTop}px);
  }
`;

export const prompt = keyframes`
  from {
    transform: translate(0px, 0px);
  }

  3% {
    transform: translate(-3px, 0px);
  }

  9% {
    transform: translate(3px, 0px);
  }

  12% {
    transform: translate(0px, 0px);
  }

  to {
    transform: translate(0px, 0px);
  }
`;

export const scale = keyframes`
  from {
    transform: scale(0.7);
  }

  70% {
    transform: scale(1.2);
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
`;

export const fadeUp = keyframes`
  from {
    color: transparent;
  }

  to {
    color: ${colors.white};
  }
`;

export const flipOut = keyframes`
  from {
    transform: perspective(40rem);
  }

  30% {
    transform: perspective(40rem) rotate3d(1, 0, 0, -20deg);
    opacity: 1;
  }

  to {
    transform: perspective(40rem) rotate3d(1, 0, 0, 40deg);
    opacity: 0;
  }
`;

export const flipIn = keyframes`
  from {
    opacity: 0;
    transform: perspective(40rem) rotate3d(1, 0, 0, 40deg);
  }

  30% {
    transform: perspective(40rem) rotate3d(1, 0, 0, -20deg);
    opacity: 1;
  }

  to {
    transform: perspective(40rem);
    opacity: 1;
  }
`;

export const blink = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

export const zoomInOut = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%,-50%) scale3d(1.3, 1.3, 1.3);
  }

  40% {
    opacity: 1;
    transform: translate(-50%, -50%) scale3d(1, 1, 1);
  }

  60% {
    transform: translate(-50%,-50%) scale3d(1, 1, 1);
  }

  80% {
    opacity: 1;
    transform: translate(-50%,-50%) scale3d(0.6, 0.6, 0.6);
  }

  to {
    opacity: 0;
    transform: translate(-50%,-50%) scale3d(1, 1, 1);
  }
`;

export const fadeInOut = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale3d(0.6, 0.6, 0.6);
  }

  15% {
    opacity: 1;
    transform: translate(-50%, -50%) scale3d(1, 1, 1);
  }

  70% {
    opacity: 1;
    transform: translate(-50%, -50%) scale3d(1, 1, 1);
  }

  85% {
    opacity: 0;
    transform: translate(-50%, -50%) scale3d(0.8, 0.8, 0.8)
  }

  to {
    opacity: 0;
  }
`;

export const shuffle = transform => keyframes`
  0% {
   z-index: 5
  }

  50% {
    transform: translate(-20rem, ${transform.y}px) rotate(-15deg);
  }

  55% {
    z-index: 3;
  }

  100% {
    transform: rotate(0deg);
    z-index: 3;
  }
`;

export const throwOut = keyframes`
  0% {
    opacity: 1
  }

  30% {
    opacity: 0.5
  }

  50% {
    transform: translateX(30rem) rotate(15deg);
    opacity: 0.5
  }

  100% {
    transform: translateX(30rem) rotate(15deg);
    opacity: 0
  }
`;
