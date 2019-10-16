import { combineReducers } from 'redux';
import notesReducer from './notesReducer';
import usersReducer from './usersReducer';
import authenticationReducer from './authenticationReducer';
import collaberatorsReducer from './collaberatorsReducer';
import commentsReducer from './commentsReducer';

const rootReducer = combineReducers({
  notes: notesReducer,
  user: usersReducer,
  auth: authenticationReducer,
  collaberators: collaberatorsReducer,
  comments: commentsReducer
});

export default rootReducer;
