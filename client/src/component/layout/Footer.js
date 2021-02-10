import React from 'react';

const Footer = () => {
  const urlLinked = 'https://www.linkedin.com/in/dasom-kim-0218';
  const urlInsta = 'https://www.instagram.com/summer_in__winter_/';
  const urlGithub = 'https://github.com/summer-kim/ReeR';
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
        <a href={urlGithub} target='_blank'>
          <i class='fab fa-github'></i>
        </a>
        <a href={urlInsta} target='_blank'>
          <i className='fab fa-instagram'></i>
        </a>
        <a href={urlLinked} target='_blank'>
          <i className='fab fa-linkedin'></i>
        </a>
      </div>
    </footer>
  );
};
export default Footer;
