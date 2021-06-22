import { combineReducers } from 'redux';
import configs from './configs';
import login from './login';
import score from './score';

const rootReducer = combineReducers({ login, configs, score });

export default rootReducer;
