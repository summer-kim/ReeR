import {
  GET_CONTENT,
  GET_CONTENTS,
  CONTENT_ERROR,
  CREATE_CONTENT,
  //UPDATE_CONTENT,
  LIKE_UPDATE,
  UNLIKE_UPDATE,
  LIKE_ERROR,
  TAG_UPDATE,
  TAG_ERROR,
  DELETE_CONTENT,
} from '../action/types';

const initialState = {
  contents: [],
  content: [],
  posting: false,
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
        content: [],
        posting: false,
        loading: false,
        error: {},
      };
    case GET_CONTENT:
      return {
        ...state,
        content: payload,
        posting: false,
        loading: false,
        error: {},
      };
    case CREATE_CONTENT:
      return {
        ...state,
        posting: true,
        loading: false,
        error: {},
      };
    case CONTENT_ERROR:
      return {
        ...state,
        error: payload,
        posting: false,
        loading: false,
        contents: [],
        content: [],
      };
    case LIKE_UPDATE:
      return {
        ...state,
        contents: state.contents.map((content) =>
          content.id === payload.postid
            ? {
                ...content,
                likes: payload.likes,
              }
            : content
        ),
        content: { ...state.content, likes: payload.likes },
        posting: false,
        loading: false,
        error: {},
      };
    case UNLIKE_UPDATE:
      return {
        ...state,
        contents: state.contents.map((content) =>
          content.id === payload.postid
            ? {
                ...content,
                unlikes: payload.unlikes,
              }
            : content
        ),
        content: { ...state.content, unlikes: payload.unlikes },

        posting: false,
        loading: false,
        error: {},
      };
    case LIKE_ERROR:
    case TAG_ERROR:
      return {
        ...state,
        error: payload,
        posting: false,
        loading: false,
      };
    case TAG_UPDATE:
      return {
        ...state,
        content: { ...state.content, tags: payload },
        posting: false,
        loading: false,
      };
    case DELETE_CONTENT:
      return {
        ...state,
        contents: state.contents.filter(
          (content) => content.id.toString() !== payload
        ),
        content: [],
        posting: false,
        loading: false,
      };
    default:
      return state;
  }
}
export default postReducer;
