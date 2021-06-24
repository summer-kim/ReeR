import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  removeTag,
  likeUnlikeTag,
  likeUnlikeTagUndo,
} from '../../redux/action/tagAction';
import '../../css/tagbox.css';

import { usePressLike } from '../hook/usePressLike'; //custom hook for interaction with like, unlike, bag button

const Tagbox = ({
  tag,
  postid,
  authReducer,
  removeTag,
  likeUnlikeTag,
  likeUnlikeTagUndo,
}) => {
  const { Liked, Unliked, onClickSet } = usePressLike({
    likes: tag.likes,
    unlikes: tag.unlikes,
    authUser: authReducer.user,
  });

  const onClickLike = (type, bool) => {
    bool
      ? likeUnlikeTagUndo({ type, postid, tagid: tag.id })
      : likeUnlikeTag({ type, postid, tagid: tag.id });
    onClickSet(type);
  };

  return (
    <div className='tag'>
      <div className='tagName flex-container'>
        <i className='fas fa-hashtag'></i>
        {tag.tagName}
      </div>
      <div className='people-like'>
        <span className='flex-container'>
          <span className='interest'>
            <i
              className={Liked ? 'fas fa-heart clicked' : 'fas fa-heart'}
              onClick={() => onClickLike('like', Liked)}
            ></i>
            {tag.likes.length}
          </span>
          <span className='interest'>
            <i
              className={
                Unliked ? 'fas fa-heart-broken clicked' : 'fas fa-heart-broken'
              }
              onClick={() => onClickLike('unlike', Unliked)}
            ></i>
            {tag.unlikes.length}
          </span>
        </span>
        {authReducer.user && tag.user === authReducer.user.id ? (
          <span
            className='trash'
            onClick={() => removeTag({ postid, tagid: tag.id })}
          >
            <i className='fas fa-trash-alt'></i>
          </span>
        ) : undefined}
      </div>
    </div>
  );
};
Tagbox.propTypes = {
  authReducer: PropTypes.object.isRequired,
  tag: PropTypes.object.isRequired,
  postid: PropTypes.string.isRequired,
  removeTag: PropTypes.func.isRequired,
  likeUnlikeTag: PropTypes.func.isRequired,
  likeUnlikeTagUndo: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});
export default connect(mapStateToProps, {
  removeTag,
  likeUnlikeTag,
  likeUnlikeTagUndo,
})(Tagbox);
