import {
  GET_COLLABORATORS_START,
  GET_COLLABORATORS_ERROR,
  GET_COLLABORATORS_SUCCESS,
  GET_NOTE_COLLABORATORS_START,
  GET_NOTE_COLLABORATORS_ERROR,
  GET_NOTE_COLLABORATORS_SUCCESS
} from '../actions/collaberatorsActions';

const initialState = {
  loading: false,
  error: null,
  collaborators: [],
  note_collaborators: []
};

const collaberatorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COLLABORATORS_START:
      return { ...state, loading: true, error: null };
    case GET_COLLABORATORS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        collaborators: action.payload
      };
    case GET_COLLABORATORS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        collaborators: []
      };
    case GET_NOTE_COLLABORATORS_START:
      return { ...state, loading: true, note_collaborators: [] };
    case GET_NOTE_COLLABORATORS_SUCCESS:
      return { ...state, loading: false, note_collaborators: action.payload };
    case GET_NOTE_COLLABORATORS_ERROR:
      return {
        ...state,
        loading: false,
        note_collaborators: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default collaberatorsReducer;
