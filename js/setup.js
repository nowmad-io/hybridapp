import React, { Component } from 'react';
import { Provider } from 'react-redux';

import App from './App';
import SplashScreen from './components/splashScreen';
import configureStore from './configureStore';

console.ignoredYellowBox = [
  'Setting a timer',
  'Remote debugger'
];

function setup(): React.Component {
  class Root extends Component {
    constructor() {
      super();
      this.state = {
        isLoading: true,
        store: configureStore(() => this.setState({ isLoading: false })),
      };
    }

    render() {
      if (this.state.isLoading) {
        return (
          <SplashScreen />
        );
      }

      return (
        <Provider store={this.state.store}>
          <App />
        </Provider>
      );
    }
  }

  return Root;
}

export default setup;
