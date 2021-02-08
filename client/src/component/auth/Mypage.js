import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout } from '../../redux/action/authAction';
import '../../css/mypage.css';

const Mypage = ({ logout, user: { name = null }, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Redirect to='/' />;
  }
  return (
    <section id='mypage' className='m1 p1'>
      <h1 className='title welcome flex-container'>
        <i className='far fa-sun'></i>Welcome,{' '}
        {name ? name.toUpperCase() : undefined}
      </h1>
      <div className='bottom-line'></div>
      <div className='menus flex-container'>
        <Link onClick={logout} className='menu' to='/'>
          Logout
        </Link>
        <Link to='/contents/bag' className='menu'>
          My Bag
        </Link>
        <Link to='/contents/create' className='menu'>
          My Post
        </Link>
        <Link to='/contents/liked' className='menu'>
          My Likes (post)
        </Link>
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
