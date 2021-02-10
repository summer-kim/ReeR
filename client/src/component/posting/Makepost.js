import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
  createContent,
  createContentimg,
  getContent,
} from '../../redux/action/postAction';
import { setAlert } from '../../redux/action/alertAction';

const Makepost = ({
  setAlert,
  getContent,
  match,
  createContent,
  createContentimg,
  postReducer: { posting, loading, content },
}) => {
  const EditMode = match.params.postid === 'post' ? false : true;

  const [formData, setData] = useState({
    movieName: '',
    summary: '',
    img: '',
    genre: [],
  });

  useEffect(() => {
    if (EditMode) {
      getContent(match.params.postid);
      setData({
        movieName: loading || !content.movieName ? '' : content.movieName,
        summary: loading || !content.summary ? '' : content.summary,
        genre: loading || !content.genre ? '' : content.genre,
      });
    }
  }, [loading]);

  if (posting) {
    return (
      <Redirect
        to={EditMode ? `/post/${match.params.postid}` : '/contents/all'}
      />
    );
  }

  const genreArr = [
    'SF',
    'Fantasy',
    'Drama',
    'Comedy',
    'Horror',
    'Thriller',
    'Kids',
    'Family',
    'Animation',
    'Action',
    'Crime',
    'Romance',
  ];

  const { movieName, summary, genre, img } = formData;
  const onChange = (e) => {
    setData({
      ...formData,
      [e.target.name]:
        e.target.name === 'genre'
          ? formData.genre.some((gen) => gen === e.target.value)
            ? [...formData.genre.filter((gen) => gen !== e.target.value)]
            : [...formData.genre, e.target.value]
          : e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!movieName) {
      return setAlert('You have to fill out the Name of the content');
    }
    if (genre.length === 0) {
      return setAlert('You have to check the Genre of the content');
    }
    if (!summary) {
      return setAlert('You have to fill out the Summary of the content');
    }
    if (summary.length > 200) {
      return setAlert('Summary should not exceed 200 letters');
    }
    if (img) {
      const data = new FormData();
      data.append('movieName', movieName);
      data.append('summary', summary);
      data.append('genre', genre);
      data.append('img', img);
      return createContentimg({ data, postid: EditMode && content._id });
    }
    createContent({ formData, postid: EditMode && content._id });
  };
  return (
    <section class='addPost' id='login'>
      <div id='login-box' class='flex-container'>
        <div class='intro'>
          <h2>{EditMode ? 'Edit Post' : 'Upload Post'}</h2>
          <div class='bottom-line'></div>
          <p class='parag'>
            *You can put a image later
            <br />
            *You can attach a tag later
          </p>
        </div>
        <div class='form'>
          <form onSubmit={(e) => onSubmit(e)}>
            <div class='eachForm'>
              <label htmlFor='movieName'>Movie/Series Title</label>
              <input
                type='text'
                name='movieName'
                value={movieName}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='eachForm'>
              <label htmlFor='genre'>Genre </label>
              <div className='checkGenre'>
                {genreArr.map((gen) => (
                  <span className='eachCheck'>
                    <input
                      type='checkbox'
                      name='genre'
                      value={gen}
                      checked={genre.includes(gen) ? true : false}
                      onChange={(e) => onChange(e)}
                    />
                    {gen}
                  </span>
                ))}
              </div>
            </div>
            <div class='eachForm'>
              <label htmlFor='summary'>Summary</label>
              <textarea
                cols='30'
                rows='5'
                placeholder='write summary of content simply
                (200 letters limit)!'
                name='summary'
                value={summary}
                onChange={(e) => onChange(e)}
              ></textarea>
            </div>
            <div class='eachForm'>
              <label htmlFor='img'>Image</label>
              <span class='guide'>less than 3.14MB</span>
              {EditMode && content.img ? content.img : undefined}
              <input
                type='file'
                name='img'
                onChange={(e) =>
                  setData({ ...formData, img: e.target.files[0] })
                }
              />
            </div>
            <button class='btn-main' type='submit'>
              {EditMode ? 'Edit' : 'Post'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

Makepost.propTypes = {
  getContent: PropTypes.func.isRequired,
  createContent: PropTypes.func.isRequired,
  createContentimg: PropTypes.func.isRequired,
  postReducer: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  postReducer: state.postReducer,
});
export default connect(mapStateToProps, {
  createContent,
  createContentimg,
  setAlert,
  getContent,
})(Makepost);
