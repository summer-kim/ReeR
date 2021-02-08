import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../css/login.css';

import { loginUser, registerUser } from '../../redux/action/authAction';
import { setAlert } from '../../redux/action/alertAction';

const Login = ({ loginUser, isAuthenticated, registerUser, setAlert }) => {
  const [isLoginPage, setIsLoginPage] = useState(true);

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const onChange = (e) => {
    isLoginPage
      ? setLoginData({ ...loginData, [e.target.name]: e.target.value })
      : setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isLoginPage) {
      loginUser(loginData);
      return;
    }

    const { password, password2 } = registerData;

    if (password !== password2) {
      setAlert("Password doesn't matched", 'fail');
    } else {
      registerUser(registerData);
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <section id='login'>
      <div id='login-box' className='flex-container'>
        <div className='intro'>
          <h2>{isLoginPage ? 'Login' : 'Register'}</h2>
          <div className='bottom-line'></div>
          <div className='loginLink'>
            <span>
              {isLoginPage ? 'Not a member yet?' : 'Already our member?'}
            </span>
            <div
              className='btn-main'
              onClick={() => setIsLoginPage(!isLoginPage)}
            >
              {isLoginPage ? 'Register' : 'Login'}
            </div>
          </div>
        </div>
        <div className='form'>
          <form onSubmit={onSubmit}>
            {isLoginPage
              ? Object.keys(loginData).map((title, idx) => (
                  <div className='eachForm' key={idx}>
                    <label htmlFor={title}>{title}</label>
                    <input
                      type={title}
                      name={title}
                      onChange={onChange}
                      value={Object.values(loginData)[idx]}
                    />
                  </div>
                ))
              : Object.keys(registerData).map((title, idx) => (
                  <div className='eachForm' key={idx}>
                    <label htmlFor={title}>{title}</label>
                    <input
                      type={title.includes('password') ? 'password' : title}
                      name={title}
                      onChange={onChange}
                      value={Object.values(registerData)[idx]}
                    />
                  </div>
                ))}

            <button className='btn-main' type='submit'>
              {isLoginPage ? 'Sign in' : 'Sign up'}
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
  registerUser: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
});
export default connect(mapStateToProps, { loginUser, registerUser, setAlert })(
  Login
);
