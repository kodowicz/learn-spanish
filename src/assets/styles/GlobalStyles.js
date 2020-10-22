import React from "react";
import styled, { css, createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";

export const colors = {
  white: "#FFFFFF",
  navy: "#372454",
  blue: "#6F40FC",
  bluish: "rgba(247, 244, 255, 0.25)",
  shadow: "rgba(66, 49, 119, 0.5)",
  azure: "#EFF3F7",
  black: "#303030",
  progress: "#A080FF",
  darkGray: "#BDA7FF",
  lightGray: "#EDE7FF",
  warming: "#F65D5D",
  navyBoxShadow: "rgba(7, 22, 124, 0.2)"
};

export const fonts = {
  semiBold: 500,
  bold: 600,
  family: "'Open Sans', sans-serif"
};

export const GlobalStyle = createGlobalStyle`
  html {
    font-size: 8px;
    scroll-behavior: smooth;

    @media (min-width: 350px) {
      font-size: 10px;
    }
  }

  body {
    font-family: ${fonts.family};
    color: ${colors.white};
    font-weight: ${fonts.semiBold};
    margin: 0;
    font-size: 1.6rem;
    overflow-x: hidden;
    cursor: pointer;

    &::-webkit-scrollbar {
      width: 0.4em;
    }

    &::-webkit-scrollbar-track {
      background: ${colors.darkGray};
    }

    &::-webkit-scrollbar-thumb {
      background: ${colors.white};
      border-radius: 5px;
    }

    * {
      user-select: none;
    }

    *, *::before, *::after {
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
    }

    @media (min-width: 768px) {
      font-size: 1.8rem;
    }
  }

  * {
    scrollbar-color: ${colors.white} ${colors.darkGray};
    scrollbar-width: thin;
  }

  *::selection {
    background: ${colors.white};
    color: ${colors.blue};
  }

  *::-moz-selection {
    background: ${colors.white};
    color: ${colors.blue};
  }
`;

export const Main = styled.main`
  width: ${props => `${props.width}vw`};
  max-width: ${props => `${props.maxWidth}px`};
  padding-top: 85px;
  margin: 0 auto;

  @media (min-width: 768px) {
    width: ${props => `${props.desktop}px`};
    max-width: none;
    padding-top: 100px;
  }
`;

export const BlockElement = styled.div`
  background: ${colors.bluish};
  border-radius: 15px;
`;

const mutualButton = {
  display: "block",
  width: "13rem",
  height: "4rem",
  fontSize: "1.4rem",
  borderRadius: "50px",
  transition: "transform 0.2s"
};

export const Button = styled.button`
  ${css({
    ...mutualButton
  })};
  margin: ${props => (props.center ? "0 auto" : 0)};
  color: ${({ color }) => color || `${colors.white}`};
  border: 1px solid ${({ color }) => color || `${colors.white}`};
  font-family: ${fonts.family};
  text-align: center;
  background: transparent;
  cursor: pointer;

  &:focus {
    transform: translateY(2px);
  }
`;

const Anchor = styled(Link)`
  ${css({
    ...mutualButton
  })};
  margin: ${props => (props.center ? "0 auto" : 0)};
  color: ${({ color }) => color || `${colors.white}`};
  border: 1px solid ${({ color }) => color || `${colors.white}`};
  position: relative;
  text-decoration: none;

  &:hover {
    color: ${colors.blue};
    background: ${colors.white};
  }

  &:focus {
    transform: translateY(2px);
  }
`;

const AnchorWrapper = styled.span`
  width: max-content;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const LinkButton = props => (
  <Anchor to={props.to} center={props.center} color={props.color}>
    <AnchorWrapper>{props.children}</AnchorWrapper>
  </Anchor>
);

export const BasicInput = styled.input`
  font-family: ${fonts.family};
  background: none;
  border: none;
  box-sizing: border-box;
  font-size: 1.6rem;
  user-select: text;

  &::placeholder {
    color: ${colors.darkGray};
  }
`;

/* login styles */
export const Form = styled.form`
  margin: 6rem 0 0 0;
`;

export const Wrapper = styled.div`
  box-shadow: 0 10px 15px -5px ${colors.shadow};
  position: relative;
  border-radius: 3rem;
  margin: 3.5rem 0;
`;

export const Label = styled.label`
  color: ${colors.white};
  position: absolute;
  top: -2.2rem;
  left: 0;
  font-size: 1.4rem;
  cursor: pointer;
`;

export const Input = styled(BasicInput)`
  color: ${colors.navy};
  background: ${colors.white};
  outline: none;
  border-radius: 30px;
  padding: 1rem 1.8rem;
  width: 100%;
`;
