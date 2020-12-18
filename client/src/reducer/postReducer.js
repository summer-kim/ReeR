import {
  //GET_CONTENT,
  GET_CONTENTS,
  CONTENT_ERROR,
  //CLEAR_CONTENT,
  //UPDATE_CONTENT,
} from '../action/types';

const initialState = {
  contents: [],
  content: null,
  loading: true,
  error: {},
};

function postReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CONTENTS:
      return {
        ...state,
        contents: payload,
        loading: false,
      };
    case CONTENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        contents: [],
        content: null,
      };
    default:
      return state;
  }
}
export default postReducer;
