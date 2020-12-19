import axios from 'axios';
import {
  //GET_CONTENT,
  GET_CONTENTS,
  CONTENT_ERROR,
  //CLEAR_CONTENT,
  //UPDATE_CONTENT,
  LIKE_ERROR,
  LIKE_UPDATE,
  UNLIKE_UPDATE,
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

export const likePost = (postid) => async (dispatch) => {
  try {
    const res = await axios.put(`/post/likes/${postid}`);
    dispatch({
      type: LIKE_UPDATE,
      payload: { postid, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: LIKE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const likePostUndo = (postid) => async (dispatch) => {
  try {
    const res = await axios.put(`/post/likesBack/${postid}`);
    dispatch({
      type: LIKE_UPDATE,
      payload: { postid, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: LIKE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
