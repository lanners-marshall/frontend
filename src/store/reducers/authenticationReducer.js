import {
  SIGNUP_START,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
  LOGIN_START,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  VALIDATE_TOKEN_START,
  VALIDATE_TOKEN_SUCCESS,
  VALIDATE_TOKEN_FAILURE
} from '../actions/authenticationActions';

const initialState = {
  loading: false,
  loginError: null,
  singupError: null,
  loggedIn: false,
  loggedOut: false
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_START:
      return { ...state, loading: true, singupError: null, loggedIn: false };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        singupError: false,
        loggedIn: true
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        loading: false,
        singupError: 'Username Taken',
        loggedIn: false
      };
    case LOGIN_START:
      return { ...state, loading: true, loginError: null, loggedIn: false };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, loginError: null, loggedIn: true };
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        loginError: 'Incorrect Username/Password',
        loggedIn: false
      };
    case VALIDATE_TOKEN_START:
      return { ...state };
    case VALIDATE_TOKEN_SUCCESS:
      return { ...state, loggedIn: true, loggedOut: false };
    case VALIDATE_TOKEN_FAILURE:
      return { ...state, loggedIn: false, loggedOut: true };
    default:
      return state;
  }
};

export default authenticationReducer;
