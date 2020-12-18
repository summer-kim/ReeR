import React, { Fragment } from 'react';

const contentItem = () => {
  return (
    <Fragment>
      <div id='space80'></div>
      <section id='about1' className='m1 p2 flex-container'>
        <div id='about1-bio' className='p1 flex-container'>
          <div id='about1-bio-img'>
            <img src='./img/lala.jpg' alt='' />
          </div>
          <div id='about1-bio-side'>
            <div>
              <h1>LaLa Land</h1>
              <div className='bottom-line'></div>
            </div>
            <div>
              <div className='info'>
                <span className='genre'> Adventure/SF </span>
                <span className='interest'>
                  <i className='fas fa-heart'></i>98
                </span>
              </div>
              <div className='summary'>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Perspiciatis nostrum, eaque velit ipsam facilis sed, quisquam
                  nesciunt unde nihil voluptatum commodi consequuntur molestiae?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dolorum, tempore!
                </p>
              </div>
              <div className='tags'>
                <span className='tag'>
                  <span>#</span>Adventureous
                </span>
                <span className='tag'>
                  <span>#</span>Good to watch at night
                </span>
                <span className='tag'>
                  <span>#</span>Teach me the lessons of life
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id='aboutTag' className='p1 m1'>
        <h4 className='title'>
          <i className='fas fa-heart'></i>Tag List
        </h4>
        <div className='tagBox p1'>
          <div className='tagList grid'>
            <div className='tag'>
              <div className='tagName flex-container'>
                <i className='fas fa-hashtag'></i>Adventureous
              </div>
              <div className='people-like'>
                <span className='interest'>
                  {' '}
                  <i className='fas fa-heart'></i>98
                </span>
                <span className='interest'>
                  <i className='fas fa-heart-broken'></i>100
                </span>
              </div>
            </div>
            <div className='tag'>
              <div className='tagName flex-container'>
                <i className='fas fa-hashtag'></i>Lorem ipsum dolor sit amet,
                consectetur adipisicing.
              </div>
              <div className='people-like'>
                <span className='interest'>
                  {' '}
                  <i className='fas fa-heart'></i>98{' '}
                </span>
                <span className='interest'>
                  <i className='fas fa-heart-broken'></i>100
                </span>
              </div>
            </div>
            <div className='tag'>
              <div className='tagName flex-container'>
                <i className='fas fa-hashtag'></i>Adventureous
              </div>
              <div className='people-like'>
                <span className='interest'>
                  <i className='fas fa-heart'></i>98
                </span>
                <span className='interest'>
                  <i className='fas fa-heart-broken'></i>100
                </span>
              </div>
            </div>
            <div className='tag'>
              <div className='tagName flex-container'>
                <i className='fas fa-hashtag'></i>Lorem ipsum dolor sit amet
                consectetur adipisicing elit.
              </div>
              <div className='people-like'>
                <span className='interest'>
                  <i className='fas fa-heart'></i>98
                </span>
                <span className='interest'>
                  <i className='fas fa-heart-broken'></i>100
                </span>
              </div>
            </div>
            <div className='tag'>
              <div className='tagName flex-container'>
                <i className='fas fa-hashtag'></i>Adventureous
              </div>
              <div className='people-like'>
                <span className='interest'>
                  <i className='fas fa-heart'></i>98
                </span>
                <span className='interest'>
                  <i className='fas fa-heart-broken'></i>100
                </span>
              </div>
            </div>
            <div className='tag'>
              <div className='tagName flex-container'>
                <i className='fas fa-hashtag'></i>Lorem ipsum dolor sit amet.
              </div>
              <div className='people-like'>
                <span className='interest'>
                  <i className='fas fa-heart'></i>98
                </span>
                <span className='interest'>
                  <i className='fas fa-heart-broken'></i>100
                </span>
              </div>
            </div>
            <div className='tag'>
              <div className='tagName flex-container'>
                <i className='fas fa-hashtag'></i>Lorem ipsum dolor sit.
              </div>
              <div className='people-like'>
                <span className='interest'>
                  <i className='fas fa-heart'></i>98
                </span>
                <span className='interest'>
                  <i className='fas fa-heart-broken'></i>100
                </span>
              </div>
            </div>
            <div className='tag'>
              <div className='tagName flex-container'>
                <i className='fas fa-hashtag'></i>Lorem ipsum dolor sit amet
                consectetur.
              </div>
              <div className='people-like'>
                <span className='interest'>
                  <i className='fas fa-heart'></i>98
                </span>
                <span className='interest'>
                  <i className='fas fa-heart-broken'></i>100
                </span>
              </div>
            </div>
          </div>
          <div className='tagInput flex-container'>
            <i className='fas fa-plus'></i>
            <i className='fas fa-hashtag hashTag'></i>
            <input
              className='inputBox'
              classtype='text'
              placeholder='Tag Name (50 letters limit)'
            />
            <input className='btn-main' type='submit' value='ADD' />
          </div>
        </div>
      </section>
      <div id='space80'></div>
    </Fragment>
  );
};
export default contentItem;
