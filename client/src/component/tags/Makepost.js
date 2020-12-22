import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { createContent } from '../../action/postAction';

const Makepost = ({ createContent, history, postReducer: { posting } }) => {
  const [formData, setData] = useState({
    movieName: '',
    summary: '',
    img: '',
    genre: '',
  });
  if (posting) {
    return <Redirect to='/tags' />;
  }
  const { movieName, summary, img, genre } = formData;
  const onChange = (e) => {
    setData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    createContent(formData, history);
  };
  return (
    <section class='addPost' id='register'>
      <div id='register-box' class='flex-container'>
        <div class='intro'>
          <h2>Upload Post</h2>
          <div class='bottom-line'></div>
          <p class='parag'>
            *image is not necessary
            <br />
            *You can attach a tag later
          </p>
        </div>
        <div class='form'>
          <form onSubmit={(e) => onSubmit(e)}>
            <div class='eachForm'>
              <label for='movieName'>Movie/Series Title</label>
              <input
                type='text'
                name='movieName'
                value={movieName}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div class='eachForm'>
              <label for='genre'>Genre </label>
              <span class='guide'>Separate them with comma ( , )</span>
              <input
                type='text'
                name='genre'
                value={genre}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div class='eachForm'>
              <label for='summary'>Summary</label>
              <textarea
                cols='30'
                rows='5'
                placeholder='write summary of content simply!'
                name='summary'
                value={summary}
                onChange={(e) => onChange(e)}
              ></textarea>
            </div>
            <div class='eachForm'>
              <label for='img'>Image</label>
              <span class='guide'>Not necessary</span>
              <input
                type='file'
                name='img'
                value={img}
                onChange={(e) => onChange(e)}
              />
            </div>
            <button class='btn-main' type='submit'>
              Post
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

Makepost.propTypes = {
  createContent: PropTypes.func.isRequired,
  postReducer: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  postReducer: state.postReducer,
});
export default connect(mapStateToProps, { createContent })(
  withRouter(Makepost)
);
