import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  likeUnlikeBag,
  likeUnlikeBagUndo,
} from '../../redux/action/postAction';

import { sortAndLimitTag } from '../../util/sortAndLimitTag';
import logo from '../../img/logo.png';

const ContentQuickShow = ({
  content: {
    _id,
    genre, //array
    movieName,
    img,
    user, //objectID
    likes,
    unlikes,
    tags,
  },
  likeUnlikeBag,
  likeUnlikeBagUndo,
  authReducer,
  postReducer: { loading },
}) => {
  //variables for changing button color depends on User already liked content or not
  const [Liked, setLiked] = useState(false);
  const [Unliked, setUnliked] = useState(false);

  //variable for changing button color depends on myBag already had content or not
  const [Bag, setBag] = useState(false);

  useEffect(() => {
    if (authReducer.user && !loading) {
      likes.some((like) => like.user === authReducer.user._id) &&
        setLiked(true);
      unlikes.some((unlike) => unlike.user === authReducer.user._id) &&
        setUnliked(true);
      authReducer.user.myBag.some((list) => list.toString() === _id) &&
        setBag(true);
    }
  }, []);

  //when User click like heart button
  const onClick = (type) => {
    switch (type) {
      case 'like':
        Liked ? likeUnlikeBagUndo(type, _id) : likeUnlikeBag(type, _id);
        setLiked(!Liked);
        break;
      case 'unlike':
        Unliked ? likeUnlikeBagUndo(type, _id) : likeUnlikeBag(type, _id);
        setUnliked(!Unliked);
        break;
      case 'bag':
        Bag ? likeUnlikeBagUndo(type, _id) : likeUnlikeBag(type, _id);
        setBag(!Bag);
        break;
      default:
        break;
    }
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
                onClick('like');
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
                onClick('unlike');
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
                onClick('bag');
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
            {movieName.length > 30 ? (
              <span className='movieTitle'>{movieName.substr(0, 30)}..</span>
            ) : (
              <span className='movieTitle'>{movieName}</span>
            )}
            <span>
              {genre.map((gen, index) => {
                if (index === genre.length - 1) {
                  return (
                    <span key={index} className='genre'>
                      {gen}
                    </span>
                  );
                } else {
                  return (
                    <span key={index} className='genre'>
                      {gen}/
                    </span>
                  );
                }
              })}
            </span>
          </div>
          <span className='preview-interest'>
            <i className='fas fa-heart'></i>
            {likes.length}
            <span>:</span>
            <i className='fas fa-heart-broken'></i>
            {unlikes.length}
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
  likeUnlikeBag: PropTypes.object.isRequired,
  likeUnlikeBagUndo: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
  postReducer: state.postReducer,
});
export default connect(mapStateToProps, {
  likeUnlikeBag,
  likeUnlikeBagUndo,
})(ContentQuickShow);
