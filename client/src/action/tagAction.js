import axios from 'axios';
import { TAG_UPDATE, TAG_ERROR } from './types';

//get all contents
export const addTag = ({ tagData, _id }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.put(`/post/tags/${_id}`, tagData, config);
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
export const removeTag = ({ postid, tagid }) => async (dispatch) => {
  try {
    const res = await axios.put(`/post/tags/delete/${postid}/${tagid}`);
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
