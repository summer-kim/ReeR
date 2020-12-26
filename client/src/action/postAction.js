import axios from 'axios';
import {
  GET_CONTENT,
  GET_CONTENTS,
  CONTENT_ERROR,
  CREATE_CONTENT,
  //UPDATE_CONTENT,
  LIKE_ERROR,
  LIKE_UPDATE,
  UNLIKE_UPDATE,
} from './types';
import { setAlert } from './alertAction';

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
//get content by postid
export const getContent = (postid) => async (dispatch) => {
  try {
    const res = await axios.get(`/post/${postid}`);
    dispatch({
      type: GET_CONTENT,
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
//get contents in user's myBag
export const getContentMylikes = () => async (dispatch) => {
  try {
    const res = await axios.get('/post/likes');
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

//create content
export const createContent = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/post', formData, config);
    dispatch({
      type: CREATE_CONTENT,
      payload: res.data,
    });
    dispatch(setAlert('Post has successfully created', 'success'));
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
