import { AsyncStorage } from 'react-native';
import devTools from 'remote-redux-devtools';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';
import createSagaMiddleware from 'redux-saga';
import Config from 'react-native-config';

import { requestsSaga, Api } from './requests';
import sagas from './sagas';
import reducers from './reducers';

const sagaMiddleware = createSagaMiddleware();
const navigationMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);

const middlewares = [
  sagaMiddleware,
  navigationMiddleware
];

const enhancers = [
  applyMiddleware(...middlewares),
  devTools({
    name: 'nowmad', realtime: true,
  }),
];

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['nav', 'search']
}
const rootReducer = combineReducers({ ...reducers })

export default () => {
  const addListener = createReduxBoundAddListener("root");

  let store = createStore(
    persistReducer(rootPersistConfig, rootReducer),
    compose(...enhancers)
  );

  let persistor = persistStore(store, null, () => {
    sagaMiddleware.run(requestsSaga(new Api({
      basePath: Config.API_URL
    })));

    for (const saga of sagas) {
      sagaMiddleware.run(saga);
    }
  });

  return { store, persistor, addListener }
}
