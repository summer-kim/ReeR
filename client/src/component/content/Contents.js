import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';

import ContentQuickShow from './ContentQuickShow';
import { getContents } from '../../redux/action/postAction';
import Spinner from '../layout/spinner';
import { setAlert } from '../../redux/action/alertAction';

import '../../css/movie.css';

const Contents = ({
  getContents,
  authReducer: { isAuthenticated, user },
  postReducer: { contents = [], loading },
  setAlert,
  match,
}) => {
  //Array for get default Contents created by User
  const [ContentsByUser, setContentsByUser] = useState([]);

  //Array for filtered Contents to be showed. This will be initiated by ContentsByUser
  const [FilteredContents, setFilteredContents] = useState([]);

  //String for specific Genre which is selected
  const [GenreSelected, setGenreSelected] = useState('');

  //Bool for initiating FilteredContents
  const [UndoSelect, setUndoSelect] = useState(true);
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

  const switchType = (create, bag, liked, movies) => {
    switch (match.params.type) {
      case 'create':
        return create;
      case 'bag':
        return bag;
      case 'liked':
        return liked;
      default:
        return movies;
    }
  };

  //get Post from server and filtering
  useEffect(() => {
    getContents();
    setContentsByUser(
      contents
        .filter((content) => {
          return switchType(
            content.user === user._id,
            user.myBag.includes(content._id),
            user.likes.includes(content._id),
            true
          );
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date))
    );
  }, [match.params.type]);

  //if ContentsByUser is changed when moved to other pages and so on
  useEffect(() => {
    setFilteredContents(ContentsByUser);
  }, [ContentsByUser]);

  //Undo selecting genre OR get contents from ContentsByUser
  useEffect(() => {
    if (UndoSelect) {
      setFilteredContents(ContentsByUser);
      setUndoSelect(false);
    }
  }, [UndoSelect]);

  //updating Contents depends on genre selected
  useEffect(() => {
    if (GenreSelected) {
      const justSelected = ContentsByUser.filter((content) =>
        content.genre.includes(GenreSelected)
      );
      if (justSelected.length === 0) {
        setAlert(`Contents of ${GenreSelected} has not been created yet`);
        setGenreSelected('');
        setUndoSelect(true);
        return;
      }
      setFilteredContents(justSelected);
    }
  }, [GenreSelected]);

  //when user choose specific genre
  const onClickGenre = (e) => {
    if (GenreSelected == e.target.innerHTML) {
      setGenreSelected('');
      setUndoSelect(true);
    } else {
      setGenreSelected(e.target.innerHTML);
    }
  };

  //when user select specific order
  const onChangeSort = (e) => {
    if (e.target.value == 'Liked') {
      // sort by number of likes
      setFilteredContents(
        [...FilteredContents].sort((a, b) => b.likes.length - a.likes.length)
      );
    } else {
      // sort by time
      setFilteredContents(
        [...FilteredContents].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        )
      );
    }
  };

  if (!isAuthenticated) {
    return <Redirect to='/' />;
  }
  return (
    <Fragment>
      <section id='main-filter'>
        <div className='filter flex-container'>
          <div className='flex-container'>
            <div className='sort'>
              <select name='sort' defaultValue='sort' onChange={onChangeSort}>
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
                          GenreSelected == genre ? 'picked' : undefined
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
          {match.params.type === 'all' && (
            <div className='flex-container'>
              <Link
                to='/makepost'
                onClick={(e) => {
                  if (!isAuthenticated) {
                    e.preventDefault();
                    return setAlert('You need to Login first');
                  }
                }}
              >
                <div className='icons btn-main'>
                  <i className='fas fa-plus flex-container'></i>
                </div>
              </Link>
              <Link
                to='/contents/bag'
                onClick={(e) => {
                  if (!isAuthenticated) {
                    e.preventDefault();
                    return setAlert('You need to Login first');
                  }
                }}
              >
                <div className='icons btn-main'>
                  <i className='fas fa-shopping-bag flex-container'></i>
                </div>
              </Link>
            </div>
          )}
        </div>
      </section>

      <div id='space110'></div>

      <section id='main2' className='chart-down m1 p2 flex-container'>
        <h4 className='title flex-container'>
          <i className='fas fa-heart'></i>
          {switchType('My Post', 'My Bag', 'My Likes', 'Movies')}
        </h4>
        <div className='bottom-line'></div>
        <div id='main2-content' className='grid'>
          {loading ? (
            <Spinner />
          ) : FilteredContents.length > 0 ? (
            FilteredContents.map((content) => (
              <ContentQuickShow key={content._id} content={content} />
            ))
          ) : (
            <h4 className='parag'>No Content Created...</h4>
          )}
        </div>
      </section>
    </Fragment>
  );
};
Contents.propTypes = {
  postReducer: PropTypes.object.isRequired,
  authReducer: PropTypes.object.isRequired,
  getContents: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  postReducer: state.postReducer,
  authReducer: state.authReducer,
});
export default connect(mapStateToProps, { getContents, setAlert })(Contents);
