import { combineReducers } from 'redux';
import notesReducer from './notesReducer';
import usersReducer from './usersReducer';
import authenticationReducer from './authenticationReducer';

const rootReducer = combineReducers({
  notes: notesReducer,
  user: usersReducer,
  auth: authenticationReducer
});

export default rootReducer;
