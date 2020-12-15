import React from 'react';
import PropTypes from 'prop-types';

const Home = () => {
  return (
    <section id='main1' className='p2 flex-container'>
      <h1>
        ReeR:
        <br />
        The Best Platform for Contents
        <span
          className='txt-type'
          data-wait='2200'
          data-words='["Review", "Recommandation", "communication"]'
        ></span>
      </h1>
      <p className='parag'>
        You don't have to wander anymore about what to choose.
        <br />
        Just search on ReeR and get a quick reviews
        <br />
        for your personal taste.
      </p>
      <a href='#' className='btn-light'>
        <i className='fas fa-angle-double-right'></i>Register
      </a>
    </section>
  );
};

export default Home;
