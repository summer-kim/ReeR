import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import ContentSitem from '../content/ContentSitem';
import { getContents } from '../../redux/action/postAction';
import Spinner from '../layout/spinner';
import { setAlert } from '../../redux/action/alertAction';

const Mypost = ({
  getContents,
  authReducer: { isAuthenticated, user },
  postReducer: { contents = [], loading },
  setAlert,
}) => {
  const [filteredContents, setFilteredContents] = useState([]);
  const [genreSelected, setGenreSelected] = useState('');
  const [undoSelect, setUndoSelect] = useState(true);
  const genres = [
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

  useEffect(() => {
    if (undoSelect) {
      getContents();
      setFilteredContents(
        contents.filter((content) => content.user === user._id)
      );
      setUndoSelect(false);
    }
  }, [undoSelect]);

  useEffect(() => {
    if (genreSelected) {
      const justSelected = filteredContents.filter((content) =>
        content.genre.includes(genreSelected)
      );
      if (justSelected.length === 0) {
        setAlert(`Contents of ${genreSelected} has not been created yet`);
        setGenreSelected('');
        setUndoSelect(true);
        return;
      }
      setFilteredContents(justSelected);
    }
  }, [genreSelected]);

  if (!isAuthenticated) {
    return <Redirect to='/' />;
  }
  const onClickGenre = (e) => {
    if (genreSelected == e.target.innerHTML) {
      setGenreSelected('');
      setUndoSelect(true);
    } else {
      setGenreSelected(e.target.innerHTML);
    }
  };

  // const sortSelected = (e) => {
  //   setData({ ...sortedData, sort: e.target.value });
  // };
  // if (sort === 'Liked') {
  //   if (contentsMarked.length > 0) {
  //     contentsMarked.sort((a, b) => b.likes.length - a.likes.length);
  //   } else {
  //     contents.sort((a, b) => b.likes.length - a.likes.length);
  //   }
  // }
  // if (sort === 'Newest') {
  //   if (contentsMarked.length > 0) {
  //     contentsMarked.sort((a, b) => new Date(b.date) - new Date(a.date));
  //   } else {
  //     contents.sort((a, b) => new Date(b.date) - new Date(a.date));
  //   }
  // }
  return (
    <Fragment>
      <section id='main-filter'>
        <div className='filter flex-container'>
          <div className='flex-container'>
            <div className='sort'>
              <select name='sort' value=''>
                <option value='Newest'>Newest</option>
                <option value='Liked'>Liked Number</option>
              </select>
            </div>
            <div>
              <div className='sort-part'>
                Category<i className='fas fa-sort-down arrow'></i>
                <input type='checkbox' className='toggler' />
                <div className='hidden'>
                  <div>
                    {genres.map((genre, idx) => (
                      <span
                        onClick={onClickGenre}
                        className={
                          genreSelected == genre ? 'picked' : undefined
                        }
                        key={idx}
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id='space110'></div>

      <section id='main2' className='chart-down m1 p2 flex-container'>
        <h4 className='title flex-container'>
          <i className='fas fa-heart'></i>My Post
        </h4>
        <div className='bottom-line'></div>
        <div id='main2-content' className='grid'>
          {loading ? (
            <Spinner />
          ) : filteredContents ? (
            filteredContents.map((content) => (
              <ContentSitem key={content._id} content={content} />
            ))
          ) : (
            <h4 className='parag'>No Content Created...</h4>
          )}
        </div>
      </section>
    </Fragment>
  );
};
Mypost.propTypes = {
  postReducer: PropTypes.object.isRequired,
  authReducer: PropTypes.object.isRequired,
  getContents: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  postReducer: state.postReducer,
  authReducer: state.authReducer,
});
export default connect(mapStateToProps, { getContents, setAlert })(Mypost);
