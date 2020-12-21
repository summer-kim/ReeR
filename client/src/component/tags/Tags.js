import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ContentSitem from '../content/ContentSitem';
import { getContents } from '../../action/postAction';
import Spinner from '../layout/spinner';

const Tags = ({ getContents, postReducer: { contents = [], loading } }) => {
  useEffect(() => {
    getContents();
  }, [getContents]);
  return (
    <Fragment>
      <section id='main-filter'>
        <div className='filter flex-container'>
          <div className='flex-container'>
            <div className='sort'>
              <select name='sort'>
                <option value='Lastest'>Newest</option>
                <option value='Lastest'>Like Number</option>
                <option value='Lastest'>Most Popular</option>
              </select>
            </div>
            <div>
              <div className='sort-part'>
                Category<i className='fas fa-sort-down arrow'></i>
                <input type='checkbox' className='toggler' />
                <div className='hidden'>
                  <div>
                    <span>Sth</span>
                    <span>Milk Tea</span>
                    <span>Decaffein coffee</span>
                  </div>
                  <div>
                    <i className='far fa-times-circle'></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex-container'>
            <a href='./addPost.html'>
              <div className='icons btn-main'>
                <i className='fas fa-plus flex-container'></i>
              </div>
            </a>
            <a href='./myBag.html'>
              <div className='icons btn-main'>
                <i className='fas fa-shopping-bag flex-container'></i>
              </div>
            </a>
          </div>
        </div>
      </section>

      <div id='space110'></div>

      <section id='main2' className='chart-down m1 p2 flex-container'>
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
                index <= 30 && (
                  <ContentSitem key={content._id} content={content} />
                )
            )
          ) : (
            <h4>No Content found...</h4>
          )}
        </div>
      </section>
    </Fragment>
  );
};
Tags.propTypes = {
  getContents: PropTypes.func.isRequired,
  postReducer: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  postReducer: state.postReducer,
});
export default connect(mapStateToProps, { getContents })(Tags);
