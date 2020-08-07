import React, { useRef } from 'react';

import styled from 'styled-components';
import back from '../../assets/images/back.svg';
import menu from '../../assets/images/menu.svg';


const Navigation = ({
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

  const titleRef = useRef(0);

  const handleBackButton = () => {
    handleMenu(false);

    if (location === 'learn') {
      cancelSesion(true);

    } else if (location === 'profile') {
      // if password opened {
      //   closeChangePassword(false)
      // } else {
      //   goBack()
      // }
      closeChangePassword(false);
      goBack();

    } else if (location === 'set') {
      chooseMethod(false);
      goBack();

    } else if (location === 'create') {
      askForDeleting(false);
      goBack();

    } else if (location === 'edit') {
      deleteSetChanges();
      askForDeleting(false);
      goBack();

    } else {
      goBack();
    }
  }

  const handleMenuButton = () => {
    handleMenu(!isOpen)
  }

  return (
    <Nav width={titleRef.current.offsetWidth}>
      <Button
        tabIndex='2'
        visible={location === 'home' ? 0 : 1}
        onClick={handleBackButton}>
        <img src={back} alt='go back' />
      </Button>

      <Title ref={titleRef}>{ location }</Title>

      { isMobile &&
        <Button
          tabIndex='3'
          visible={true}
          onClick={handleMenuButton}>
          <img src={menu} alt='open menu' />
        </Button>
      }
    </Nav>
  )
}


const Nav = styled.div`
  position: relative;
  height: 6rem;
  padding: 0 7vw;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 768px) {
    width: ${({ width }) => `calc(50% + ${width/2}px)`};
    padding: 0;
  }
`;

const Button = styled.button`
  visibility: ${props =>
    props.visible ? "visible" : "hidden"
  };
  width: 2.4rem;
  height: 2.4rem;
  background: none;
  border: none;
  box-sizing: content-box;
  padding: 0;
`;

const Title = styled.p`
  text-transform: uppercase;
  font-weight: 600;
  font-size: 1.8rem;
  margin: 0;
`;

export default Navigation