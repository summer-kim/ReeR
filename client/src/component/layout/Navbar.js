import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Navbar = ({ authReducer: { isAuthenticated, loading } }) => {
  const authLink = (
    <NavLink to='/mypage' activeClassName='current'>
      <i className='far fa-user'></i>
    </NavLink>
  );
  const guestLink = (
    <NavLink to='/login' activeClassName='current'>
      Login
    </NavLink>
  );

  return (
    <nav id='nav' className='flex-container'>
      <NavLink activeClassName='current' id='nav-a' to='/tags'>
        <i className='fas fa-tags'></i>Tags
      </NavLink>
      <div id='nav-b'>
        <Link to='/'>
          <span className='logo'>ReeR:</span>
        </Link>
      </div>
      <div id='nav-c' className='flex-container'>
        <NavLink to='/about' activeClassName='current'>
          About
        </NavLink>
        {!loading && isAuthenticated ? authLink : guestLink}
      </div>
    </nav>
  );
};
Navbar.propTypes = {
  authReducer: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});
export default connect(mapStateToProps)(Navbar);
