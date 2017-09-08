/* eslint-disable import/no-extraneous-dependencies */
// import * as localForage from 'localforage';
// import { persistStore, autoRehydrate } from 'redux-persist';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from 'app/reducers';
import initialState from './initialState';

let middleware = [promiseMiddleware()];
let composer;

if (process.env.NODE_ENV === 'production') {
  composer = require('redux').compose;
} else {
  const reduxImmutableStateInvariant = require('redux-immutable-state-invariant').default();
  const logger = require('redux-logger').createLogger({
    // ...options
  });
  composer = require('redux-devtools-extension').composeWithDevTools;
  middleware = middleware.concat(reduxImmutableStateInvariant, logger);
}

const store = composer(
  applyMiddleware(...middleware),
  // autoRehydrate(),
)(createStore)(rootReducer, initialState);

// persistStore(store, { storage: localForage });

export default store;
