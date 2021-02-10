import axios from 'axios';
import { TAG_UPDATE, TAG_ERROR } from './types';
import { setAlert } from './alertAction';

//get all contents
export const addTag = ({ tagName, _id }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.put(`/post/tags/${_id}`, { tagName }, config);
    dispatch({
      type: TAG_UPDATE,
      payload: res.data,
    });
    dispatch(setAlert('Tag has successfully added', 'success'));
  } catch (err) {
    dispatch({
      type: TAG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const removeTag = ({ postid, tagid }) => async (dispatch) => {
  try {
    const res = await axios.put(`/post/tags/delete/${postid}/${tagid}`);
    dispatch({
      type: TAG_UPDATE,
      payload: res.data,
    });
    dispatch(setAlert('Tag has successfully removed', 'success'));
  } catch (err) {
    dispatch({
      type: TAG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const likeUnlikeTag = ({ type, postid, tagid }) => async (dispatch) => {
  try {
    const res = await axios.put(`/post/tags/${type}s/${postid}/${tagid}`);
    dispatch({
      type: TAG_UPDATE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TAG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const likeUnlikeTagUndo = ({ type, postid, tagid }) => async (
  dispatch
) => {
  try {
    const res = await axios.put(`/post/tags/${type}sBack/${postid}/${tagid}`);
    dispatch({
      type: TAG_UPDATE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TAG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
