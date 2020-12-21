import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import lala from '../../img/lala.jpg';
import PropTypes from 'prop-types';
import {
  likePost,
  likePostUndo,
  unlikePost,
  unlikePostUndo,
} from '../../action/postAction';
import { addToMyBag, addToMyBagUndo } from '../../action/authAction';

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
  unlikePost,
  unlikePostUndo,
  authReducer,
  addToMyBag,
  addToMyBagUndo,
}) => {
  //variables for change button color depends on User already like content or not
  let Liked = false;
  let Unliked = false;
  //variable for change button color depends on myBag already had content or not
  let Put = false;
  if (authReducer.user) {
    if (likes && likes.some((like) => like.user === authReducer.user._id)) {
      Liked = true;
    }
    if (
      unlikes &&
      unlikes.some((unlike) => unlike.user === authReducer.user._id)
    ) {
      Unliked = true;
    }
    if (authReducer.user.myBag.some((list) => list.post.toString() === _id)) {
      Put = true;
    }
  }

  //when User click like heart button
  const onClickLike = (e) => {
    if (Liked) {
      likePostUndo(_id);
      Liked = false;
    } else {
      likePost(_id);
      Liked = true;
    }
  };
  //when User click unlike heart-broken button
  const onClickUnlike = (e) => {
    if (Unliked) {
      unlikePostUndo(_id);
      Unliked = false;
    } else {
      unlikePost(_id);
      Unliked = true;
    }
  };
  const onClickMyBag = (e) => {
    if (Put) {
      addToMyBagUndo(_id);
      Put = false;
    } else {
      addToMyBag(_id);
      Put = true;
    }
  };

  //expose tagname only 3 and fill the rest
  const sortAndLimitTag = (tags) => {
    //sort tags by number of likes
    if (tags) {
      tags.sort((a, b) => {
        if (a.likes.length < b.likes.length) {
          return 1;
        }
        if (a.likes.length > b.likes.length) {
          return -1;
        }
        if (a.likes.length === b.likes.length) {
          return 0;
        }
        return 0;
      });
    }
    if (tags.length > 3) {
      tags = tags.slice(0, 3);
    }
    switch (tags.length) {
      case 0:
        return (
          <Fragment>
            <span className='tag'>No Tag! Make your own tag</span>
            <span className='tag'>No Tag! Make your own tag</span>
            <span className='tag'>No Tag! Make your own tag</span>
          </Fragment>
        );
      case 1:
        return (
          <Fragment>
            <span className='tag'>{tags[0].tagName}</span>
            <span className='tag'>No Tag! Make your own tag</span>
            <span className='tag'>No Tag! Make your own tag</span>
          </Fragment>
        );
      case 2:
        return (
          <Fragment>
            {tags.map((tag) => (
              <span className='tag'>{tag.tagName}</span>
            ))}
            <span className='tag'>No Tag! Make your own tag</span>
          </Fragment>
        );
      case 3:
        return tags.map((tag) => <span className='tag'>{tag.tagName}</span>);
      default:
        break;
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
              Liked ? 'emoji emoji-heart emoji-reverse' : 'emoji emoji-heart'
            }
          >
            <i className='fas fa-heart'></i>
          </div>
          <div
            onClick={onClickUnlike}
            className={
              Unliked
                ? 'emoji emoji-broken emoji-reverse'
                : 'emoji emoji-broken'
            }
          >
            <i className='fas fa-heart-broken'></i>
          </div>
          <div
            onClick={onClickMyBag}
            className={
              Put ? 'emoji emoji-plus emoji-reverse' : 'emoji emoji-plus'
            }
          >
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
          <span className='interest-span'>
            <i className='fas fa-heart'></i>
            {likes.length}
          </span>
          <span className='interest-span'>
            <i className='fas fa-heart-broken'></i>
            {unlikes.length}
          </span>
        </span>
      </div>
      <div className='tags'>{sortAndLimitTag(tags)}</div>
    </div>
  );
};
ContentSitem.propTypes = {
  content: PropTypes.object.isRequired,
  authReducer: PropTypes.object.isRequired,
  likePost: PropTypes.func.isRequired,
  likePostUndo: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  unlikePostUndo: PropTypes.func.isRequired,
  addToMyBag: PropTypes.func.isRequired,
  addToMyBagUndo: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});
export default connect(mapStateToProps, {
  likePost,
  likePostUndo,
  unlikePost,
  unlikePostUndo,
  addToMyBag,
  addToMyBagUndo,
})(ContentSitem);
