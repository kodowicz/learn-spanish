import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import styled from "styled-components";
import back from "../../assets/images/back.svg";
import menu from "../../assets/images/menu.svg";

const Navigation = ({
  isMobile,
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
  closeChangePassword
}) => {
  let history = useHistory();

  function handleBackButton() {
    handleMenu(false);

    if (location === "learn") {
      cancelSesion(true);

    } else if (location === "profile") {
      closeChangePassword(false);
      if (isLogged) {
        // to prevent going back to signin page
        history.replace("/");
      } else {
        goBack();
      }

    } else if (location === "set") {
      chooseMethod(false);
      if (lastLocation === "set") {
        history.replace("/");
      } else {
        goBack();
      }

    } else if (location === "create") {
      askForDeleting(false);
      goBack();

    } else if (location === "edit") {
      deleteSetChanges();
      askForDeleting(false);
      goBack();

    } else {
      goBack();
    }
  }

  function handleMenuButton() {
    handleMenu(!isOpen);
  }

  return (
    <Nav>
      <Button
        tabIndex="2"
        visible={location === "home" ? 0 : 1}
        onClick={handleBackButton}
      >
        <img src={back} alt="go back" />
      </Button>

      <Title>{location}</Title>

      { isMobile && (
        <Button tabIndex="3" visible={true} onClick={handleMenuButton}>
          <img src={menu} alt="open menu" />
        </Button>
      )}
    </Nav>
  );
};

const Nav = styled.div`
  position: relative;
  height: 6rem;
  padding: 0 7vw;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 768px) {
    padding: 0;
  }
`;

const Button = styled.button`
  visibility: ${ props => !props.visible && "hidden" };
  width: 2.4rem;
  height: 2.4rem;
  background: none;
  border: none;
  box-sizing: content-box;
  padding: 0;
`;

const Title = styled.span`
  position: fixed;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  text-transform: uppercase;
  font-weight: 600;
  font-size: 1.8rem;
  margin: 0;
`;

export default Navigation;
