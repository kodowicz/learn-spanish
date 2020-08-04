import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';



export const colors = {
  white: "#FFFFFF",
  navy: "#30066f",
  blue: "#6F40FC",
  bluish: "rgba(247, 244, 255, 20)",
  shadow: "rgba(66, 49, 119, 0.5)",
  azure: "#EFF3F7",
  black: "#303030",
  progress: "#A080FF",
  darkGray: "#B4AEC5",
  lightGray: "#EDE7FF",
  warming: "#F65D5D",
  navyBoxShadow: "rgba(7, 22, 124, 0.2)"
}

export const fonts = {
  semiBold: 500,
  bold: 600,
  family: `'Open Sans', sans-serif`
}


export const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
  }

  body {
    font-family: ${fonts.family};

    color: ${colors.white};
    margin: 0;
    font-size: 1.6rem;
    font-weight: ${fonts.semiBold};
    overflow-x: hidden;
  }

  *, *::before, *::after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  *::selection {
    background: ${colors.white};
    color: ${colors.blue}
  }

  *::-moz-selection {
    background: ${colors.white};
    color: ${colors.blue}
  }
`


export const Main = styled.main`
  padding: 85px 0;
  margin: 0 auto;
  width: ${props => `${props.width}vw`};
  max-width: ${props => `${props.maxWidth}px`};
`;

export const BlockElement = styled.div`
  border-radius: 15px;
  background: rgba(247, 244, 255, 0.2);
`

export const Title = styled.h1`
  text-align: center;
  color: ${colors.white};
  font-size: 1.8rem;
  font-weight: ${fonts.bold};
  margin: 0;
`;

export const Button = styled.button`
  margin: ${props => props.center ? '0 auto' : 0 };
  color: ${({ color }) => color || `${colors.white}`};
  border: 1px solid ${({ color }) => color || `${colors.white}`};
  font-family: ${fonts.family};
  display: block;
  width: 13rem;
  height: 4rem;
  text-align: center;
  font-size: 1.4rem;
  background: transparent;
  border-radius: 50px;
  transition: transform .2s;

  &:hover {
    color: ${({ color }) => color === '#F65D5D' ? `${colors.warming}` : `${colors.navy}`};
    background: ${colors.white};
  }

  &:focus {
    transform: translateY(2px);
  }
`;

const Anchor = styled(Link)`
  margin: ${props => props.center ? '0 auto' : 0 };
  color: ${({ color }) => color || `${colors.white}`};
  border: 1px solid ${({ color }) => color || `${colors.white}`};
  position: relative;
  display: block;
  width: 13rem;
  height: 4rem;
  text-decoration: none;
  font-size: 1.4rem;
  border-radius: 50px;
  transition: transform .2s;

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
`

export const LinkButton = (props) => (
  <Anchor
    to={props.to}
    center={props.center}
    color={props.color}
  >
    <AnchorWrapper>{props.children}</AnchorWrapper>
  </Anchor>
);

export const BasicInput = styled.input`
  background: none;
  border: none;
  box-sizing: border-box;
  font-size: 1.4rem;
  font-family: ${fonts.family};
`

/* login styles */
export const Form = styled.form`
  margin: 60px 0;
`;

export const Wrapper = styled.div`
  position: relative;
  border-radius: 30px;
  box-shadow: 0 10px 15px -5px ${colors.shadow};
  margin: 3.2rem 0;
`;

export const Label = styled.label`
  position: absolute;
  top: -2rem;
  left: 0;
  font-size: 1.2rem;
  color: ${colors.white}
`;

export const Input = styled(BasicInput)`
  color: ${colors.navy};
  background: ${colors.white};
  outline: none;
  border-radius: 30px;
  padding: 1rem 1.6rem;
  width: 100%;
`;
