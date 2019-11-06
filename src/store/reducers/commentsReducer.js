import {
  CREATE_COMMENT_START,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_ERROR,
  GET_NOTE_COMMENTS_START,
  GET_NOTE_COMMENTS_SUCCESS,
  GET_NOTE_COMMENTS_ERROR,
  EDIT_COMMENT_START,
  EDIT_COMMENT_SUCCESS,
  EDIT_COMMENT_ERROR,
  DELETE_COMMENT_START,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_ERROR
} from '../actions/commentsActions';

const initialState = {
  loading: false,
  error: null,
  comments: [],
  updateSuccess: false,
  createSuccess: false,
  deleteSuccess: false
};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_COMMENT_START:
      return { ...state, loading: true, error: null, createSuccess: false };
    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: [...state.comments, action.payload]
      };
    case CREATE_COMMENT_ERROR:
      return { ...state, loading: false, createSuccesss: false };
    case GET_NOTE_COMMENTS_START:
      return { ...state, loading: true, comments: [] };
    case GET_NOTE_COMMENTS_SUCCESS:
      return { ...state, loading: false, comments: action.payload };
    case GET_NOTE_COMMENTS_ERROR:
      return { ...state, loading: false, comments: [] };
    case EDIT_COMMENT_START:
      return { ...state, loading: true, updateSuccess: false };
    case EDIT_COMMENT_SUCCESS:
      return { ...state, loading: false, updateSuccess: true };
    case EDIT_COMMENT_ERROR:
      return { ...state, loading: false, updateSuccess: false };
    case DELETE_COMMENT_START:
      return { ...state, loading: true, deleteSuccess: false };
    case DELETE_COMMENT_SUCCESS:
      return { ...state, loading: false, deleteSuccess: true };
    case DELETE_COMMENT_ERROR:
      return { ...state, loading: false, deleteSuccess: false };
    default:
      return state;
  }
};

export default commentsReducer;
