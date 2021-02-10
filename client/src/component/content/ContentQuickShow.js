import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  likeUnlikeBag,
  likeUnlikeBagUndo,
} from '../../redux/action/postAction';

import { usePressLike } from '../hook/usePressLike'; //custom hook for interaction with like, unlike, bag button

import { sortAndLimitTag } from '../../util/sortAndLimitTag';
import logo from '../../img/logo.png';

const ContentQuickShow = ({
  content: {
    _id,
    genre, //array
    movieName,
    img,
    likes,
    unlikes,
    tags,
  },
  likeUnlikeBag,
  likeUnlikeBagUndo,
  authReducer,
  postReducer: { loading },
}) => {
  const { Liked, Unliked, Bag, LikeNum, onClickSet } = usePressLike({
    _id,
    likes,
    unlikes,
    loading,
    authUser: authReducer.user,
  });

  const onClick = (type, bool) => {
    onClickSet(type);
    bool ? likeUnlikeBagUndo(type, _id) : likeUnlikeBag(type, _id);
  };

  return (
    <Link to={`/post/${_id}`}>
      <div className='item'>
        <div className='item-img'>
          <img
            src={
              img
                ? 'https://summerzzang.s3.ap-northeast-2.amazonaws.com/uploads/' +
                  img
                : logo
            }
            alt='Click and Watch more details'
          />

          <div className='item-text'>
            <div
              onClick={(e) => {
                e.preventDefault();
                onClick('like', Liked);
              }}
              className={
                Liked ? 'emoji emoji-heart' : 'emoji emoji-heart emoji-reverse'
              }
            >
              <i className='fas fa-heart'></i>
            </div>
            <div
              onClick={(e) => {
                e.preventDefault();
                onClick('unlike', Unliked);
              }}
              className={
                Unliked
                  ? 'emoji emoji-broken '
                  : 'emoji emoji-broken emoji-reverse'
              }
            >
              <i className='fas fa-heart-broken'></i>
            </div>
            <div
              onClick={(e) => {
                e.preventDefault();
                onClick('bag', Bag);
              }}
              className={
                Bag ? 'emoji emoji-plus ' : 'emoji emoji-plus emoji-reverse'
              }
            >
              <i className='fas fa-plus'></i>
            </div>
          </div>
        </div>
        <div className='item-info'>
          <div>
            <span className='movieTitle'>
              {movieName.length > 30
                ? movieName.substr(0, 30) + '..'
                : movieName}
            </span>
            <span>
              {genre.map((gen, index) => (
                <span key={index} className='genre'>
                  {index === genre.length - 1 ? gen : gen + '/'}
                </span>
              ))}
            </span>
          </div>
          <span className='preview-interest'>
            <i className='fas fa-heart'></i>
            {LikeNum.like}
            <span>:</span>
            <i className='fas fa-heart-broken'></i>
            {LikeNum.unlike}
          </span>
        </div>
        <div className='tags'>{sortAndLimitTag(tags)}</div>
      </div>
    </Link>
  );
};
ContentQuickShow.propTypes = {
  content: PropTypes.object.isRequired,
  authReducer: PropTypes.object.isRequired,
  postReducer: PropTypes.object.isRequired,
  likeUnlikeBag: PropTypes.func.isRequired,
  likeUnlikeBagUndo: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
  postReducer: state.postReducer,
});
export default connect(mapStateToProps, {
  likeUnlikeBag,
  likeUnlikeBagUndo,
})(ContentQuickShow);
