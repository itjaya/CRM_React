import { combineReducers } from 'redux';

import settingsReducer from './settings.reducer.js';
import themesReducer from './themes.reducers.js';
import userReducer from './userReducer';
import orgReducer from './orgReducer';

export default combineReducers({
    settings: settingsReducer,
    theme: themesReducer,
    user: userReducer,
    organization: orgReducer
});
