import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import lala from '../../img/lala.jpg';

const ContentSitem = () => {
  return (
    <Link to='/content'>
      <div className='item'>
        <div className='item-img'>
          <img src={lala} alt='#' />
          <div className='item-text'>
            <div className='emoji emoji-heart'>
              <i className='fas fa-heart'></i>
            </div>
            <div className='emoji emoji-broken'>
              <i className='fas fa-heart-broken'></i>
            </div>
            <div className='emoji emoji-plus'>
              <i className='fas fa-plus'></i>
            </div>
          </div>
        </div>
        <div>
          <span className='movieTitle'>Gone with wind</span>
        </div>
        <div className='info'>
          <span className='genre'> Adventure/SF </span>
          <span className='interest'>
            <i className='fas fa-heart'></i>98
          </span>
        </div>
        <div className='tags'>
          <span className='tag'>Adventureous</span>
          <span className='tag'>Good to watch at night</span>
          <span className='tag'>Teach me the lessons of life</span>
        </div>
      </div>
    </Link>
  );
};
export default ContentSitem;
