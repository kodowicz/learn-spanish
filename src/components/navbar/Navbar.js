import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import styled from 'styled-components';

import arrow from '../../images/arrow.png';
import menu from '../../images/menu.png';


const Nav = styled.nav`
  height: 60px;
  padding: 0 7vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.div`
  transform: ${ props => props.transform ? 'rotate(90deg)' : 'none' };
  padding: 0;
  width: 24px;
  height: 24px;

  a {
    text-decoration: none
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
    return (
      <Nav>
        <Button transform="true">
          <Link to="/">
            <img src={arrow} alt="back" />
          </Link>
        </Button>
        <Title>HOME</Title>
        <Button>
          { this.props.auth.uid ?
            <Link to={`/profile/${this.props.auth.uid}`}>
              <img src={menu} alt="menu" />
            </Link>
            :
            <Link to="/signup">
              <img src={menu} alt="menu" />
            </Link>
          }
        </Button>
      </Nav>

    );
  }
}

const mapStateToProps = state => {console.log(state); return({
  auth: state.firebase.auth
})}

export default connect(mapStateToProps)(Navbar)
