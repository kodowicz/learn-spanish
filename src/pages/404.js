import React from 'react';
import styled from 'styled-components';
import { colors, fonts } from '../assets/styles/GlobalStyles';


const NotFoundPage = () => (
  <>
    <Wrapper>
      <Header>Oooops...</Header>
      <Statement>We haven’t found any words to learn right here.</Statement>
    </Wrapper>
    <Background>404</Background>
  </>
);

const Wrapper = styled.div`
  padding: 20vh 15vw 0 15vw;
  position: relative;
  z-index: 2;

  @media (min-width: 768px) {
    padding-top: 50px;
    text-align: center;
  }
`;

const Header = styled.h1`
  font-size: 3rem;

  @media (min-width: 768px) {
    font-size: 5rem;
    margin: 2rem
  }
`;

const Statement = styled.p`
  @media (min-width: 768px) {
    font-size: 2.2rem;
  }
`;

const Background = styled.span`
  font-weight: ${fonts.bold};
  color: ${colors.blue};
  font-size: 17rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (min-width: 768px) {
    font-size: 40rem;
  }
`;


export default NotFoundPage
