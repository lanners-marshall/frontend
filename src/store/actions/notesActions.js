import axios from 'axios';

export const CREATE_NOTE_START = 'CREATE_NOTE_START';
export const CREATE_NOTE_ERROR = 'CREATE_NOTE_ERROR';
export const CREATE_NOTE_SUCCESS = 'CREATE_NOTE_SUCCESS';

export const GET_ALL_NOTES = 'GET_ALL_NOTES';
export const GET_ALL_NOTES_SUCCESS = 'GET_ALL_NOTES_SUCCESS';
export const GET_ALL_NOTES_ERROR = 'GET_ALL_NOTES_ERROR';

export const UPDATE_NOTE_START = 'UPDATE_NOTE_START';
export const UPDATE_NOTE_ERROR = 'UPDATE_NOTE_ERROR';
export const UPDATE_NOTE_SUCCESS = 'UPDATE_NOTE_SUCCESS';

export const GET_NOTE_START = 'GET_NOTE_START';
export const GET_NOTE_ERROR = 'GET_NOTE_ERROR';
export const GET_NOTE_SUCCESS = 'GET_NOTE_SUCCESS';

export const GET_COLLABORATORS_START = 'GET_COLLABORATORS_START';
export const GET_COLLABORATORS_ERROR = 'GET_COLLABORATORS_ERROR';
export const GET_COLLABORATORS_SUCCESS = 'GET_COLLABORATORS_SUCCESS';

const URL = 'https://backend206.herokuapp.com';

export const getAllNotes = token => {
  return dispatch => {
    dispatch({ type: CREATE_NOTE_START });
    axios
      .get(`${URL}/notes`, { headers: { Authorization: token } })
      .then(response => {
        dispatch({ type: GET_ALL_NOTES_SUCCESS, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: GET_ALL_NOTES_ERROR, payload: error });
      });
  };
};

export const createNote = token => {
  return dispatch => {
    dispatch({ type: CREATE_NOTE_START });
    axios
      .post(`${URL}/notes`, {
        headers: { Authorization: token }
      })
      .then(response => {
        dispatch({ type: CREATE_NOTE_SUCCESS, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: CREATE_NOTE_ERROR, payload: error });
      });
  };
};

export const updateNote = (id, token, note) => {
  return dispatch => {
    dispatch({ type: UPDATE_NOTE_START });
    axios
      .put(`${URL}/notes/${id}`, { headers: { Authorization: token } }, note)
      .then(response => {
        dispatch({ type: UPDATE_NOTE_SUCCESS, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: UPDATE_NOTE_ERROR, payload: error });
      });
  };
};

export const getNote = (id, token) => {
  return dispatch => {
    dispatch({ type: GET_NOTE_START });
    axios
      .get(`${URL}/notes/${id}`, { headers: { Authorization: token } })
      .then(response => {
        dispatch({ type: GET_NOTE_SUCCESS, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: GET_NOTE_ERROR, payload: error });
      });
  };
};

export const getCollaborators = (id, token) => {
  return dispatch => {
    dispatch({ type: GET_COLLABORATORS_START });
    axios
      .get(`${URL}/notes/collaborators/${id}`, {
        headers: { Authorization: token }
      })
      .then(response => {
        dispatch({ type: GET_COLLABORATORS_SUCCESS, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: GET_COLLABORATORS_SUCCESS, payload: error });
      });
  };
};
