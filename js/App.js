import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Config from 'react-native-config';

import MainRouter from './Routers/MainRouter';
import NavigationService from './navigationService';
import SplashScreen from './components/pages/splashScreen';

import configureStore from './configureStore';
import { sagas as requestsSaga, Api } from './requests';
import sagas from './sagas';

const { persistor, store, sagaMiddleware } = configureStore();

/* eslint-disable-next-line no-console */
console.ignoredYellowBox = [
  'Remote debugger',
  'Warning: isMounted(...) is deprecated',
];

class App extends Component {
  static onBeforeLift() {
    sagaMiddleware.run(requestsSaga(new Api({
      basePath: Config.API_URL,
    })));

    sagas.map(saga => sagaMiddleware.run(saga));
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate
          loading={<SplashScreen />}
          persistor={persistor}
          onBeforeLift={App.onBeforeLift}
        >
          <MainRouter
            ref={navigatorRef => NavigationService.setTopLevelNavigator(navigatorRef)}
          />
        </PersistGate>
      </Provider>
    );
  }
}

export {
  persistor,
  App,
};
