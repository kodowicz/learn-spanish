import React from 'react';
import { Link } from 'react-router-dom';

import Menu from './Menu';
import backArrow from '../../images/back-arrow.png';

const Navbar = (props) => {

  return (
    <div>
      <button>
        <Link to="/">
          <img src={backArrow} />
        </Link>
      </button>
      <p>HOME</p>
      <Menu />
    </div>
  )
};

export default Navbar
