import { combineReducers } from 'redux';
import videogameReducer from './videogameReducer';

const rootReducer = combineReducers({ videogameReducer });

export default rootReducer;