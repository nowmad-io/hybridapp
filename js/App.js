import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import MainRouter from './Routers/MainRouter';
import NavigationService from './libs/navigationService';
import SplashScreen from './components/pages/splashScreen';

import configureStore from './configureStore';

const { persistor, store } = configureStore();

/* eslint-disable-next-line no-console */
console.ignoredYellowBox = [
  'Remote debugger',
  'Warning: isMounted(...) is deprecated',
];

const App = () => (
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

export {
  persistor,
  App,
};
