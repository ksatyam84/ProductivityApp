import {combineReducers} from 'redux';
import errors from './errors';
import currentUser from './currentUser';
import post from './post';
import posts from './posts';

const rootReducer = combineReducers({
  errors,
  currentUser,
  post,
  posts
});

export default rootReducer