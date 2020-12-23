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
} from '../action/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  error: {},
};
function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        token: localStorage.getItem('token'),
        isAuthenticated: true,
        loading: false,
        user: payload,
        error: {},
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        error: {},
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: {},
      };
    case UPDATE_MYBAG:
      return {
        ...state,
        loading: false,
        user: { ...state.user, myBag: payload },
        error: {},
      };
    case UPDATE_MYLIKES:
      return {
        ...state,
        loading: false,
        user: { ...state.user, likes: payload },
        error: {},
      };
    case PUT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
export default authReducer;
