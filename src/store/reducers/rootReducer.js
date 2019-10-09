import { combineReducers } from 'redux';
import notesReducer from './notesReducer';
import usersReducer from './usersReducer';
import authenticationReducer from './authenticationReducer';

const rootReducer = combineReducers({
  note: notesReducer,
  user: usersReducer,
  auth: authenticationReducer
});

export default rootReducer;
