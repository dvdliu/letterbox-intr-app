import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import letterboxd from './letterboxd';
const reducers = combineReducers({ posts, auth, letterboxd });
export default reducers;
