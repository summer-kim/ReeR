import {
  GET_CONTENT,
  GET_CONTENTS,
  CONTENT_ERROR,
  CREATE_CONTENT,
  //UPDATE_CONTENT,
  LIKE_UPDATE,
  UNLIKE_UPDATE,
  LIKE_ERROR,
  TAG_ADDED,
  TAG_REMOVED,
  TAG_LIKES,
  TAG_UNLIKES,
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
    case TAG_ADDED:
      return {
        ...state,
        content: { ...state.content, tags: [payload, ...state.content.tags] },
        posting: false,
        loading: false,
      };
    case TAG_REMOVED:
      return {
        ...state,
        content: {
          ...state.content,
          tags: state.content.tags.filter((tag) => tag.id !== payload.tagid),
        },
        posting: false,
        loading: false,
      };
    case TAG_LIKES:
      const tagLIKE = state.content.tags;
      const indexLIKE = tagLIKE.findIndex((tag) => tag.id === payload.tagid);
      tagLIKE[indexLIKE].likes = payload.likes;
      return {
        ...state,
        content: {
          ...state.content,
          tags: tagLIKE,
        },
        posting: false,
        loading: false,
      };
    case TAG_UNLIKES:
      const tagUNLIKE = state.content.tags;
      const indexUNLIKE = tagUNLIKE.findIndex(
        (tag) => tag.id === payload.tagid
      );
      tagUNLIKE[indexUNLIKE].unlikes = payload.unlikes;
      return {
        ...state,
        content: {
          ...state.content,
          tags: tagUNLIKE,
        },
        posting: false,
        loading: false,
      };
    case DELETE_CONTENT:
      return {
        ...state,
        contents: state.contents.filter(
          (content) => content.id !== payload.postid
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
