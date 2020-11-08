import React from "react";
import styled, { css, createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";
import sort from "../images/sort.svg";

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
    position: fixed;
    touch-action: manipulation;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

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

  #root {
    position: fixed;
    height: 100%;
  }

  *::-webkit-scrollbar {
    width: 0.4em;
  }

  *::-webkit-scrollbar-track {
    background: ${colors.darkGray};
  }

  *::-webkit-scrollbar-thumb {
    background: ${colors.white};
    border-radius: 5px;
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

export const BlockElement = styled.div`
  background: ${colors.bluish};
  border-radius: 15px;
`;

const mutualButton = {
  fontFamily: fonts.family,
  display: "block",
  width: "13rem",
  height: "4rem",
  fontSize: "1.4rem",
  borderRadius: "50px",
  transition: "transform 0.2s",
  cursor: "pointer"
};

export const Button = styled.button`
  ${css({
    ...mutualButton
  })};
  margin: ${props => (props.center ? "0 auto" : 0)};
  color: ${({ color }) => color || `${colors.white}`};
  border: 1px solid ${({ color }) => color || `${colors.white}`};
  text-align: center;
  background: transparent;

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

const SortButton = styled.button`
  ${css({
    ...mutualButton
  })};

  color: ${colors.white};
  display: flex;
  align-items: center;
  height: min-content;
  width: max-content;
  background: none;
  border: none;
  padding: 0;
`;

const SortImg = styled.img`
  width: 2rem;
  height: 2rem;
  padding-left: 3px;
`;

export const Switcher = props => (
  <SortButton onClick={props.handleSwitch}>
    <span>{props.sortedBy}</span>
    <SortImg src={sort} alt="" />
  </SortButton>
);

const mutualInputs = {
  fontFamily: fonts.family,
  background: "none",
  border: "none",
  outline: "none",
  overflow: "hidden",
  height: "auto",
  resize: "none",
  userSelect: "text"
};

export const BasicInput = styled.input`
  ${css({
    ...mutualInputs
  })};
  font-size: 1.6rem;

  &::placeholder {
    color: ${colors.darkGray};
  }
`;

export const BasicTextArea = styled.textarea`
  ${css({
    ...mutualInputs
  })};
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
  border-radius: 30px;
  padding: 1rem 1.8rem;
  width: 100%;
`;

/* overlay styles */
export const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
`;

export const Dialog = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 25rem;
  height: 30rem;
  background: ${colors.white};
  color: ${colors.navy};
  border-radius: 15px;
  box-shadow: 10px 10px 20px ${colors.shadow};
  transform: translate(-50%, -50%);
  padding: 2rem;
`;

export const Alert = styled.p`
  font-size: 1.8rem;
  margin: 2.5rem 0 3.5rem;
  text-align: center;
`;

export const Buttons = styled.div`
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
