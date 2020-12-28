import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  likePost,
  likePostUndo,
  unlikePost,
  unlikePostUndo,
} from '../../action/postAction';
import {
  addToMyBag,
  addToMyBagUndo,
  addToMylikes,
  addToMylikesUndo,
} from '../../action/authAction';
import { sortAndLimitTag } from '../../util/sortAndLimitTag';
import logo from '../../img/logo.png';

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
  addToMylikes,
  addToMylikesUndo,
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
    e.preventDefault();
    if (Liked) {
      likePostUndo(_id);
      addToMylikesUndo(_id);
      Liked = false;
    } else {
      likePost(_id);
      addToMylikes(_id);
      Liked = true;
    }
  };
  //when User click unlike heart-broken button
  const onClickUnlike = (e) => {
    e.preventDefault();
    if (Unliked) {
      unlikePostUndo(_id);
      Unliked = false;
    } else {
      unlikePost(_id);
      Unliked = true;
    }
  };
  const onClickMyBag = (e) => {
    e.preventDefault();
    if (Put) {
      addToMyBagUndo(_id);
      Put = false;
    } else {
      addToMyBag(_id);
      Put = true;
    }
  };

  return (
    <Link to={`/post/${_id}`}>
      <div className='item'>
        <div className='item-img'>
          <img
            src={img ? window.location.origin + '/uploads/' + img : logo}
            alt='Click and Watch more details'
          />
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
ContentSitem.propTypes = {
  content: PropTypes.object.isRequired,
  authReducer: PropTypes.object.isRequired,
  likePost: PropTypes.func.isRequired,
  likePostUndo: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  unlikePostUndo: PropTypes.func.isRequired,
  addToMyBag: PropTypes.func.isRequired,
  addToMyBagUndo: PropTypes.func.isRequired,
  addToMylikes: PropTypes.func.isRequired,
  addToMylikesUndo: PropTypes.func.isRequired,
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
  addToMylikes,
  addToMylikesUndo,
})(ContentSitem);
