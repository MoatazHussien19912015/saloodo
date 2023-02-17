import { combineReducers } from 'redux';
import bikerAuthReducer from './bikerAuthReducer';
import senderAuthReducer from './senderAuthReducer';
import parcelsReducer from './parcelsReducer';

export default combineReducers({bikerAuthReducer, senderAuthReducer, parcelsReducer});