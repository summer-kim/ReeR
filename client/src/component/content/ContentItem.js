import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  getContent,
  deleteContent,
  likeUnlikeBag,
  likeUnlikeBagUndo,
} from '../../redux/action/postAction';

import { addTag } from '../../redux/action/tagAction';
import { setAlert } from '../../redux/action/alertAction';

import { sortAndLimitTag } from '../../util/sortAndLimitTag';

import Tagbox from './Tagbox';
import logo from '../../img/logo.png';
import '../../css/contentItem.css';

const ContentItem = ({
  setAlert,
  getContent,
  addTag,
  deleteContent,
  postReducer: { content, loading },
  authReducer,
  match,
  history,
  likeUnlikeBag,
  likeUnlikeBagUndo,
}) => {
  useEffect(() => {
    getContent(match.params.postid);
  }, []);

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

  //variables for changing button color depends on User already liked content or not
  const [Liked, setLiked] = useState(false);
  const [Unliked, setUnliked] = useState(false);

  //variable for changing button color depends on myBag already had content or not
  const [Bag, setBag] = useState(false);

  useEffect(() => {
    likes.some((like) => like.user === authReducer.user._id) && setLiked(true);
    unlikes.some((unlike) => unlike.user === authReducer.user._id) &&
      setUnliked(true);
    authReducer.user.myBag.some((list) => list.toString() === _id) &&
      setBag(true);
  }, [content]);

  //when User click like heart button
  const onClick = (type, bool, funct) => {
    bool ? likeUnlikeBagUndo(type, _id) : likeUnlikeBag(type, _id);
    funct(!bool);
  };

  const [tagData, setData] = useState({
    tagName: '',
  });
  const { tagName } = tagData;
  const inputBox = document.getElementById('inputBox');

  const onChange = (e) => setData({ tagName: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (tagName.length > 60) {
      return setAlert('tagName should less than 60 letters', 'fail');
    }
    addTag({ tagData, _id });
    setData({ tagName: '' });
    inputBox.value = '';
  };

  const onClickDelete = (postid) => {
    if (window.confirm('Are you sure to delete ?')) {
      deleteContent(postid);
      history.goBack();
    }
  };
  return (
    <Fragment>
      <div id='space80'></div>
      <section id='about1' className='m1 p2 flex-container'>
        <div id='about1-bio' className='p1 flex-container'>
          <div id='about1-bio-img'>
            <img
              src={
                img
                  ? 'https://summerzzang.s3.ap-northeast-2.amazonaws.com/uploads/' +
                    img
                  : logo
              }
              alt='#'
            />
          </div>
          <div id='about1-bio-side'>
            <div>
              <h1>{movieName}</h1>
              <div className='bottom-line'></div>
            </div>
            <div>
              <div className='summary'>
                <p>{summary}</p>
              </div>
              <div className='info'>
                <span>
                  {' '}
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
                <span className='content-interest'>
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      onClick('like', Liked, setLiked);
                    }}
                    className={Liked ? 'whenliked' : 'heartbtn'}
                  >
                    <i className='fas fa-heart'></i>
                    {likes ? likes.length : 0}
                  </span>
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      onClick('unlike', Unliked, setUnliked);
                    }}
                    className={Unliked ? 'whenliked' : 'heartbtn'}
                  >
                    <i className='fas fa-heart-broken'></i>
                    {unlikes ? unlikes.length : 0}
                  </span>
                </span>
              </div>

              <div className='tags'>{sortAndLimitTag(tags)}</div>
              <div className='side-end flex-container'>
                <div
                  className={Bag ? 'plus iconSelected' : 'plus'}
                  onClick={(e) => {
                    e.preventDefault();
                    onClick('bag', Bag, setBag);
                  }}
                >
                  <i className='fas fa-plus'></i>
                </div>
                {!authReducer.loading &&
                authReducer.user &&
                user === authReducer.user._id ? (
                  <Link className='trash' to={`/editpost/${_id}`}>
                    <i class='fas fa-edit'></i>
                  </Link>
                ) : (
                  ''
                )}
                <div className='trash'>
                  {!authReducer.loading &&
                  authReducer.user &&
                  user === authReducer.user._id ? (
                    <i
                      class='fas fa-trash-alt'
                      onClick={() => onClickDelete(_id)}
                    ></i>
                  ) : (
                    ''
                  )}
                </div>
              </div>
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
            {tags.length > 0 ? (
              tags.map((tag) => <Tagbox tag={tag} postid={_id} key={tag._id} />)
            ) : (
              <h4 className='parag'> No Tag founded </h4>
            )}
          </div>
          <div className='tagInput flex-container'>
            <i className='fas fa-plus'></i>
            <i className='fas fa-hashtag hashTag'></i>
            <form onSubmit={onSubmit}>
              <input
                className='inputBox'
                classtype='text'
                placeholder='Tag Name (50 letters limit)'
                value={tagName}
                onChange={onChange}
                id='inputBox'
              />
              <button className='btn-main' type='submit'>
                ADD
              </button>
            </form>
          </div>
        </div>
      </section>
      <div id='space80'></div>
    </Fragment>
  );
};
ContentItem.propTypes = {
  getContent: PropTypes.func.isRequired,
  deleteContent: PropTypes.func.isRequired,
  postReducer: PropTypes.object.isRequired,
  authReducer: PropTypes.object.isRequired,
  addTag: PropTypes.func.isRequired,
  likeUnlikeBag: PropTypes.func.isRequired,
  likeUnlikeBagUndo: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  postReducer: state.postReducer,
  authReducer: state.authReducer,
});
export default connect(mapStateToProps, {
  setAlert,
  getContent,
  addTag,
  deleteContent,
  likeUnlikeBag,
  likeUnlikeBagUndo,
})(ContentItem);
