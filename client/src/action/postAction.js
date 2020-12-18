import axios from 'axios';
import {
  //GET_CONTENT,
  GET_CONTENTS,
  CONTENT_ERROR,
  //CLEAR_CONTENT,
  //UPDATE_CONTENT,
} from './types';

export const getContents = () => async (dispatch) => {
  try {
    const res = await axios.get('/post');
    dispatch({
      type: GET_CONTENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CONTENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
