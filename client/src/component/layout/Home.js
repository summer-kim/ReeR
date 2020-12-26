import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/spinner';
//img
import decision from '../../img/decision.jpg';
import dislike from '../../img/dislike.jpg';
import like from '../../img/like.jpg';

import { getContents } from '../../action/postAction';
import ContentSitem from '../content/ContentSitem';
import { Link } from 'react-router-dom';

const Home = ({ getContents, postReducer: { contents = [], loading } }) => {
  useEffect(() => {
    getContents();
  }, [getContents]);
  return (
    <Fragment>
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
        <Link to='/register' className='btn-light'>
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
                  <ContentSitem key={content._id} content={content} />
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
                <Link className='more' to='/register'>
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
              <img src={dislike} style={{ 'object-fit': 'contain' }} alt='#' />
              <div className='item-text'>
                <Link className='more' to='/register'>
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
                <Link className='more' to='/register'>
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
