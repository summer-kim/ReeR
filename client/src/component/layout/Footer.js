import React from 'react';

const Footer = () => {
  return (
    <footer id='footer' class='p2 flex-container'>
      <div id='footer-content'>
        <span class='logo'>ReeR:</span>
        <p>Copyright &copy; 2019. All Rights Reserved</p>
        <p>
          Contacts of Developer :<span class='develop-name'>Dasom Kim</span>{' '}
          dasomi6835@gmail.com
        </p>
      </div>
      <div id='footer-social'>
        <i class='fab fa-facebook'></i>
        <i class='fab fa-instagram'></i>
        <i class='fab fa-linkedin'></i>
      </div>
    </footer>
  );
};
export default Footer;
