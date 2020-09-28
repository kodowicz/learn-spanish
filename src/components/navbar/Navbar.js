import React, { useEffect, useState, useRef } from 'react'
import Menu from './Menu';
import Navigation from './Navigation';
import Scroller from './Scroller';

import styled from 'styled-components';
import Background from '../Background';


const Navbar = ({
  uid,
  isPageLonger,
  isOpen,
  isLogged,
  location,
  lastLocation,
  goBack,
  handleMenu,
  cancelSesion,
  chooseMethod,
  askForDeleting,
  deleteSetChanges,
  closeChangePassword,
  createBasicTerms
}) => {

  const [isScrollTop, setScrolled] = useState();
  const [isMobile, setMobile] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isScrollVisible, setScrollVisible] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const isMenuVisible = isMobile ? isOpen : true;
    const isScrollTop = window.scrollY <= 0 ? true : false;
    const isMenuOpen = isMobile ? isMenuVisible : false;
    const locationRegex = /(learn)/;
    const isScrollVisible = !locationRegex.test(location);

    setMobile(isMobile);
    setMenuVisible(isMenuVisible);
    setScrolled(isScrollTop);
    setMenuOpen(isMenuOpen);
    setScrollVisible(isScrollVisible);

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
  })

  const handleResize = () => {
    const isMobile = window.innerWidth < 768;
    const isMenuVisible = isMobile ? isOpen : true;
    const isMenuOpen = isMobile ? isMenuVisible : false;

    setMobile(isMobile);
    setMenuVisible(isMenuVisible);
    setMenuOpen(isMenuOpen);
  };
  
  const handleScroll = () => {
    const isScrollTop = window.scrollY <= 0 ? true : false;
    setScrolled(isScrollTop);
  };

  return (
    <>
      { location &&
        <Nav isVisible={isMenuOpen}>
          { isOpen &&
            <BackgroundWrapper>
              <Background />
            </BackgroundWrapper>
          }

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

          { (isOpen || isMenuVisible) &&
            <Menu
              uid={uid}
              handleMenu={handleMenu}
              chooseMethod={chooseMethod}
              askForDeleting={askForDeleting}
              createBasicTerms={createBasicTerms}
            />
          }

          {(!isMenuOpen && isPageLonger && !isScrollTop && isScrollVisible) && <Scroller />}
        </Nav>
      }
    </>
  );
}


const Nav = styled.nav`
  height: ${({ isVisible }) => isVisible ? '100vh' : '6rem'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 4;

  @media (min-width: 768px) {
    padding: 0 30px;
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
  background: rgba(16, 6, 54, 0.6)
`

export default Navbar;
