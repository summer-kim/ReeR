import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout } from '../../action/authAction';

const Mypage = ({ logout, user: { name = null }, isAuthenticated }) => {
  const capName = name.toUpperCase();
  if (!isAuthenticated) {
    return <Redirect to='/' />;
  }
  return (
    <section id='mypage' className='m1 p1'>
      <h1 className='title welcome flex-container'>
        <i className='far fa-sun'></i>Welcome, {capName}
      </h1>
      <div className='bottom-line'></div>
      <div className='menus flex-container'>
        <Link onClick={logout} className='menu' to='/'>
          Logout
        </Link>
        <div className='menu'>My Bag</div>
        <div className='menu'>My Likes(post)</div>
        <div className='menu'>My Likes(tag)</div>
        <div className='menu'>My Post</div>
      </div>
    </section>
  );
};
Mypage.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  user: state.authReducer.user,
  isAuthenticated: state.authReducer.isAuthenticated,
});
export default connect(mapStateToProps, { logout })(Mypage);
