import {
  GET_ALL_NOTES,
  GET_ALL_NOTES_SUCCESS,
  GET_ALL_NOTES_ERROR,
  CREATE_NOTE_START,
  CREATE_NOTE_ERROR,
  CREATE_NOTE_SUCCESS,
  UPDATE_NOTE_START,
  UPDATE_NOTE_ERROR,
  UPDATE_NOTE_SUCCESS,
  GET_NOTE_START,
  GET_NOTE_ERROR,
  GET_NOTE_SUCCESS
} from '../actions/notesActions';

const initialState = {
  loading: false,
  error: null,
  note: null,
  notes: []
};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_NOTES:
      return { ...state, loading: true, notes: [], error: null };
    case GET_ALL_NOTES_SUCCESS:
      return { ...state, loading: false, notes: action.payload, error: null };
    case GET_ALL_NOTES_ERROR:
      return { ...state, loading: false, notes: [], error: action.payload };
    case CREATE_NOTE_START:
      return { ...state, loading: true, error: null };
    case CREATE_NOTE_SUCCESS:
      return { ...state, loading: false, error: null };
    case CREATE_NOTE_ERROR:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_NOTE_START:
      return { ...state, loading: true, error: action.payload };
    case UPDATE_NOTE_SUCCESS:
      return { ...state, loading: false, error: null };
    case UPDATE_NOTE_ERROR:
      return { ...state, loading: false, error: action.payload };
    case GET_NOTE_START:
      return { ...state, loading: true, error: null, note: null };
    case GET_NOTE_SUCCESS:
      return { ...state, loading: false, error: null, note: action.payload };
    case GET_NOTE_ERROR:
      return { ...state, loading: false, error: action.payload, note: null };
    default:
      return state;
  }
};

export default notesReducer;
