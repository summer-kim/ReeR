import axios from 'axios';
import {
  GET_CONTENT,
  GET_CONTENTS,
  CONTENT_ERROR,
  CREATE_CONTENT,
  LIKE_ERROR,
  LIKE_UPDATE,
  UNLIKE_UPDATE,
  DELETE_CONTENT,
} from './types';
import { setAlert } from './alertAction';
import {
  addToMylikes,
  addToMylikesUndo,
  addToMyBag,
  addToMyBagUndo,
} from './authAction';
import { AxiosResponse } from 'axios';

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

//create content
export const createContent = ({ formData, postid = '' }) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    let res;
    if (postid) {
      res = await axios.put(`/post/update/${postid}`, formData, config);
    } else {
      res = await axios.post('/post/create', formData, config);
    }

    dispatch({
      type: CREATE_CONTENT,
      payload: res.data,
    });
    dispatch(
      setAlert(
        !postid
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

export const createContentimg = ({ data, postid = '' }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data ',
    },
  };
  try {
    let res;
    if (postid) {
      res = await axios.put(`/post/updateImg/${postid}`, data, config);
    } else {
      res = await axios.post('/post/createImg', data, config);
    }

    dispatch({
      type: CREATE_CONTENT,
      payload: res.data,
    });
    dispatch(
      setAlert(
        !postid
          ? 'Post has successfully created'
          : 'Post has successfully updated',
        'success'
      )
    );
  } catch (err) {
    console.log(err.response.data);
    dispatch({
      type: CONTENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert(err.response.data.errors, 'fail'));
  }
};
//like
export const likeUnlikeBag = (type, postid) => async (dispatch) => {
  try {
    if (type === 'bag') {
      dispatch(addToMyBag(postid));
      return;
    }
    const res = await axios.put(`/post/${type}s/${postid}`);
    if (type === 'like') {
      dispatch({
        type: LIKE_UPDATE,
        payload: { postid, likes: res.data },
      });
      dispatch(addToMylikes(postid));
    } else {
      dispatch({
        type: UNLIKE_UPDATE,
        payload: { postid, unlikes: res.data },
      });
    }
    dispatch(setAlert(`Successfully ${type}d`, 'success'));
  } catch (err) {
    dispatch({
      type: LIKE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    const msg = err.response.data.msg;
    dispatch(setAlert(msg, 'fail'));
  }
};

export const likeUnlikeBagUndo = (type, postid) => async (dispatch) => {
  try {
    if (type === 'bag') {
      dispatch(addToMyBagUndo(postid));
      return;
    }
    const res = await axios.put(`/post/${type}sBack/${postid}`);
    if (type === 'like') {
      dispatch({
        type: LIKE_UPDATE,
        payload: { postid, likes: res.data },
      });
      dispatch(addToMylikesUndo(postid));
    } else {
      dispatch({
        type: UNLIKE_UPDATE,
        payload: { postid, unlikes: res.data },
      });
    }
    dispatch(setAlert(`Cancel ${type}d`, 'success'));
  } catch (err) {
    dispatch({
      type: LIKE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    const msg = err.response.data.msg;
    dispatch(setAlert(msg, 'fail'));
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
