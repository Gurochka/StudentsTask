import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import axios from 'axios';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import { rootReducer, AppState } from './reducers/root.reducers';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createBrowserHistory();

const enhancer = composeEnhancers(applyMiddleware(routerMiddleware(history), thunk));

export const store = createStore<AppState, any, any, any>(rootReducer(history), enhancer);

// set base axios settings
axios.defaults.baseURL = 'http://localhost:3002';
