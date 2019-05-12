import React from 'react';
import { Link } from 'react-router-dom';
import menu from '../../images/menu.png';

const Menu = () => {
  return (
    <div>
      <button>
        <img src={menu} />
      </button>

      <div>
        <p>signed as: Anna</p>
        <br/>
        <ul>
          <li>email: anna@gmail.com</li>
          <li>username: Anna ></li>
          <li>change password ></li>
        </ul>
        <br/>
        <Link to="/profile/anna">view profile</Link>
      </div>
    </div>
  )
};

export default Menu
