import { composeWithDevTools } from 'remote-redux-devtools';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

import { network } from './libs/requests';
import reducers from './reducers';

export default () => {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [
    sagaMiddleware,
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  const rootPersistConfig = {
    key: 'root',
    storage,
    blacklist: ['home', 'search'],
  };

  const rootReducer = combineReducers({
    network,
    ...reducers,
  });

  const store = createStore(
    persistReducer(rootPersistConfig, rootReducer),
    composeWithDevTools(...enhancers),
  );

  const persistor = persistStore(store);

  return {
    store, persistor, sagaMiddleware,
  };
};
