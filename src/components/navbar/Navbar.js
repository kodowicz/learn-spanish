import React, { useEffect, useState, useRef } from "react";
import Menu from "./Menu";
import Navigation from "./Navigation";
import Scroller from "./Scroller";
import { Wrapper } from "../Background";

import styled from "styled-components";
import { Background } from "../Background";

const Navbar = ({
  uid,
  isPageScrollable,
  isOpen,
  isScrollTop,
  isLogged,
  location,
  lastLocation,
  goBack,
  handleMenu,
  scrollToTop,
  cancelSesion,
  chooseMethod,
  askForDeleting,
  deleteSetChanges,
  closeChangePassword,
  createBasicTerms
}) => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    const isMenuVisible = isMobile ? isOpen : true;
    const isMenuOpen = isMobile ? isMenuVisible : false;

    setMenuVisible(isMenuVisible);
    setMenuOpen(isMenuOpen);

    window.addEventListener("resize", handleResize);
  });

  function handleResize() {
    const isMobile = window.innerWidth < 768;
    const isMenuVisible = isMobile ? isOpen : true;
    const isMenuOpen = isMobile ? isMenuVisible : false;

    setMenuVisible(isMenuVisible);
    setMenuOpen(isMenuOpen);
  }

  return (
    <>
      {location && (
        <Nav isVisible={isMenuOpen}>
          {isOpen && (
            <BackgroundWrapper>
              <Background />
            </BackgroundWrapper>
          )}

          <Navigation
            isMobile={isMobile}
            isOpen={isOpen}
            isLogged={isLogged}
            location={location}
            lastLocation={lastLocation}
            goBack={goBack}
            handleMenu={handleMenu}
            cancelSesion={cancelSesion}
            chooseMethod={chooseMethod}
            askForDeleting={askForDeleting}
            deleteSetChanges={deleteSetChanges}
            closeChangePassword={closeChangePassword}
          />

          {(isOpen || isMenuVisible) && (
            <Menu
              uid={uid}
              handleMenu={handleMenu}
              chooseMethod={chooseMethod}
              askForDeleting={askForDeleting}
              createBasicTerms={createBasicTerms}
            />
          )}

          {!isMenuOpen &&
            isPageScrollable &&
            !isScrollTop && <Scroller scrollToTop={scrollToTop} />}
        </Nav>
      )}
    </>
  );
};

const Nav = styled.nav`
  height: ${({ isVisible }) => (isVisible ? "100vh" : "6rem")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 4;

  @media (min-width: 768px) {
    padding: 0 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const BackgroundWrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  height: 100vh;
  background: rgba(16, 6, 54, 0.6);
`;

export default Navbar;
