import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addTag } from '../../redux/action/tagAction';
import { setAlert } from '../../redux/action/alertAction';

import { useDetectWidth } from '../hook/useDetectWidth';
import Tagbox from './Tagbox';

const TagSection = ({ tags, _id, setAlert, addTag }) => {
  const [tagName, setTag] = useState('');
  const InnerWidth = useDetectWidth();

  const onChange = (e) => setTag(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    if (tagName.length > 60) {
      return setAlert('tagName should less than 60 letters', 'fail');
    }
    addTag({ tagName, _id });
    setTag('');

    const inputBox = document.getElementById('inputBox');
    inputBox.value = '';
  };

  return (
    <section id='aboutTag' className='p1 m1'>
      <h4 className='title'>
        <i className='fas fa-heart'></i>Tag List
      </h4>
      <div className='tagBox p1'>
        <div className={InnerWidth > 768 ? ' grid' : 'tagList'}>
          {tags.length > 0 ? (
            tags.map((tag) => <Tagbox tag={tag} postid={_id} key={tag._id} />)
          ) : (
            <h4 className='parag'> No Tag founded </h4>
          )}
        </div>
        <div className='tagInput flex-container'>
          <i className='fas fa-plus'></i>
          <i className='fas fa-hashtag hashTag'></i>
          <form onSubmit={onSubmit}>
            <input
              className='inputBox'
              classtype='text'
              placeholder='Tag Name (50 letters limit)'
              value={tagName}
              onChange={onChange}
              id='inputBox'
            />
            <button className='btn-main' type='submit'>
              ADD
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
TagSection.propTypes = {
  addTag: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};
export default connect(null, { addTag, setAlert })(TagSection);
