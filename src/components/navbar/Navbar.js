import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

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
    const { location } = this.props;
    // if /learn/${numbers} => back button looks like "x", show 12/156 and nav provides to settings
    // if /create/ => menu is a submit button
    return (
      <Nav>
        <BackButton
          tabIndex="2"
          visible={location === "home" ? 0 : 1}
          onClick={() => this.props.history.goBack()}
        >
          <img src={back} alt="go back" />
        </BackButton>
        {/* <Button
          to={lastLocation}
          visible={location === "home" ? 0 : 1}>
          <img src={back} />
        </Button> */}

        <Title> { this.props.location }</Title>

        <Button
          tabIndex="2"
          visible={1}
          to={ this.props.auth.uid ?
            `/profile/${this.props.auth.uid}` :
            "/signup"
          }>
          <img src={menu} alt="menu" />
        </Button>
      </Nav>

    );
  }
}


const mapStateToProps = state => ({
  auth: state.firebase.auth,
  location: state.location,
  // lastLocation: state.lastLocation
})

export default connect(mapStateToProps)(Navbar)
