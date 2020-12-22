import axios from 'axios';
import {
  GET_CONTENT,
  GET_CONTENTS,
  CONTENT_ERROR,
  //CLEAR_CONTENT,
  //UPDATE_CONTENT,
  LIKE_ERROR,
  LIKE_UPDATE,
  UNLIKE_UPDATE,
} from './types';

//get all contents
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

//get contents in user's myBag
export const getContentMyBag = () => async (dispatch) => {
  try {
    const res = await axios.get('/post/myBag');
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
//like
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

//unlike
export const unlikePost = (postid) => async (dispatch) => {
  try {
    const res = await axios.put(`/post/unlikes/${postid}`);
    dispatch({
      type: UNLIKE_UPDATE,
      payload: { postid, unlikes: res.data },
    });
  } catch (err) {
    dispatch({
      type: LIKE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const unlikePostUndo = (postid) => async (dispatch) => {
  try {
    const res = await axios.put(`/post/unlikesBack/${postid}`);
    dispatch({
      type: UNLIKE_UPDATE,
      payload: { postid, unlikes: res.data },
    });
  } catch (err) {
    dispatch({
      type: LIKE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
