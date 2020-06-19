/**
 * Root Reducer that contains all the reducers.
 *
 * @author: adis0892 on 6/21/18
 **/

import { combineReducers } from 'redux';
import UploadReducer from './UploadReducer';
import NavDrawerReducer from './NavDrawerReducer';
import OpenDrawerReducer from "./OpenDrawerReducer";

const rootReducer = combineReducers({
    uploadData: UploadReducer,
    navigation: NavDrawerReducer,
    isDrawerOpen: OpenDrawerReducer
});

export default rootReducer
