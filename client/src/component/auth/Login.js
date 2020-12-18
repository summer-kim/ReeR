import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
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
          <form>
            <div className='eachForm'>
              <label for='Email'>Email</label>
              <input type='email' name='Email' id='Email' />
            </div>
            <div className='eachForm'>
              <label for='Password'>Password</label>
              <input type='password' name='Password' id='Password' />
            </div>
          </form>
        </div>
        <button className='btn-main' type='submit'>
          Sign in
        </button>
      </div>
    </section>
  );
};
export default Login;
