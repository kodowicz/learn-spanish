import React from 'react';
import Menu from './Menu';
import Navigation from './Navigation';

import styled from 'styled-components';
import { colors } from '../../assets/styles/GlobalStyles';

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

  return (
    <>
      { location &&
        <Nav isOpen={isMobile ? isOpen : false}>

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

        </Nav>
      }
    </>
  );
}


const Nav = styled.nav`
  height: ${({ isOpen }) => isOpen ? '100vh' : '6rem'};
  background: ${({ isOpen }) => isOpen && colors.navy };
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

export default Navbar;
