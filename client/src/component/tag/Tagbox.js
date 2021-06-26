import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeTag, likeTag, unlikeTag } from '../../redux/action/tagAction';
import '../../css/tagbox.css';

import { usePressLike } from '../hook/usePressLike'; //custom hook for interaction with like, unlike, bag button

const Tagbox = ({ tag, authReducer, removeTag, likeTag, unlikeTag }) => {
  // const [TagLikesNum, setTagLikesNum] = useState(0);
  // const [TagUnlikesNum, setTagUnlikesNum] = useState(0);
  const { Liked, Unliked, onClickSet, LikeNum } = usePressLike({
    likes: tag.likes,
    unlikes: tag.unlikes,
    authUser: authReducer.user,
  });

  const onClickLike = ({ undo, unlike }) => {
    unlike
      ? unlikeTag({ undo, tagid: tag.id })
      : likeTag({ undo, tagid: tag.id });
    onClickSet(unlike ? 'unlike' : 'like');
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
              onClick={() => onClickLike({ undo: Liked, unlike: false })}
            ></i>
            {LikeNum.like}
          </span>
          <span className='interest'>
            <i
              className={
                Unliked ? 'fas fa-heart-broken clicked' : 'fas fa-heart-broken'
              }
              onClick={() => onClickLike({ undo: Unliked, unlike: true })}
            ></i>
            {LikeNum.unlike}
          </span>
        </span>
        {authReducer.user && tag.userId === authReducer.user.id ? (
          <span className='trash' onClick={() => removeTag(tag.id)}>
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
  postid: PropTypes.number.isRequired,
  removeTag: PropTypes.func.isRequired,
  likeTag: PropTypes.func.isRequired,
  unlikeTag: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});
export default connect(mapStateToProps, {
  removeTag,
  likeTag,
  unlikeTag,
})(Tagbox);
