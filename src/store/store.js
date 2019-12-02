import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';

const initialState = {};

const middleware = [ thunk ];

const composeEnhancer =
	process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const reducers = combineReducers({
	user: userReducer,
	data: dataReducer,
	ui: uiReducer
});

const store = createStore(reducers, initialState, composeEnhancer(applyMiddleware(...middleware)));

export default store;
