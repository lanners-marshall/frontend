import {
  SIGNUP_START,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
  LOGIN_START,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  VALIDATE_TOKEN_SUCCESS,
  VALIDATE_TOKEN_FAILURE
} from '../actions/authenticationActions';

const initialState = {
  loading: false,
  error: null,
  loggedIn: false
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_START:
      return { ...state, loading: true, error: null, loggedIn: false };
    case SIGNUP_SUCCESS:
      return { ...state, loading: false, error: null, loggedIn: true };
    case SIGNUP_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        loggedIn: false
      };
    case LOGIN_START:
      return { ...state, loading: true, error: null, loggedIn: false };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, error: null, loggedIn: true };
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        loggedIn: false
      };
    case VALIDATE_TOKEN_SUCCESS:
      return { ...state, loggedIn: true };
    case VALIDATE_TOKEN_FAILURE:
      return { ...state, loggedIn: false };
    default:
      return state;
  }
};

export default authenticationReducer;
