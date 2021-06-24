import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  UPDATE_MYBAG,
  UPDATE_MYLIKES,
  PUT_ERROR,
  // CLEAR_PROFILE,
} from './types';
import axios from 'axios';
import { setAlert } from './alertAction';
import setAuthToken from '../../util/setAuthToken';
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const loadUser = () => async (dispatch) => {
  try {
    const res = await axios.get('/user/me');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
export const registerUser = ({ userName, email, password }) => async (
  dispatch
) => {
  const body = JSON.stringify({ userName, email, password });
  try {
    const res = await axios.post('/user/register', body, config);
    localStorage.setItem('token', res.data.token);
    setAuthToken(res.data.token);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const error = err.response.data;
    if (error.msg) {
      dispatch(setAlert(error.msg, 'fail'));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
export const loginUser = ({ email, password }) => async (dispatch) => {
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/user/login', body, config);
    localStorage.setItem('token', res.data.token);
    setAuthToken(res.data.token);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

export const addToMyBag = (postid) => async (dispatch) => {
  try {
    const res = await axios.put(`/user/mybag/${postid}`);

    dispatch({
      type: UPDATE_MYBAG,
      payload: res.data,
    });
    dispatch(setAlert('Successfully add to mybag', 'success'));
  } catch (err) {
    dispatch({
      type: PUT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addToMyBagUndo = (postid) => async (dispatch) => {
  try {
    const res = await axios.put(`/user/mybagUndo/${postid}`);

    dispatch({
      type: UPDATE_MYBAG,
      payload: res.data,
    });
    dispatch(setAlert('Successfully remove from mybag', 'success'));
  } catch (err) {
    dispatch({
      type: PUT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addToMylikes = (postid) => async (dispatch) => {
  try {
    const res = await axios.put(`/user/likes/${postid}`);

    dispatch({
      type: UPDATE_MYLIKES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PUT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addToMylikesUndo = (postid) => async (dispatch) => {
  try {
    const res = await axios.put(`/user/likesUndo/${postid}`);

    dispatch({
      type: UPDATE_MYLIKES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PUT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
