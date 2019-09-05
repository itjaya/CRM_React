import { combineReducers } from 'redux';

import settingsReducer from './settings.reducer.js';
import themesReducer from './themes.reducers.js';
import userReducer from './userReducer';
import orgReducer from './orgReducer';
import vendorReducer from "./vendor";
import clientReducer from "./client";
import projectReducer from './projectReducer';


export default combineReducers({
    settings: settingsReducer,
    theme: themesReducer,
    user: userReducer,
    organization: orgReducer,
    vendorReducer : vendorReducer,
    clientReducer : clientReducer,
    projects : projectReducer
});
