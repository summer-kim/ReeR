import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../action/authAction';
import PropTypes from 'prop-types';

const Register = ({ registerUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2 } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log('nope');
    } else {
      registerUser({ name, email, password });
    }
  };
  return (
    <section id='register'>
      <div id='register-box' className='flex-container'>
        <div className='intro'>
          <h2>sign up</h2>
          <div className='bottom-line'></div>
          <p className='parag'>
            Join in ReeR and Get reviews <br />
            by your personal taste
          </p>
        </div>
        <div className='form'>
          <form onSubmit={onSubmit}>
            <div className='eachForm'>
              <label htmlFor='name'>Name</label>
              <input type='text' name='name' onChange={onChange} value={name} />
            </div>

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
            <div className='eachForm'>
              <label htmlFor='password2'>Confirm Password</label>
              <input
                type='password'
                name='password2'
                onChange={onChange}
                value={password2}
              />
            </div>
            <button className='btn-main' type='submit'>
              Sign Up
            </button>
          </form>
        </div>
        <div className='condition'>
          <p>
            By clicking the Sign Up button, you agree to our
            <br />
            <a href='#'>Terms & Conditions</a>
            and
            <a href='#'>Privacy Policy</a>
          </p>
        </div>
      </div>
      <div className='loginLink'>
        <span>Are you already a member?</span>
        <Link className='btn-light' to='/login'>
          Login
        </Link>
      </div>
    </section>
  );
};
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
};
export default connect(null, { registerUser })(Register);
