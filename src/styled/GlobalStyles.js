import styled, { createGlobalStyle  } from 'styled-components';
import { Link } from 'react-router-dom';

export const colors = {
  white: "#FFFFFF",
  navy: "#07167C",
  blue: "#2561EA",
  black: "#303030",
  gray: "#849197"
}
export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Open Sans', sans-serif;
    color: #303030;
    margin: 0;
    font-size: 16px;
  }
`
export const Main = styled.main`
  margin: 50px 12vw 0 12vw;
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
  padding: 0.5rem 3.3rem;
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
  padding: 0.5rem 2.2rem;
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
