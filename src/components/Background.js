import React from 'react';
import styled from 'styled-components';
import confetti from '../assets/images/confetti.svg';

const BGWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100vh;
  height: auto;
  background: linear-gradient(180deg, #6837FA 0%, #663CE2 100%);
  width: 100%;
  z-index: -1;
`;

const Confetti = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-image: ${props => `url(${props.svg})`};
`


const Background = (props) => (
  <BGWrapper>
    <Confetti svg={confetti}>
      { props.children }
    </Confetti>
  </BGWrapper>
);

export default Background
