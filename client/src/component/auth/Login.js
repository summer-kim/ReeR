import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loginUser } from '../../action/authAction';

const Login = ({ loginUser, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    loginUser({ email, password });
  };
  if (isAuthenticated) {
    return <Redirect to='/' />;
  }
  return (
    <section id='login'>
      <div id='login-box' className='flex-container'>
        <div className='intro'>
          <h2>sign in</h2>
          <div className='bottom-line'></div>
          <div className='loginLink'>
            <span>Not a member yet?</span>
            <Link className='btn-main' to='/register'>
              Register
            </Link>
          </div>
        </div>
        <div className='form'>
          <form onSubmit={onSubmit}>
            <div className='eachForm'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                name='email'
                onChange={onChange}
                value={email}
              />
            </div>
            <div className='eachForm'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                name='password'
                onChange={onChange}
                value={password}
              />
            </div>
            <button className='btn-main' type='submit'>
              Sign in
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
});
export default connect(mapStateToProps, { loginUser })(Login);
