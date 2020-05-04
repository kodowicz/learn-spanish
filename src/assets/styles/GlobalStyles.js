import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';



export const colors = {
  white: "#FFFFFF",
  navy: "#21066F",
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
    height: 100vh;
    overflow-x: hidden;
  }

  *, *::before, *::after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    height: 100%
  }
`


export const Main = styled.main`
  padding: 85px 10vw;
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
    color: ${colors.blue};
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
  color: ${colors.black};
`
