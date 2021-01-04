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
  DELETE_CONTENT,
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
    if (err.response.status === 401) {
      dispatch(setAlert('You need to Login first', 'fail', 3500));
    }
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
    if (err.response.status === 401) {
      dispatch(setAlert('You need to Login first', 'fail', 3500));
    }
  }
};
//get contents in user's likes
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
export const createContent = (formData, postid = '', edit = false) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const body = formData;
    if (postid) {
      body.postid = postid;
    }
    const res = await axios.post('/post', body, config);

    dispatch({
      type: CREATE_CONTENT,
      payload: res.data,
    });
    dispatch(
      setAlert(
        !edit
          ? 'Post has successfully created'
          : 'Post has successfully updated',
        'success'
      )
    );
  } catch (err) {
    dispatch({
      type: CONTENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createContentimg = (data, postid = '', edit = false) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data ',
    },
  };
  try {
    if (postid) {
      data.append('postid', postid);
    }
    const res = await axios.post('/post/img', data, config);

    dispatch({
      type: CREATE_CONTENT,
      payload: res.data,
    });
    dispatch(
      setAlert(
        !edit
          ? 'Post has successfully created'
          : 'Post has successfully updated',
        'success'
      )
    );
  } catch (err) {
    dispatch({
      type: CONTENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert(err.response.data.errors, 'fail'));
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
    dispatch(setAlert('Successfully Liked', 'success'));
  } catch (err) {
    dispatch({
      type: LIKE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    const msg = err.response.data.msg;
    dispatch(setAlert(msg, 'fail'));
  }
};

export const likePostUndo = (postid) => async (dispatch) => {
  try {
    const res = await axios.put(`/post/likesBack/${postid}`);
    dispatch({
      type: LIKE_UPDATE,
      payload: { postid, likes: res.data },
    });
    dispatch(setAlert('Cancel Liked', 'success'));
  } catch (err) {
    dispatch({
      type: LIKE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    const msg = err.response.data.msg;
    dispatch(setAlert(msg, 'fail'));
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
    dispatch(setAlert('Successfully Unliked', 'success'));
  } catch (err) {
    dispatch({
      type: LIKE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    const msg = err.response.data.msg;
    dispatch(setAlert(msg, 'fail'));
  }
};

export const unlikePostUndo = (postid) => async (dispatch) => {
  try {
    const res = await axios.put(`/post/unlikesBack/${postid}`);
    dispatch({
      type: UNLIKE_UPDATE,
      payload: { postid, unlikes: res.data },
    });
    dispatch(setAlert('Cancel Unliked', 'success'));
  } catch (err) {
    dispatch({
      type: LIKE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteContent = (postid) => async (dispatch) => {
  try {
    await axios.delete(`/post/${postid}`);
    dispatch({
      type: DELETE_CONTENT,
      payload: postid,
    });

    dispatch(setAlert('Post has successfully removed', 'success'));
  } catch (err) {
    dispatch({
      type: CONTENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
