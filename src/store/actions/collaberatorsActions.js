import axios from 'axios';

export const GET_COLLABORATORS_START = 'GET_COLLABORATORS_START';
export const GET_COLLABORATORS_ERROR = 'GET_COLLABORATORS_ERROR';
export const GET_COLLABORATORS_SUCCESS = 'GET_COLLABORATORS_SUCCESS';

export const GET_NOTE_COLLABORATORS_START = 'GET_NOTE_COLLABORATORS_START';
export const GET_NOTE_COLLABORATORS_ERROR = 'GET_NOTE_COLLABORATORS_ERROR';
export const GET_NOTE_COLLABORATORS_SUCCESS = 'GET_NOTE_COLLABORATORS_SUCCESS';

const URL = 'https://backend206.herokuapp.com';

export const getCollaborators = token => {
  return dispatch => {
    dispatch({ type: GET_COLLABORATORS_START });
    axios
      .get(`${URL}/collaborators/`, {
        headers: { Authorization: token }
      })
      .then(response => {
        dispatch({
          type: GET_COLLABORATORS_SUCCESS,
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({ type: GET_COLLABORATORS_ERROR, payload: error });
      });
  };
};

export const getNoteCollaberators = (id, token) => {
  return dispatch => {
    dispatch({ type: GET_NOTE_COLLABORATORS_START });
    axios
      .get(`${URL}/notes/collaborators/${id}`, {
        headers: { Authorization: token }
      })
      .then(response => {
        dispatch({
          type: GET_NOTE_COLLABORATORS_SUCCESS,
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({ type: GET_NOTE_COLLABORATORS_ERROR, payload: error });
      });
  };
};
