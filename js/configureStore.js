import { AsyncStorage } from 'react-native';
import devTools from 'remote-redux-devtools';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import createSagaMiddleware from 'redux-saga'
import Config from 'react-native-config'

import { requestsSaga, Api } from './requests';

import sagas from './sagas';

import reducers from './reducers';

function apiConfig() {
  return new Api({ basePath: Config.API_URL });
}

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(onCompletion:()=>void):any {
  const middlewares = [
    sagaMiddleware,
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
    autoRehydrate(),
    devTools({
      name: 'traveltnetwork', realtime: true,
    }),
  ];

  const store = createStore(
    combineReducers({
      ...reducers
    }),
    compose(...enhancers)
  );

  persistStore(store, { storage: AsyncStorage }, () => {
    sagaMiddleware.run(requestsSaga(apiConfig()));
    for (const saga of sagas) {
      sagaMiddleware.run(saga);
    }
    return onCompletion()
  });

  return store;
}
