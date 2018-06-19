import { composeWithDevTools } from 'remote-redux-devtools';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';

export default () => {
  const sagaMiddleware = createSagaMiddleware();
  const navigationMiddleware = createReactNavigationReduxMiddleware('root', state => state.nav);

  const middlewares = [
    sagaMiddleware,
    navigationMiddleware,
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  const rootPersistConfig = {
    key: 'root',
    storage,
    blacklist: ['nav', 'search', 'home', 'search'],
  };

  const rootReducer = combineReducers({ ...reducers });

  const addListener = createReduxBoundAddListener('root');

  const store = createStore(
    persistReducer(rootPersistConfig, rootReducer),
    composeWithDevTools(...enhancers),
  );

  const persistor = persistStore(store);

  return {
    store, persistor, addListener, sagaMiddleware,
  };
};
