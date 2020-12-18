import React from 'react';

const Footer = () => {
  return (
    <footer id='footer' className='p2 flex-container'>
      <div id='footer-content'>
        <span className='logo'>ReeR:</span>
        <p>Copyright &copy; 2019. All Rights Reserved</p>
        <p>
          Contacts of Developer :<span className='develop-name'>Dasom Kim</span>{' '}
          dasomi6835@gmail.com
        </p>
      </div>
      <div id='footer-social'>
        <i className='fab fa-facebook'></i>
        <i className='fab fa-instagram'></i>
        <i className='fab fa-linkedin'></i>
      </div>
    </footer>
  );
};
export default Footer;
