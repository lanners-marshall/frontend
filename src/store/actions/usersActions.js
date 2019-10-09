import axios from 'axios';

export const UPDATE_ACCOUNT_START = 'UPDATE_ACCOUNT_START';
export const UPDATE_ACCOUNT_ERROR = 'UPDATE_ACCOUNT_ERROR';
export const UPDATE_ACCOUNT_SUCCESS = 'UPDATE_ACCOUNT_SUCCESS';

export const DELETE_ACCOUNT_START = 'DELETE_ACCOUNT_START';
export const DELETE_ACCOUNT_ERROR = 'DELETE_ACCOUNT_ERROR';
export const DELETE_ACCOUNT_SUCCESS = 'DELETE_ACCOUNT_SUCCESS';

const URL = 'https://backend206.herokuapp.com';

export const getUsers = () => {};

export const updateAccount = (user, id) => {
  return dispatch => {
    dispatch({ type: UPDATE_ACCOUNT_START });
    axios
      .put(`${URL}/users/${id}`, user)
      .then(response => {
        dispatch({ type: UPDATE_ACCOUNT_SUCCESS, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: UPDATE_ACCOUNT_ERROR, payload: error });
      });
  };
};

export const deleteAccount = id => {
  return dispatch => {
    dispatch({ type: DELETE_ACCOUNT_START });
    axios
      .delete(`${URL}/users/${id}`)
      .then(response => {
        dispatch({ type: DELETE_ACCOUNT_SUCCESS });
      })
      .catch(error => {
        dispatch({ type: UPDATE_ACCOUNT_ERROR });
      });
  };
};
