import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
//Components
import ContentQuickShow from '../content/ContentQuickShow';
import HomeBottom from './HomeBottom';
//Functions
import { getContents } from '../../redux/action/postAction';
import { useDetectWidth } from '../hook/useDetectWidth';
//Template
import { TypeWriter } from '../template/typewritter';
import Spinner from '../template/spinner';

const Home = ({ getContents, postReducer: { contents = [], loading } }) => {
  const [ContentArr, setContentArr] = useState([]);
  useEffect(() => {
    getContents();
    setContentArr(contents);
  }, [loading]);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
  };

  const sortByLikes = (array) => {
    return array.sort((a, b) => b.likes.length - a.likes.length);
  };

  const InnerWidth = useDetectWidth();

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
      <section
        id='main2'
        className={'p2 flex-container ' + InnerWidth > 768 ? 'm1' : undefined}
      >
        <h4 className='title flex-container'>
          <i className='fas fa-heart'></i>Today's Ranking
        </h4>
        <div className='bottom-line'></div>
        <div id='main2-content' className='grid'>
          {loading ? (
            <Spinner />
          ) : sortByLikes(ContentArr).length > 0 ? (
            ContentArr.slice(0, 3).map((content) => (
              <ContentQuickShow key={content.id} content={content} />
            ))
          ) : (
            <h4 className='parag'>No Content found...</h4>
          )}
        </div>
      </section>
      <HomeBottom />
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
