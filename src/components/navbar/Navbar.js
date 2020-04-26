import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import StopLearningOverlay from '../overlay/StopLearningOverlay';

import styled from 'styled-components';
import menu from '../../assets/images/menu.svg';
import back from '../../assets/images/back.svg';


const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  height: 60px;
  padding: 0 7vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  background: white;
`;

const BackButton = styled.button`
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  padding: 0;
  visibility: ${props =>
    props.visible ? "visible" : "hidden"
  }
`;

const Button = styled(Link)`
  width: 24px;
  height: 24px;
  text-decoration: none;
  visibility: ${props =>
    props.visible ?
      "visible" :
      "hidden"
  }
`;

const Title = styled.p`
  text-transform: uppercase;
  font-weight: 600;
  font-size: 18px;
  margin: 0
`


class Navbar extends Component {
  render() {
    const { uid, location, goBack } = this.props;
    // if /learn/${numbers} => ask about ending learning set by overlay <StopLearningOverlay />
    // if /play/${numbers} => ask about ending learning set by overlay <StopLearningOverlay />
    // if /create/ => menu is a submit button
    return (
      <>
        { location &&
          <Nav>
            <BackButton
              tabIndex="2"
              visible={location === "home" ? 0 : 1}
              onClick={() => goBack()}
            >
              <img src={back} alt="go back" />
            </BackButton>

            <Title> { location }</Title>

            <Button
              tabIndex="2"
              visible={1}
              to={ uid ?
                `/profile/${uid}` :
                "/signup"
              }>
              <img src={menu} alt="menu" />
            </Button>
          </Nav>
        }
      </>
    );
  }
}

export default Navbar;
