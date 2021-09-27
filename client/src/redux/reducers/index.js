import { combineReducers } from 'redux';
import videogameReducer from './videogameReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({ videogameReducer, userReducer });

export default rootReducer;