import React from 'react';
import Menu from './Menu';
import Navigation from './Navigation';
import HomeNavigator from './HomeNavigator';

import styled from 'styled-components';
import Background from '../Background';

const Navbar = ({
  uid,
  isMobile,
  isOpen,
  location,
  goBack,
  handleMenu,
  cancelSesion,
  chooseMethod,
  askForDeleting,
  deleteSetChanges,
  closeChangePassword
}) => {

  const isVisible = isMobile ? isOpen : false;

  return (
    <>
      { location &&
        <Nav isVisible={isVisible}>
          { isVisible &&
            <BackgroundWrapper>
              <Background />
            </BackgroundWrapper>
          }

          <Navigation
            isMobile={isMobile}
            isOpen={isOpen}
            location={location}
            goBack={goBack}
            handleMenu={handleMenu}
            cancelSesion={cancelSesion}
            chooseMethod={chooseMethod}
            askForDeleting={askForDeleting}
            deleteSetChanges={deleteSetChanges}
            closeChangePassword={closeChangePassword}
          />

          { isOpen &&
            <Menu
              uid={uid}
              handleMenu={handleMenu}
              chooseMethod={chooseMethod}
              askForDeleting={askForDeleting}
            />
          }

          { !isOpen &&
            <HomeNavigator />
          }
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
