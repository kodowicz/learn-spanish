import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import styled from 'styled-components';


const Nav = styled.nav`
  height: 60px;
  padding: 0 7vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
const Path = styled.path`
  fill: none;
  stroke: black;
  stroke-width: 7;
  stroke-linecap: round
`

class Navbar extends Component {
  render() {
    const { location, lastLocation } = this.props;
    
    return (
      <Nav>
        <Button
          to={lastLocation}
          visible={location === "home" ? 0 : 1}>
          <BackButton />
        </Button>

        <Title> { this.props.location }</Title>

        <Button
          visible={1}
          to={ this.props.auth.uid ?
            `/profile/${this.props.auth.uid}` :
            "/signup"
          }>
          <MenuButton />
        </Button>
      </Nav>

    );
  }
}

const MenuButton = () => (
  <svg viewBox="0 0 100 100">
    <Path d="M10,25 L90,25 M10,50 L90,50 M10,75 L90,75" />
  </svg>
);

const BackButton = () => (
  <svg viewBox="0 0 100 100">
    <Path
      d="M5,50 L95,50 M3,50 L19,34 M3,50 L19,66" />
  </svg>
);

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  location: state.location,
  lastLocation: state.lastLocation
})

export default connect(mapStateToProps)(Navbar)
