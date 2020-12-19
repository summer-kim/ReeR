import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/spinner';
//img
import sample from '../../img/sample.JPG';

import { getContents } from '../../action/postAction';
import ContentSitem from '../content/ContentSitem';

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
        <a href='#' className='btn-light'>
          <i className='fas fa-angle-double-right'></i>Register
        </a>
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
            <h4>No Content found...</h4>
          )}
        </div>
      </section>
      <section id='main3' className='m1 p2 flex-container'>
        <h4 className='title'>The person who should use ReeR:</h4>
        <div className='bottom-line'></div>
        <div id='main3-content' className='grid'>
          <div className='item txt-center'>
            <div className='item-img'>
              <img src={sample} alt='#' />
              <div className='item-text'>
                <div className='more'>
                  <i className='fas fa-angle-double-right'></i>Go Register!
                </div>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
              quibusdam itaque deserunt facere nulla commodi delectus adipisci
            </p>
          </div>
          <div className='item txt-center'>
            <div className='item-img'>
              <img src={require('../../img/sample.JPG')} alt='#' />
              <div className='item-text'>
                <div className='more'>
                  <i className='fas fa-angle-double-right'></i>Go Register!
                </div>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
              quibusdam itaque deserunt facere nulla commodi delectus adipisci
            </p>
          </div>
          <div className='item txt-center'>
            <div className='item-img'>
              <img src='./img/sample.JPG' alt='#' />
              <div className='item-text'>
                <div className='more'>
                  <i className='fas fa-angle-double-right'></i>Go Register!
                </div>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
              quibusdam itaque deserunt facere nulla commodi delectus adipisci
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
