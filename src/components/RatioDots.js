import React, { Component } from 'react';
import styled from 'styled-components';
import { colors } from '../assets/styles/GlobalStyles';


const Knowledge = ({ ratio }) => {
  const dots = Array(5).fill(false).fill(true, 0, ratio);

  return (
    <Dots>
      { dots.map((dot, index) =>
        <Dot key={index} isFilled={dot} />
      )}
    </Dots>
  )
};


const Dots = styled.div`
  width: 5rem;
  display: flex;
  justify-content: space-between;

  @media (min-width: 768px) {
    width: 6rem
  }
`;

const Dot = styled.div`
  background: ${({ isFilled }) =>
    isFilled ? `${colors.white}` : `${colors.darkGray}`
  };
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 1rem;
`;

export default Knowledge
