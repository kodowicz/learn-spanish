import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import arrow from '../../images/arrow.png';
import menu from '../../images/menu.png';


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
