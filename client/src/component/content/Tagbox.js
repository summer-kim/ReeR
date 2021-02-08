import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  removeTag,
  likeTag,
  likeTagUndo,
  unlikeTag,
  unlikeTagUndo,
} from '../../redux/action/tagAction';
import '../../css/tagbox.css';

const Tagbox = ({
  tag,
  postid,
  authReducer,
  removeTag,
  likeTag,
  likeTagUndo,
  unlikeTag,
  unlikeTagUndo,
}) => {
  let Liked = false;
  let Unliked = false;
  if (authReducer.user) {
    if (
      tag.likes &&
      tag.likes.some((like) => like.user === authReducer.user._id)
    ) {
      Liked = true;
    }
    if (
      tag.unlikes &&
      tag.unlikes.some((unlike) => unlike.user === authReducer.user._id)
    ) {
      Unliked = true;
    }
  }
  const onClickLike = (e) => {
    console.log(Liked);
    if (Liked) {
      likeTagUndo({ postid, tagid: tag._id });
      Liked = false;
    } else {
      likeTag({ postid, tagid: tag._id });
      Liked = true;
    }
  };
  const onClickUnlike = (e) => {
    if (Unliked) {
      unlikeTagUndo({ postid, tagid: tag._id });
      Unliked = false;
    } else {
      unlikeTag({ postid, tagid: tag._id });
      Unliked = true;
    }
  };
  return (
    <div className='tag'>
      <div className='tagName flex-container'>
        <i className='fas fa-hashtag'></i>
        {tag.tagName}
      </div>
      <div className='people-like'>
        <span
          className='trash'
          onClick={() => removeTag({ postid, tagid: tag._id })}
        >
          {tag.user === authReducer.user._id ? (
            <i class='fas fa-trash-alt'></i>
          ) : (
            ''
          )}
        </span>
        <span className='flex-container'>
          <span className='interest'>
            {' '}
            <i
              className={Liked ? 'fas fa-heart clicked' : 'fas fa-heart'}
              onClick={onClickLike}
            ></i>
            {tag.likes.length}
          </span>
          <span className='interest'>
            <i
              className={
                Unliked ? 'fas fa-heart-broken clicked' : 'fas fa-heart-broken'
              }
              onClick={onClickUnlike}
            ></i>
            {tag.unlikes.length}
          </span>
        </span>
      </div>
    </div>
  );
};
Tagbox.propTypes = {
  authReducer: PropTypes.object.isRequired,
  tag: PropTypes.object.isRequired,
  postid: PropTypes.string.isRequired,
  removeTag: PropTypes.func.isRequired,
  likeTag: PropTypes.func.isRequired,
  likeTagUndo: PropTypes.func.isRequired,
  unlikeTag: PropTypes.func.isRequired,
  unlikeTagUndo: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});
export default connect(mapStateToProps, {
  removeTag,
  likeTag,
  likeTagUndo,
  unlikeTag,
  unlikeTagUndo,
})(Tagbox);
