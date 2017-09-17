import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { StyleProvider } from 'native-base';
import App from './App';
import configureStore from './configureStore';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';

function setup():React.Component {
  class Root extends Component {
    constructor() {
      super();

      this.state = {
        ...{ store, appNavigator} = configureStore()
      };
    }

    render() {
      return (
        <StyleProvider style={getTheme(platform)}>
          <Provider store={this.state.store}>
            <App mainRouter={this.state.appNavigator}/>
          </Provider>
        </StyleProvider>
      );
    }
  }

  return Root;
}

export default setup;
