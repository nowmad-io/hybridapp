import { AsyncStorage } from 'react-native';
import devTools from 'remote-redux-devtools';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga'
import { crudSaga, ApiClient } from 'redux-crud-store';
import Config from 'react-native-config'

import sagas from './sagas';
import reducers from './reducers';

function apiConfig() {
  return new ApiClient({ basePath: Config.API_URL });
}

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(onCompletion:()=>void):any {
  const middlewares = [
    sagaMiddleware,
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
    devTools({
      name: 'traveltnetwork', realtime: true,
    }),
  ];

  const store = createStore(
    combineReducers({
      ...reducers
    }),
    // initialState,
    compose(...enhancers)
  );

  for (const saga of sagas) {
    sagaMiddleware.run(saga);
  }
  sagaMiddleware.run(crudSaga(apiConfig()));

  persistStore(store, { storage: AsyncStorage }, onCompletion);

  return store;
}
