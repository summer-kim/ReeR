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
    genre: [],
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
            <div className='eachForm'>
              <label for='genre'>Genre </label>
              <div className='checkGenre'>
                <span className='eachCheck'>
                  <input
                    type='checkbox'
                    name='genre'
                    value='SF'
                    onChange={(e) => onChange(e)}
                  />
                  SF
                </span>
                <span className='eachCheck'>
                  <input
                    type='checkbox'
                    name='genre'
                    value='Fantasy'
                    onChange={(e) => onChange(e)}
                  />
                  Fantasy
                </span>
                <span className='eachCheck'>
                  <input
                    type='checkbox'
                    name='genre'
                    value='Drama'
                    onChange={(e) => onChange(e)}
                  />
                  Drama
                </span>
                <span className='eachCheck'>
                  <input
                    type='checkbox'
                    name='genre'
                    value='Comedy'
                    onChange={(e) => onChange(e)}
                  />
                  Comedy
                </span>
                <span className='eachCheck'>
                  <input
                    type='checkbox'
                    name='genre'
                    value='Horror'
                    onChange={(e) => onChange(e)}
                  />
                  Horror
                </span>
                <span className='eachCheck'>
                  <input
                    type='checkbox'
                    name='genre'
                    value='Thriller'
                    onChange={(e) => onChange(e)}
                  />
                  Thriller
                </span>
                <span className='eachCheck'>
                  <input
                    type='checkbox'
                    name='genre'
                    value='Kids'
                    onChange={(e) => onChange(e)}
                  />
                  Kids
                </span>
                <span className='eachCheck'>
                  <input
                    type='checkbox'
                    name='genre'
                    value='Family'
                    onChange={(e) => onChange(e)}
                  />
                  Family
                </span>
                <span className='eachCheck'>
                  <input
                    type='checkbox'
                    name='genre'
                    value='Animation'
                    onChange={(e) => onChange(e)}
                  />
                  Animation
                </span>
                <span className='eachCheck'>
                  <input
                    type='checkbox'
                    name='genre'
                    value='Action'
                    onChange={(e) => onChange(e)}
                  />
                  Action
                </span>
                <span className='eachCheck'>
                  <input
                    type='checkbox'
                    name='genre'
                    value='Crime'
                    onChange={(e) => onChange(e)}
                  />
                  Crime
                </span>
                <span className='eachCheck'>
                  <input
                    type='checkbox'
                    name='genre'
                    value='Romance'
                    onChange={(e) => onChange(e)}
                  />
                  Romance
                </span>
              </div>
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
