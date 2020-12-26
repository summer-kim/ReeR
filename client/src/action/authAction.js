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
import setAuthToken from '../util/setAuthToken';
import { setAlert } from './alertAction';

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/auth');

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
export const registerUser = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post('/user/register', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (Array.isArray(errors)) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'fail')));
      console.log('arr');
    } else if (errors) {
      dispatch(setAlert(errors, 'fail'));
      console.log('exist');
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
export const loginUser = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/auth/login', body, config);

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
  // dispatch({
  //   type: CLEAR_PROFILE,
  // });
  dispatch({
    type: LOGOUT,
  });
};
export const addToMyBag = (postid) => async (dispatch) => {
  try {
    const res = await axios.put(`/auth/myBag/${postid}`);

    dispatch({
      type: UPDATE_MYBAG,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PUT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const addToMyBagUndo = (postid) => async (dispatch) => {
  try {
    const res = await axios.put(`/auth/myBagUndo/${postid}`);

    dispatch({
      type: UPDATE_MYBAG,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PUT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const addToMylikes = (postid) => async (dispatch) => {
  try {
    const res = await axios.put(`/auth/likes/${postid}`);

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
    const res = await axios.put(`/auth/likesUndo/${postid}`);

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
