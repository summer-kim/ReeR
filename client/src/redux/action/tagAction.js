import axios from 'axios';
import {
  TAG_ERROR,
  TAG_ADDED,
  TAG_REMOVED,
  TAG_LIKES,
  TAG_UNLIKES,
} from './types';
import { setAlert } from './alertAction';

//get all contents
export const addTag = ({ tagName, id }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.put(`/tag/create/${id}`, { tagName }, config);
    dispatch({
      type: TAG_ADDED,
      payload: res.data,
    });
    dispatch(setAlert('Tag has successfully added', 'success'));
  } catch (err) {
    dispatch({
      type: TAG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const removeTag = (tagid) => async (dispatch) => {
  try {
    await axios.put(`/tag/delete/${tagid}`);
    dispatch({
      type: TAG_REMOVED,
      payload: { tagid },
    });
    dispatch(setAlert('Tag has successfully removed', 'success'));
  } catch (err) {
    dispatch({
      type: TAG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const likeTag = ({ undo, tagid }) => async (dispatch) => {
  try {
    const res = await axios.put(
      `/tag/${undo ? 'likesBack' : 'likes'}/${tagid}`
    );
    dispatch({
      type: TAG_LIKES,
      payload: { likes: res.data, tagid },
    });
  } catch (err) {
    dispatch({
      type: TAG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const unlikeTag = ({ undo, tagid }) => async (dispatch) => {
  try {
    const res = await axios.put(
      `/tag/${undo ? 'unlikesBack' : 'unlikes'}/${tagid}`
    );
    dispatch({
      type: TAG_UNLIKES,
      payload: { unlikes: res.data, tagid },
    });
  } catch (err) {
    dispatch({
      type: TAG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
