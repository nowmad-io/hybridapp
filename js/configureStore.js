import devTools from 'remote-redux-devtools';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';

const sagaMiddleware = createSagaMiddleware();
const navigationMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);

const middlewares = [
  sagaMiddleware,
  navigationMiddleware,
];

const enhancers = [
  applyMiddleware(...middlewares),
  devTools({
    name: 'nowmad',
    realtime: true,
  }),
];

const rootPersistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet,
  blacklist: ['nav', 'search'],
};
const rootReducer = combineReducers({ ...reducers });

export default () => {
  const addListener = createReduxBoundAddListener('root');

  const store = createStore(
    persistReducer(rootPersistConfig, rootReducer),
    compose(...enhancers),
  );

  const persistor = persistStore(store);

  return {
    store, persistor, addListener, sagaMiddleware,
  };
};
