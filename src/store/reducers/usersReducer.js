import {
  UPDATE_ACCOUNT_START,
  UPDATE_ACCOUNT_ERROR,
  UPDATE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_START,
  DELETE_ACCOUNT_ERROR,
  DELETE_ACCOUNT_SUCCESS
} from '../actions/usersActions';

const initialState = {
  loading: false,
  error: null
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ACCOUNT_START:
      return { ...state, loading: true, error: null };
    case UPDATE_ACCOUNT_SUCCESS:
      return { ...state, loading: false, error: null };
    case UPDATE_ACCOUNT_ERROR:
      return { ...state, loading: false, error: action.payload };
    case DELETE_ACCOUNT_START:
      return { ...state, loading: true, error: null };
    case DELETE_ACCOUNT_SUCCESS:
      return { ...state, loading: false, error: null };
    case DELETE_ACCOUNT_ERROR:
      return { ...state, loading: true, error: action.payload };
    default:
      return state;
  }
};

export default usersReducer;
