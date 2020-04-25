import React from 'react';
import styled from 'styled-components';


const BGWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  background: linear-gradient(180deg, #6837FA 0%, #663CE2 100%);
  width: 100%;
  z-index: -1;
`;

const Background = () => <BGWrapper />;

export default Background
