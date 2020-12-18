import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Navbar = ({ authReducer: { isAuthenticated, loading } }) => {
  const authLink = (
    <Link to='/mypage'>
      <i className='far fa-user'></i>
    </Link>
  );
  const guestLink = (
    <Link to='/login'>
      Register
      <br />
      /Login
    </Link>
  );
  return (
    <nav id='nav' className='flex-container'>
      <Link id='nav-a' to='/tags'>
        <i className='fas fa-tags'></i>Tags
      </Link>
      <div id='nav-b'>
        <Link to='/'>
          <span className='logo'>ReeR:</span>
        </Link>
      </div>
      <div id='nav-c' className='flex-container'>
        <Link to='/about'>About</Link>
        {!loading && isAuthenticated ? authLink : guestLink}
      </div>
    </nav>
  );
};
Navbar.propTypes = {
  //logout: PropTypes.func.isRequired,
  authReducer: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});
export default connect(mapStateToProps)(Navbar);
