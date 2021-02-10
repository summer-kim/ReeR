import React from 'react';
import { Link } from 'react-router-dom';

//img
import decision from '../../img/decision.jpg';
import dislike from '../../img/dislike.jpg';
import like from '../../img/like.jpg';

const HomeBottom = () => {
  return (
    <section id='main3' className='m1 p2 flex-container'>
      <h4 className='title'>The person who should use ReeR:</h4>
      <div className='bottom-line'></div>
      <div id='main3-content' className='grid'>
        <div className='item txt-center'>
          <div className='item-img'>
            <img src={decision} alt='#' />
            <div className='item-text'>
              <Link className='more' to='/login'>
                <i className='fas fa-angle-double-right'></i>Go Register!
              </Link>
            </div>
          </div>
          <p>
            If you ever hesitated
            <br /> because you didn't know <br />
            what Movie or Series to choose,
          </p>
        </div>
        <div className='item txt-center'>
          <div className='item-img'>
            <img src={dislike} style={{ objectFit: 'contain' }} alt='#' />
            <div className='item-text'>
              <Link className='more' to='/login'>
                <i className='fas fa-angle-double-right'></i>Go Register!
              </Link>
            </div>
          </div>
          <p>
            If you dislike
            <br /> spending your time on searching
            <br />
            what Movie or Series to watch,
          </p>
        </div>
        <div className='item txt-center'>
          <div className='item-img'>
            <img src={like} alt='#' />
            <div className='item-text'>
              <Link className='more' to='/login'>
                <i className='fas fa-angle-double-right'></i>Go Register!
              </Link>
            </div>
          </div>
          <p>
            <br />
            if you like something <br />
            Convenient and Efficient
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeBottom;
