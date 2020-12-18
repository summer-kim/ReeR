import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav id='nav' class='flex-container'>
      <a id='nav-a' href='./tags.html'>
        <i class='fas fa-tags'></i>Tags
      </a>
      <div id='nav-b'>
        <Link to='/'>
          <span class='logo'>ReeR:</span>
        </Link>
      </div>
      <div id='nav-c' class='flex-container'>
        <a href='./about.html'>About</a>
        <Link to='/login'>
          Register
          <br />
          /Login
        </Link>
        <a href='./mypage.html'>
          <i class='far fa-user'></i>
        </a>
      </div>
    </nav>
  );
};
export default Navbar;
