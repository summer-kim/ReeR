import axios from 'axios';
import { ADD_TAG, TAG_ERROR } from './types';

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
      type: ADD_TAG,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TAG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
