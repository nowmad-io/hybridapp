import { AsyncStorage } from 'react-native';
import { composeWithDevTools } from 'remote-redux-devtools';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga'
import { crudSaga, ApiClient } from 'redux-crud-store';
import Config from 'react-native-config'

import sagas from './sagas';
import reducers from './reducers';
import promise from './promise';
import MainRouter from './Routers/MainRouter';

function apiConfig() {
  return new ApiClient({ basePath: Config.API_URL });
}

const sagaMiddleware = createSagaMiddleware();

// BEGIN - Connecting react-navigation with redux
const AppNavigator = MainRouter;
const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Login'));
console.log('AppNavigator', AppNavigator);
console.log('MainRouter', MainRouter);

const navReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};
// END
console.log('navReducer', navReducer);
export default function configureStore():any {
  const middlewares = [
    promise,
    sagaMiddleware,
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  const composeEnhancers = composeWithDevTools({ name: 'traveltnetwork', realtime: true });

  const store = createStore(
    combineReducers({
      nav: navReducer,
      ...reducers
    }),
    // initialState,
    composeEnhancers(...enhancers)
  );

  for (const saga of sagas) {
    sagaMiddleware.run(saga);
  }
  sagaMiddleware.run(crudSaga(apiConfig()));

  persistStore(store, { storage: AsyncStorage });

  return {
    store,
    appNavigator: AppNavigator
  };
}
