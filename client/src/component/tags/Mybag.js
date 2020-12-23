import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Spinner from '../layout/spinner';
import ContentSitem from '../content/ContentSitem';
import { Link, Redirect } from 'react-router-dom';
import { getContentMyBag } from '../../action/postAction';

const Mybag = ({
  getContentMyBag,
  authReducer: { isAuthenticated },
  postReducer: { contents, loading },
}) => {
  useEffect(() => {
    getContentMyBag();
  }, [getContentMyBag]);
  if (!isAuthenticated) {
    return <Redirect to='/tags' />;
  }

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
            <Link to='/makepost'>
              <div className='icons btn-main'>
                <i className='fas fa-plus flex-container'></i>
              </div>
            </Link>
            <Link to='/mybag' className='current'>
              <div className='icons btn-main'>
                <i className='fas fa-shopping-bag flex-container'></i>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <div id='space110'></div>

      <section id='main2' className='chart-down flex-container myBag'>
        <h4 className='title flex-container'>
          <i className='fas fa-heart'></i>My Bag
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
            <h4 className='title'>No Content found...</h4>
          )}
        </div>
      </section>
    </Fragment>
  );
};
Mybag.propTypes = {
  authReducer: PropTypes.object.isRequired,
  postReducer: PropTypes.object.isRequired,
  getContentMyBag: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
  postReducer: state.postReducer,
});
export default connect(mapStateToProps, { getContentMyBag })(Mybag);
