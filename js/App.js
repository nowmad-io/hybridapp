import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import MainRouter from './Routers/MainRouter';
import SplashScreen from './components/pages/splashScreen';

import configureStore from './configureStore';

console.ignoredYellowBox = [
  'Setting a timer',
  'Remote debugger'
];

const { persistor, store, addListener } = configureStore();

function App(): Component {
  class Root extends Component {
    render() {
      return (
        <Provider store={store}>
          <PersistGate loading={<SplashScreen />} persistor={persistor}>
            <MainRouter addListener={addListener} />
          </PersistGate>
        </Provider>
      );
    }
  }

  return Root;
}

export default App;
