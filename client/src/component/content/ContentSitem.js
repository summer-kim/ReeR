import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import lala from '../../img/lala.jpg';
import PropTypes from 'prop-types';
import { likePost, likePostUndo } from '../../action/postAction';

const ContentSitem = ({
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
  likePost,
  likePostUndo,
  authReducer,
}) => {
  let addClassLiked = false;
  // const onClickLike = (e) => {
  //   likePost(_id);
  //   if (Object.keys(error).length === 0) {
  //     toggle(!addClassInput);
  //   }
  // };
  if (
    authReducer.user &&
    likes.some((like) => like.user === authReducer.user._id)
  ) {
    addClassLiked = true;
  }
  const onClickLike = (e) => {
    if (addClassLiked) {
      likePostUndo(_id);
      addClassLiked = false;
    } else {
      likePost(_id);
      addClassLiked = true;
    }
  };
  return (
    <div className='item'>
      <div className='item-img'>
        <Link to='/content'>
          <img src={lala} alt='#' />
        </Link>
        <div className='item-text'>
          <div
            onClick={onClickLike}
            className={
              addClassLiked
                ? 'emoji emoji-heart emoji-reverse'
                : 'emoji emoji-heart'
            }
          >
            <i className='fas fa-heart'></i>
          </div>
          <div className='emoji emoji-broken'>
            <i className='fas fa-heart-broken'></i>
          </div>
          <div className='emoji emoji-plus'>
            <i className='fas fa-plus'></i>
          </div>
        </div>
      </div>
      <div>
        <span className='movieTitle'>{movieName}</span>
      </div>
      <div className='info'>
        <span>
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
          {likes.length}
        </span>
      </div>
      <div className='tags'>
        <span className='tag'>Adventureous</span>
        <span className='tag'>Good to watch at night</span>
        <span className='tag'>Teach me the lessons of life</span>
      </div>
    </div>
  );
};
ContentSitem.propTypes = {
  content: PropTypes.object.isRequired,
  likePost: PropTypes.func.isRequired,
  likePostUndo: PropTypes.func.isRequired,
  authReducer: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});
export default connect(mapStateToProps, { likePost, likePostUndo })(
  ContentSitem
);
