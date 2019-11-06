import axios from 'axios';

export const CREATE_COMMENT_START = 'CREATE_COMMENT_START';
export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS';
export const CREATE_COMMENT_ERROR = 'CREATE_COMMENT_ERROR';

export const GET_NOTE_COMMENTS_START = 'GET_NOTE_COMMENT_START';
export const GET_NOTE_COMMENTS_SUCCESS = 'GET_NOTE_COMMENT_SUCCESS';
export const GET_NOTE_COMMENTS_ERROR = 'GET_NOTE_COMMENTS_ERROR';

export const EDIT_COMMENT_START = 'EDIT_COMMENT_START';
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS';
export const EDIT_COMMENT_ERROR = 'EDIT_COMMENT_ERROR';

export const DELETE_COMMENT_START = 'DELETE_COMMENT_START';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_ERROR = 'DELETE_COMMENT_ERROR';

const URL = 'https://backend206.herokuapp.com';

export const createComment = comment => {
  return dispatch => {
    dispatch({ type: CREATE_COMMENT_START });
    axios
      .post(`${URL}/comments`, comment)
      .then(response => {
        dispatch({ type: CREATE_COMMENT_SUCCESS, payload: comment });
      })
      .catch(error => {
        console.log(error);
        dispatch({ type: CREATE_COMMENT_ERROR });
      });
  };
};

export const getNoteComments = id => {
  console.log('world');
  console.log(id);
  return dispatch => {
    dispatch({ type: GET_NOTE_COMMENTS_START });
    axios
      .get(`${URL}/comments/note/${id}`)
      .then(response => {
        console.log(response);
        dispatch({ type: GET_NOTE_COMMENTS_SUCCESS, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: GET_NOTE_COMMENTS_ERROR });
      });
  };
};

export const updateComment = id => {
  return dispatch => {
    dispatch({ type: EDIT_COMMENT_START });
    axios
      .put(`${URL}/comments/${id}`)
      .then(response => {
        dispatch({ type: EDIT_COMMENT_SUCCESS });
      })
      .catch(error => {
        dispatch({ type: EDIT_COMMENT_ERROR });
      });
  };
};

export const deleteComment = id => {
  return dispatch => {
    dispatch({ type: DELETE_COMMENT_START });
    axios
      .delete(`${URL}/comments/${id}`)
      .then(response => {
        dispatch({ type: DELETE_COMMENT_SUCCESS });
      })
      .catch(error => {
        dispatch({ type: DELETE_COMMENT_ERROR });
      });
  };
};
