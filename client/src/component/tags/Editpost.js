import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import {
  createContent,
  createContentimg,
  getContent,
} from '../../action/postAction';
import { setAlert } from '../../action/alertAction';

const Editpost = ({
  setAlert,
  getContent,
  history,
  match,
  createContent,
  createContentimg,
  postReducer: { posting, loading, content },
}) => {
  const [formData, setData] = useState({
    movieName: '',
    summary: '',
    img: '',
    genre: [],
  });

  useEffect(() => {
    getContent(match.params.postid);
    setData({
      movieName: loading || !content.movieName ? '' : content.movieName,
      summary: loading || !content.summary ? '' : content.summary,
      genre: loading || !content.genre ? '' : content.genre,
    });
  }, [loading]);

  if (posting) {
    return <Redirect to={`/post/${match.params.postid}`} />;
  }
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

  const onSubmit = async (e) => {
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
      return createContentimg(data, content._id, true);
    }
    createContent(formData, content._id, true);
  };
  return (
    <section class='addPost' id='register'>
      <div id='register-box' class='flex-container'>
        <div class='intro'>
          <h2>Edit Post</h2>
          <div class='bottom-line'></div>
          <p class='parag'>*You can edit post in here</p>
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
                    checked={genre.includes('SF') ? true : false}
                    onChange={(e) => onChange(e)}
                  />
                  SF
                </span>
                <span className='eachCheck'>
                  <input
                    type='checkbox'
                    name='genre'
                    value='Fantasy'
                    checked={genre.includes('Fantasy') ? true : false}
                    onChange={(e) => onChange(e)}
                  />
                  Fantasy
                </span>
                <span className='eachCheck'>
                  <input
                    type='checkbox'
                    name='genre'
                    value='Drama'
                    checked={genre.includes('Drama') ? true : false}
                    onChange={(e) => onChange(e)}
                  />
                  Drama
                </span>
                <span className='eachCheck'>
                  <input
                    type='checkbox'
                    name='genre'
                    value='Comedy'
                    checked={genre.includes('Comedy') ? true : false}
                    onChange={(e) => onChange(e)}
                  />
                  Comedy
                </span>
                <span className='eachCheck'>
                  <input
                    type='checkbox'
                    name='genre'
                    value='Horror'
                    checked={genre.includes('Horror') ? true : false}
                    onChange={(e) => onChange(e)}
                  />
                  Horror
                </span>
                <span className='eachCheck'>
                  <input
                    type='checkbox'
                    name='genre'
                    value='Thriller'
                    checked={genre.includes('Thriller') ? true : false}
                    onChange={(e) => onChange(e)}
                  />
                  Thriller
                </span>
                <span className='eachCheck'>
                  <input
                    type='checkbox'
                    name='genre'
                    value='Kids'
                    checked={genre.includes('Kids') ? true : false}
                    onChange={(e) => onChange(e)}
                  />
                  Kids
                </span>
                <span className='eachCheck'>
                  <input
                    type='checkbox'
                    name='genre'
                    value='Family'
                    checked={genre.includes('Family') ? true : false}
                    onChange={(e) => onChange(e)}
                  />
                  Family
                </span>
                <span className='eachCheck'>
                  <input
                    type='checkbox'
                    name='genre'
                    value='Animation'
                    checked={genre.includes('Animation') ? true : false}
                    onChange={(e) => onChange(e)}
                  />
                  Animation
                </span>
                <span className='eachCheck'>
                  <input
                    type='checkbox'
                    name='genre'
                    value='Action'
                    checked={genre.includes('Action') ? true : false}
                    onChange={(e) => onChange(e)}
                  />
                  Action
                </span>
                <span className='eachCheck'>
                  <input
                    type='checkbox'
                    name='genre'
                    value='Crime'
                    checked={genre.includes('Crime') ? true : false}
                    onChange={(e) => onChange(e)}
                  />
                  Crime
                </span>
                <span className='eachCheck'>
                  <input
                    type='checkbox'
                    name='genre'
                    value='Romance'
                    checked={genre.includes('Romance') ? true : false}
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
              <span class='guide'>less than 3.14MB</span>
              <input
                type='file'
                name='img'
                onChange={(e) =>
                  setData({ ...formData, img: e.target.files[0] })
                }
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

Editpost.propTypes = {
  setAlert: PropTypes.func.isRequired,
  getContent: PropTypes.func.isRequired,
  createContent: PropTypes.func.isRequired,
  createContentimg: PropTypes.func.isRequired,
  postReducer: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  postReducer: state.postReducer,
});
export default connect(mapStateToProps, {
  setAlert,
  getContent,
  createContent,
  createContentimg,
})(withRouter(Editpost));
