import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';

import ContentQuickShow from './ContentQuickShow';
import { getContents } from '../../redux/action/postAction';
import { setAlert } from '../../redux/action/alertAction';
import { useDetectWidth } from '../hook/useDetectWidth';

import Spinner from '../template/spinner';

import '../../css/movie.css';

const Contents = ({
  getContents,
  authReducer: { isAuthenticated, user },
  postReducer: { contents = [], loading, content },
  setAlert,
  match,
}) => {
  //Array for get default Contents created by User (for back-up)
  const [ContentsInit, setContentsInit] = useState([]);

  //Array for filtered Contents to be showed. This will be initiated by ContentsInit
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

  const titleObj = {
    //Object for choose proper title depends on match.params
    create: 'My Post',
    bag: 'My Bag',
    liked: 'My Likes',
    all: 'Movies',
  };

  const getArray = (contents) => {
    if (match.params.type === 'all') {
      return contents;
    }

    switch (match.params.type) {
      case 'create':
        return [...contents.filter((content) => content.user === user._id)];
      case 'bag':
        return [
          ...contents.filter((content) => user.mybag.includes(content._id)),
        ];
      case 'liked':
        return [
          ...contents.filter((content) => user.likes.includes(content._id)),
        ];
      default:
        break;
    }
  };

  //get Post from server and filtering depends on match.params
  useEffect(() => {
    if (!loading) {
      getContents();
    }
  }, [match.params.type, contents.length]);

  //put contents from Server Data to ContentsInit
  useEffect(() => {
    if (!loading) {
      const arrayObj = getArray(contents).sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setContentsInit(arrayObj);
    }
  }, [content]);

  //if ContentsInit is changed when moved to other pages and so on
  useEffect(() => {
    setFilteredContents(ContentsInit);
  }, [ContentsInit]);

  //Undo selecting genre OR get contents from ContentsInit
  useEffect(() => {
    if (UndoSelect) {
      setFilteredContents(ContentsInit);
      setUndoSelect(false);
    }
  }, [UndoSelect]);

  //updating Contents depends on genre selected
  useEffect(() => {
    if (GenreSelected) {
      const justSelected = ContentsInit.filter((content) =>
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

  const onClickBtn = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      return setAlert('You need to Login first');
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

  const InnerWidth = useDetectWidth();

  if (!isAuthenticated && match.params.type !== 'all') {
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
          <div className='flex-container'>
            {match.params.type === 'all' &&
              ['makepost/post', 'contents/bag'].map((type) => (
                <Link to={'/' + type} onClick={onClickBtn}>
                  <div className='icons btn-main'>
                    <i
                      className={
                        type === 'makepost/post'
                          ? 'fas fa-plus flex-container'
                          : 'fas fa-shopping-bag flex-container'
                      }
                    ></i>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <div id={InnerWidth > 768 ? 'space90' : 'space130'}></div>

      <section
        id='main2'
        className={
          'chart-down m1 flex-container' + InnerWidth > 768 ? ' p2' : undefined
        }
      >
        <h4 className='title flex-container'>
          <i className='fas fa-heart'></i>
          {titleObj[match.params.type]}
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
