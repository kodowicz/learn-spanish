import styled, { createGlobalStyle  } from 'styled-components';
import { Link } from 'react-router-dom';

export const colors = {
  white: "#FFFFFF",
  navy: "#07167C",
  blue: "#2561EA",
  black: "#303030",
  gray: "#849197",
  background: "#E6E6E6",
  warming: "#F65D5D",
  navyBoxShadow: "rgba(7, 22, 124, 0.2)"
}

export const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
  }

  body {
    font-family: 'Open Sans', sans-serif;
    color: ${colors.black};
    margin: 0;
    font-size: 1.6rem;
    height: 100vh;
    overflow-x: hidden
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
  margin: 80px 12vw 0 12vw;
`;

export const BlockShadow = styled.div`
  border-radius: 5px;
  box-shadow: 0 7px 15px -5px rgba(40, 60, 200, 0.25);
`

export const Title = styled.h1`
  text-align: center;
  color: ${colors.navy};
  font-size: 30px;
  font-weight: 700;
  margin: 0;
`;

export const Button = styled.button`
  display: block;
  margin: 0 auto;
  background: ${colors.white};
  padding: 1rem 3.3rem;
  color: ${colors.blue};
  border: 1px solid ${colors.blue};
  box-shadow: 0 5px 15px -5px rgba(7, 22, 124, 0.3);
  border-radius: 7px;
  transition: box-shadow .2s, transform .2s;
  font-size: 16px;
  font-family: 'Open Sans', sans-serif;

  &:hover {
    box-shadow: 0 5px 15px -5px rgba(7, 22, 124, 0.5);
  }

  &:focus {
    transform: translateY(2px);
    box-shadow: 0 5px 15px -5px rgba(7, 22, 124, 0.15);
  }
`;

export const LinkButton = styled(Link)`
  text-decoration: none;
  color: ${colors.blue};
  padding: 1rem 3rem;
  display: block;
  margin: 0 auto;
  width: max-content;
  border-radius: 7px;
  background: ${colors.white};
  border: 1px solid ${colors.blue};
  box-shadow: 0 5px 15px -5px rgba(7, 22, 124, 0.3);
  transition: box-shadow .2s, transform .2s;

  &:hover{
    box-shadow: 0 5px 15px -5px rgba(7, 22, 124, 0.5);
  }

  &:focus {
    transform: translateY(2px);
    box-shadow: 0 5px 15px -5px rgba(7, 22, 124, 0.15);
  }
`

export const BasicInput = styled.input`
  background: none;
  border: none;
  box-sizing: border-box;
  font-size: 16px;
  font-family: 'Open Sans', sans-serif;
  color: ${colors.black};
`
