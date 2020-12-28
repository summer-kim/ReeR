import React, { Fragment } from 'react';
import summer from '../../img/summer.jpg';

const About = () => {
  return (
    <Fragment>
      <div id='space80'></div>
      <section id='about1' className='m1 p2 flex-container'>
        <div id='about1-bio' className='p1 flex-container'>
          <div id='about1-bio-img'>
            <img src={summer} alt='CEO' />
          </div>
          <div id='about1-bio-side'>
            <div>
              <h1>About me</h1>
              <div className='bottom-line'></div>
            </div>

            <div>
              <h4>Your Project Is In Safe Hands</h4>
              <p>
                <br />
                The main 5 personalities that define me are <br />
                Creative, Enthusiastic, Innovative, Optimistic, and Supportive.
                <br />
                I'm borned with creativity and If I come up with some idea,
                <br /> I'll be enthusiastic and innovative. And always giving
                optimistic energy <br />
                to my team because of my supportiveness
                <br />
                <br />
                <br />
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id='about2' className='p3'>
        <h2 className='title flex-container'>
          <i className='fas fa-heart'></i>Technical Skills
        </h2>
        <div className='bottom-line'></div>
        <div id='about2-skills' className='flex-container'>
          <div id='about2-skill'>
            <h4>HTML&CSS:</h4>
            <div className='progress'>
              <div style={{ width: '80%' }}></div>
            </div>
          </div>
          <div id='about2-skill'>
            <h4>Self-taught:</h4>
            <div className='progress'>
              <div style={{ width: '100%' }}></div>
            </div>
          </div>
          <div id='about2-skill'>
            <h4>JavaScript:</h4>
            <div className='progress'>
              <div style={{ width: '80%' }}></div>
            </div>
          </div>
          <div id='about2-skill'>
            <h4>React:</h4>
            <div className='progress'>
              <div style={{ width: '50%' }}></div>
            </div>
          </div>
          <div id='about2-skill'>
            <h4>Redux:</h4>
            <div className='progress'>
              <div style={{ width: '70%' }}></div>
            </div>
          </div>
          <div id='about2-skill'>
            <h4>Passion:</h4>
            <div className='progress'>
              <div style={{ width: '100%' }}></div>
            </div>
          </div>
          <div id='about2-skill'>
            <h4>NodeJS:</h4>
            <div className='progress'>
              <div style={{ width: '80%' }}></div>
            </div>
          </div>
          <div id='about2-skill'>
            <h4>MongoDB,Express:</h4>
            <div className='progress'>
              <div style={{ width: '55%' }}></div>
            </div>
          </div>
          <div id='about2-skill'>
            <h4>Data Analaysis:</h4>
            <div className='progress'>
              <div style={{ width: '70%' }}></div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};
export default About;
