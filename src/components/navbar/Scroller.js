import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import home from "../../assets/images/home.png";

const Scroller = ({ scrollToTop }) => (
  <Button onClick={() => scrollToTop(true)}>
    <Img src={home} alt=" " />
  </Button>
);

const Button = styled.button`
  position: fixed;
  bottom: 3rem;
  right: 3rem;
  width: 4rem;
  height: 4rem;
  border-radius: 1rem;
  background: none;
  border: none;
  margin: 0;
  padding: 0;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

export default Scroller;
