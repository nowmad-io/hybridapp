import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import Config from 'react-native-config';

import MainRouter from './Routers/MainRouter';
import SplashScreen from './components/pages/splashScreen';

import configureStore from './configureStore';
import { requestsSaga, Api } from './requests';
import sagas from './sagas';

console.ignoredYellowBox = [
  'Setting a timer',
  'Remote debugger'
];

const { persistor, store, addListener, sagaMiddleware } = configureStore();

function App(): Component {
  class Root extends Component {
    onBeforeLift() {
      sagaMiddleware.run(requestsSaga(new Api({
        basePath: Config.API_URL
      })));

      for (const saga of sagas) {
        sagaMiddleware.run(saga);
      }
    }

    render() {
      return (
        <Provider store={store}>
          <PersistGate
            loading={<SplashScreen />}
            persistor={persistor}
            onBeforeLift={this.onBeforeLift}>
              <MainRouter addListener={addListener} />
          </PersistGate>
        </Provider>
      );
    }
  }

  return Root;
}

export default App;
