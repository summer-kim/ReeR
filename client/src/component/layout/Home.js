import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import sample from '../../img/sample.JPG';
import lala from '../../img/lala.jpg';

const Home = () => {
  return (
    <Fragment>
      <section id='main1' className='p2 flex-container'>
        <h1>
          ReeR:
          <br />
          The Best Platform for Contents
          <span
            className='txt-type'
            data-wait='2200'
            data-words='["Review", "Recommandation", "communication"]'
          ></span>
        </h1>
        <p className='parag'>
          You don't have to wander anymore about what to choose.
          <br />
          Just search on ReeR and get a quick reviews
          <br />
          for your personal taste.
        </p>
        <a href='#' className='btn-light'>
          <i className='fas fa-angle-double-right'></i>Register
        </a>
      </section>
      <section id='main2' className='m1 p2 flex-container'>
        <h4 className='title flex-container'>
          <i className='fas fa-heart'></i>Today's Ranking
        </h4>
        <div className='bottom-line'></div>
        <div id='main2-content' className='grid'>
          <a href='./content.html'>
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
          </a>
          <a href='./content.html'>
            <div className='item'>
              <div className='item-img'>
                <img src='./img/sample.JPG' alt='#' />
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
                <span className='tag'>Teach me the lessons of life</span>
                <span className='tag'>
                  Kind of Horror, but not as much as make screaming
                </span>
                <span className='tag'>My lend Movie top 20</span>
              </div>
            </div>
          </a>
          <a href='./content.html'>
            <div className='item'>
              <div className='item-img'>
                <img src='./img/cinema.jpg' alt='#' />
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
                <div className='tag'>Adventureous</div>
                <div className='tag'>Good to watch at night</div>
                <div className='tag'>My lend Movie top 20</div>
              </div>
            </div>
          </a>
          <a href='./content.html'>
            <div className='item'>
              <div className='item-img'>
                <img src='./img/lala.JPG' alt='#' />
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
          </a>
          <a href='./content.html'>
            <div className='item'>
              <div className='item-img'>
                <img src='./img/sample.JPG' alt='#' />
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
                <span className='tag'>Teach me the lessons of life</span>
                <span className='tag'>
                  Kind of Horror, but not as much as make screaming
                </span>
                <span className='tag'>My lend Movie top 20</span>
              </div>
            </div>
          </a>
          <a href='./content.html'>
            <div className='item'>
              <div className='item-img'>
                <img src='./img/cinema.jpg' alt='#' />
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
                <div className='tag'>Adventureous</div>
                <div className='tag'>Good to watch at night</div>
                <div className='tag'>My lend Movie top 20</div>
              </div>
            </div>
          </a>
        </div>
      </section>
      <section id='main3' className='m1 p2 flex-container'>
        <h4 className='title'>The person who should use ReeR:</h4>
        <div className='bottom-line'></div>
        <div id='main3-content' className='grid'>
          <div className='item txt-center'>
            <div className='item-img'>
              <img src={sample} alt='#' />
              <div className='item-text'>
                <div className='more'>
                  <i className='fas fa-angle-double-right'></i>Go Register!
                </div>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
              quibusdam itaque deserunt facere nulla commodi delectus adipisci
            </p>
          </div>
          <div className='item txt-center'>
            <div className='item-img'>
              <img src={require('../../img/sample.JPG')} alt='#' />
              <div className='item-text'>
                <div className='more'>
                  <i className='fas fa-angle-double-right'></i>Go Register!
                </div>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
              quibusdam itaque deserunt facere nulla commodi delectus adipisci
            </p>
          </div>
          <div className='item txt-center'>
            <div className='item-img'>
              <img src='./img/sample.JPG' alt='#' />
              <div className='item-text'>
                <div className='more'>
                  <i className='fas fa-angle-double-right'></i>Go Register!
                </div>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
              quibusdam itaque deserunt facere nulla commodi delectus adipisci
            </p>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Home;
