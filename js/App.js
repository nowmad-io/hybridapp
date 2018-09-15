import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import MainRouter from './Routers/MainRouter';
import NavigationService from './libs/navigationService';
import SplashScreen from './components/pages/splashScreen';

import configureStore from './configureStore';
import sagas from './sagas';

const { persistor, store, sagaMiddleware } = configureStore();

/* eslint-disable-next-line no-console */
console.ignoredYellowBox = [
  'Remote debugger',
  'Warning: isMounted(...) is deprecated',
];

class App extends Component {
  static onBeforeLift() {
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
