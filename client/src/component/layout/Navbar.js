import React, { Fragment, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Navbar = ({ authReducer: { isAuthenticated } }) => {
  return (
    <Fragment>
      <nav id='nav' className='flex-container'>
        <Link to='/'>
          <span className='logo'>ReeR:</span>
        </Link>
      </nav>
      <nav id='nav-menu' className='flex-container'>
        <div id='nav-a' className='flex-container'>
          <NavLink activeClassName='current' to='/contents/all'>
            <i className='fas fa-film'></i>Movies
          </NavLink>
        </div>

        <div id='nav-b' className='flex-container'>
          <NavLink to='/about' activeClassName='current'>
            About
          </NavLink>
        </div>
        <div id='nav-c' className='flex-container'>
          <NavLink
            to={isAuthenticated ? '/mypage' : '/login'}
            activeClassName='current'
          >
            {isAuthenticated ? <i className='far fa-user'></i> : 'Login'}
          </NavLink>
        </div>
      </nav>
    </Fragment>
  );
};
Navbar.propTypes = {
  authReducer: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});
export default connect(mapStateToProps)(Navbar);
