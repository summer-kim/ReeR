import {
  GET_CONTENT,
  GET_CONTENTS,
  CONTENT_ERROR,
  //CLEAR_CONTENT,
  //UPDATE_CONTENT,
  LIKE_UPDATE,
  UNLIKE_UPDATE,
  LIKE_ERROR,
} from '../action/types';

const initialState = {
  contents: [],
  content: [],
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
        loading: false,
        error: {},
      };
    // case GET_CONTENT:
    //   return {
    //     ...state,
    //     content: state.content.some(
    //       (content) => content._id.toString() === payload._id.toString()
    //     )
    //       ? [...state.content]
    //       : [...state.content.push(payload)],

    //     loading: false,
    //     error: {},
    //   };
    case CONTENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        contents: [],
        content: [],
      };
    case LIKE_UPDATE:
      return {
        ...state,
        contents: state.contents.map((content) =>
          content._id === payload.postid
            ? {
                ...content,
                likes: payload.likes,
              }
            : content
        ),
        loading: false,
        error: {},
      };
    case UNLIKE_UPDATE:
      return {
        ...state,
        contents: state.contents.map((content) =>
          content._id === payload.postid
            ? {
                ...content,
                unlikes: payload.unlikes,
              }
            : content
        ),
        loading: false,
        error: {},
      };
    case LIKE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
export default postReducer;
