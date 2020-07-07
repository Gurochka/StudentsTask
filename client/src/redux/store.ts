import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import axios from 'axios';

import { rootReducer } from './reducers/root.reducers';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancer);

// set base axios settings
axios.defaults.baseURL = 'http://localhost:3002';
