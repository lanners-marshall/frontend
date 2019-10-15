import axios from 'axios';
import jwt from 'jsonwebtoken';

export const SIGNUP_START = 'SIGNUP_START';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const VALIDATE_TOKEN_START = 'VALIDATE_TOKEN_START';
export const VALIDATE_TOKEN_SUCCESS = 'VALIDATE_TOKEN_SUCCESS';
export const VALIDATE_TOKEN_FAILURE = 'VALIDATE_TOKEN_FAILURE';

const URL = 'https://backend206.herokuapp.com';

export const signup = (user, history) => {
  return dispatch => {
    dispatch({ type: SIGNUP_START });
    axios
      .post(`${URL}/users/register`, user)
      .then(response => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user_id', response.data.id);
        localStorage.setItem('name', response.data.name);
        dispatch({ type: SIGNUP_SUCCESS });
        history.push('/notes');
      })
      .catch(error => {
        dispatch({
          type: SIGNUP_ERROR
        });
      });
  };
};

export const loginUser = (user, history) => {
  return dispatch => {
    dispatch({ type: LOGIN_START });
    axios
      .post(`${URL}/users/login`, user)
      .then(response => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user_id', response.data.id);
        localStorage.setItem('name', response.data.name);
        dispatch({ type: LOGIN_SUCCESS });
        history.push('/notes');
      })
      .catch(error => {
        dispatch({ type: LOGIN_ERROR });
      });
  };
};

export const checkToken = () => {
  return dispatch => {
    dispatch({ type: VALIDATE_TOKEN_START });
    const token = localStorage.getItem('token');

    if (!token) {
      localStorage.clear();
      dispatch({ type: VALIDATE_TOKEN_FAILURE });
      return;
    }

    const exp = jwt.decode(token).exp;
    const now = Date.now() / 1000;
    const tokenExpried = now > exp;

    if (tokenExpried) {
      localStorage.clear();
      dispatch({ type: VALIDATE_TOKEN_FAILURE });
      return;
    }

    dispatch({ type: VALIDATE_TOKEN_SUCCESS });
  };
};
