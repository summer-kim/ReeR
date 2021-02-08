import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/spinner';
//img
import decision from '../../img/decision.jpg';
import dislike from '../../img/dislike.jpg';
import like from '../../img/like.jpg';

import { getContents } from '../../redux/action/postAction';
import ContentQuickShow from '../content/ContentQuickShow';
import { Link } from 'react-router-dom';

const Home = ({ getContents, postReducer: { contents = [], loading } }) => {
  useEffect(() => {
    getContents();
  }, [getContents]);

  useEffect(() => {
    init();
  }, []);

  const sortContents = (array) => {
    array.sort((a, b) => b.likes.length - a.likes.length);
  };
  sortContents(contents);

  class TypeWriter {
    constructor(txtElement, words, wait = 2000) {
      this.txtElement = txtElement;
      this.words = words;
      this.txt = '';
      this.wordIndex = 0;
      this.wait = parseInt(wait, 10);
      this.type();
      this.isDeleting = false;
    }

    type() {
      // Current index of word
      const current = this.wordIndex % this.words.length;
      // Get full text of current word
      const fullTxt = this.words[current];

      // Check if deleting
      if (this.isDeleting) {
        // Remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        // Add char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      // Insert txt into element
      this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

      // Initial Type Speed
      let typeSpeed = 175;
      if (this.isDeleting) {
        typeSpeed = 100;
      }

      // If word is complete
      if (!this.isDeleting && this.txt === fullTxt) {
        // Make pause at end
        typeSpeed = this.wait;
        // Set delete to true
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        // Move to next word
        this.wordIndex++;
        // Pause before start typing
        typeSpeed = 500;
      }

      setTimeout(() => this.type(), typeSpeed);
    }
  }

  function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
  }

  return (
    <Fragment>
      <section id='main1' className='p2 flex-container'>
        <h1>
          ReeR:
          <br />
          The Best Platform for Contents
          <br />
          　
          <span
            className='txt-type'
            data-wait='1500'
            data-words='["Review", "Recommandation", "Communication"]'
          ></span>
        </h1>
        <p className='parag'>
          You don't have to wander anymore about what to choose.
          <br />
          Just search on ReeR and get a quick reviews
          <br />
          for your personal taste.
        </p>
        <Link to='/login' className='btn-light'>
          <i className='fas fa-angle-double-right'></i>Register
        </Link>
      </section>
      <section id='main2' className='m1 p2 flex-container'>
        <h4 className='title flex-container'>
          <i className='fas fa-heart'></i>Today's Ranking
        </h4>
        <div className='bottom-line'></div>
        <div id='main2-content' className='grid'>
          {loading ? (
            <Spinner />
          ) : contents.length > 0 ? (
            contents.map(
              (content, index) =>
                index <= 2 && (
                  <ContentQuickShow key={content._id} content={content} />
                )
            )
          ) : (
            <h4 className='parag'>No Content found...</h4>
          )}
        </div>
      </section>
      <section id='main3' className='m1 p2 flex-container'>
        <h4 className='title'>The person who should use ReeR:</h4>
        <div className='bottom-line'></div>
        <div id='main3-content' className='grid'>
          <div className='item txt-center'>
            <div className='item-img'>
              <img src={decision} alt='#' />
              <div className='item-text'>
                <Link className='more' to='/login'>
                  <i className='fas fa-angle-double-right'></i>Go Register!
                </Link>
              </div>
            </div>
            <p>
              If you ever hesitated
              <br /> because you didn't know <br />
              what Movie or Series to choose,
            </p>
          </div>
          <div className='item txt-center'>
            <div className='item-img'>
              <img src={dislike} style={{ objectFit: 'contain' }} alt='#' />
              <div className='item-text'>
                <Link className='more' to='/login'>
                  <i className='fas fa-angle-double-right'></i>Go Register!
                </Link>
              </div>
            </div>
            <p>
              If you dislike
              <br /> spending your time on searching
              <br />
              what Movie or Series to watch,
            </p>
          </div>
          <div className='item txt-center'>
            <div className='item-img'>
              <img src={like} alt='#' />
              <div className='item-text'>
                <Link className='more' to='/login'>
                  <i className='fas fa-angle-double-right'></i>Go Register!
                </Link>
              </div>
            </div>
            <p>
              <br />
              if you like something <br />
              Convenient and Efficient
            </p>
          </div>
        </div>
      </section>
    </Fragment>
  );
};
Home.propTypes = {
  getContents: PropTypes.func.isRequired,
  postReducer: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  postReducer: state.postReducer,
});
export default connect(mapStateToProps, { getContents })(Home);
