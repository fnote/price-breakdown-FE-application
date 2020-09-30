/**
 * Root Reducer that contains all the reducers.
 *
 * @author: adis0892 on 6/21/18
 **/

import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import app from './app';
import search from './search';

const rootReducer = combineReducers({
    app,
    search
});

export default createStore(rootReducer, applyMiddleware(thunkMiddleware));
