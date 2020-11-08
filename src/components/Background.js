import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import confetti from "../assets/images/confetti.svg";

export const ContentWrapper = ({
  isScrolledToTop,
  contentHeight,
  setPageScroll,
  scrollToTop,
  children
}) => {
  const [isScrollable, setScrollable] = useState(false);
  const wrapperRef = useRef();

  useEffect(
    () => {
      const viewportHeight = window.innerHeight;
      setScrollable(contentHeight > viewportHeight);
    },
    [contentHeight]
  );

  useEffect(
    () => {
      if (isScrolledToTop) {
        const contentRef = wrapperRef.current.firstChild;
        contentRef.scrollIntoView();
        scrollToTop(false);
      }
    },
    [isScrolledToTop]
  );

  function handlePageScroll() {
    const contentRef = wrapperRef.current.firstChild;
    const pageScroll = contentRef.getBoundingClientRect().top;
    const isScrollTop = pageScroll === 0;

    setPageScroll(isScrollTop);
  }

  return (
    <Wrapper
      ref={wrapperRef}
      isScrollable={isScrollable}
      onScroll={handlePageScroll}
    >
      {children}
    </Wrapper>
  );
};

export const Content = props => {
  const contentRef = useRef(null);

  useEffect(() => {
    props.setContentHeight(contentRef.current.clientHeight);
  }, []);

  return (
    <Main ref={contentRef} {...props}>
      {props.children}
    </Main>
  );
};

export const Background = props => (
  <BGWrapper>
    <Confetti svg={confetti}>{props.children}</Confetti>
  </BGWrapper>
);

const Wrapper = styled.div`
  overflow-y: ${({ isScrollable }) => isScrollable && "scroll"};
  position: fixed;
  width: 100%;
  height: 100%;
`;

const Main = styled.main`
  width: ${props => `${props.width}vw`};
  max-width: ${props => `${props.maxWidth}px`};
  padding-top: 85px;
  margin: 0 auto;
  height: max-content;

  @media (min-width: 768px) {
    width: ${props => `${props.desktop}px`};
    max-width: none;
    padding-top: 100px;
  }
`;

const BGWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background: #663ce2;
  width: 100%;
  z-index: -2;
`;

const Confetti = styled.div`
  width: 100%;
  height: 100%;
  background-attachment: fixed;
  background-position: center;
  background-repeat: repeat;
  background-size: contain;
  background-image: ${({ svg }) => `url(${svg})`};
`;
