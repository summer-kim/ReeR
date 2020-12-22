import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getContent } from '../../action/postAction';
import { sortAndLimitTag } from '../../util/sortAndLimitTag';

import lala from '../../img/lala.jpg';

const ContentItem = ({ getContent, postReducer: { content }, match }) => {
  useEffect(() => {
    getContent(match.params.postid);
  }, [getContent]);

  const {
    _id = '',
    movieName = '',
    genre = [],
    summary = '',
    img = '',
    user = '',
    likes = [],
    unlikes = [],
    tags = [],
  } = content;
  return (
    <Fragment>
      <div id='space80'></div>
      <section id='about1' className='m1 p2 flex-container'>
        <div id='about1-bio' className='p1 flex-container'>
          <div id='about1-bio-img'>
            <img src={lala} alt='' />
          </div>
          <div id='about1-bio-side'>
            <div>
              <h1>{movieName}</h1>
              <div className='bottom-line'></div>
            </div>
            <div>
              <div className='info'>
                <span>
                  {' '}
                  {genre.map((gen, index) => {
                    if (index === genre.length - 1) {
                      return (
                        <span key={index} className='genre'>
                          {gen.toUpperCase()}
                        </span>
                      );
                    } else {
                      return (
                        <span key={index} className='genre'>
                          {gen.toUpperCase()}/
                        </span>
                      );
                    }
                  })}
                </span>
                <span className='interest'>
                  <i className='fas fa-heart'></i>
                  {likes ? likes.length : 0}
                </span>
              </div>
              <div className='summary'>
                <p>{summary}</p>
              </div>
              <div className='tags'>{sortAndLimitTag(tags)}</div>
            </div>
          </div>
        </div>
      </section>
      <section id='aboutTag' className='p1 m1'>
        <h4 className='title'>
          <i className='fas fa-heart'></i>Tag List
        </h4>
        <div className='tagBox p1'>
          <div className='tagList grid'>
            <div className='tag'>
              <div className='tagName flex-container'>
                <i className='fas fa-hashtag'></i>Adventureous
              </div>
              <div className='people-like'>
                <span className='interest'>
                  {' '}
                  <i className='fas fa-heart'></i>98
                </span>
                <span className='interest'>
                  <i className='fas fa-heart-broken'></i>100
                </span>
              </div>
            </div>
            <div className='tag'>
              <div className='tagName flex-container'>
                <i className='fas fa-hashtag'></i>Lorem ipsum dolor sit amet,
                consectetur adipisicing.
              </div>
              <div className='people-like'>
                <span className='interest'>
                  {' '}
                  <i className='fas fa-heart'></i>98{' '}
                </span>
                <span className='interest'>
                  <i className='fas fa-heart-broken'></i>100
                </span>
              </div>
            </div>
            <div className='tag'>
              <div className='tagName flex-container'>
                <i className='fas fa-hashtag'></i>Adventureous
              </div>
              <div className='people-like'>
                <span className='interest'>
                  <i className='fas fa-heart'></i>98
                </span>
                <span className='interest'>
                  <i className='fas fa-heart-broken'></i>100
                </span>
              </div>
            </div>
            <div className='tag'>
              <div className='tagName flex-container'>
                <i className='fas fa-hashtag'></i>Lorem ipsum dolor sit amet
                consectetur adipisicing elit.
              </div>
              <div className='people-like'>
                <span className='interest'>
                  <i className='fas fa-heart'></i>98
                </span>
                <span className='interest'>
                  <i className='fas fa-heart-broken'></i>100
                </span>
              </div>
            </div>
            <div className='tag'>
              <div className='tagName flex-container'>
                <i className='fas fa-hashtag'></i>Adventureous
              </div>
              <div className='people-like'>
                <span className='interest'>
                  <i className='fas fa-heart'></i>98
                </span>
                <span className='interest'>
                  <i className='fas fa-heart-broken'></i>100
                </span>
              </div>
            </div>
            <div className='tag'>
              <div className='tagName flex-container'>
                <i className='fas fa-hashtag'></i>Lorem ipsum dolor sit amet.
              </div>
              <div className='people-like'>
                <span className='interest'>
                  <i className='fas fa-heart'></i>98
                </span>
                <span className='interest'>
                  <i className='fas fa-heart-broken'></i>100
                </span>
              </div>
            </div>
            <div className='tag'>
              <div className='tagName flex-container'>
                <i className='fas fa-hashtag'></i>Lorem ipsum dolor sit.
              </div>
              <div className='people-like'>
                <span className='interest'>
                  <i className='fas fa-heart'></i>98
                </span>
                <span className='interest'>
                  <i className='fas fa-heart-broken'></i>100
                </span>
              </div>
            </div>
            <div className='tag'>
              <div className='tagName flex-container'>
                <i className='fas fa-hashtag'></i>Lorem ipsum dolor sit amet
                consectetur.
              </div>
              <div className='people-like'>
                <span className='interest'>
                  <i className='fas fa-heart'></i>98
                </span>
                <span className='interest'>
                  <i className='fas fa-heart-broken'></i>100
                </span>
              </div>
            </div>
          </div>
          <div className='tagInput flex-container'>
            <i className='fas fa-plus'></i>
            <i className='fas fa-hashtag hashTag'></i>
            <input
              className='inputBox'
              classtype='text'
              placeholder='Tag Name (50 letters limit)'
            />
            <input className='btn-main' type='submit' value='ADD' />
          </div>
        </div>
      </section>
      <div id='space80'></div>
    </Fragment>
  );
};
ContentItem.propTypes = {
  getContent: PropTypes.func.isRequired,
  postReducer: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  postReducer: state.postReducer,
});
export default connect(mapStateToProps, { getContent })(ContentItem);
