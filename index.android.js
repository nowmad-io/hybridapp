import { AppRegistry } from 'react-native';
import Config from 'react-native-config';
import { Sentry } from 'react-native-sentry';

import App from './js/App';

if (Config.NODE_ENV !== 'development') {
  Sentry.config('https://800cd8afc59b49259e319e7e209e1768:ceefd4f8ccf348e49ee927c1311bcf67@sentry.io/662082').install();
}

AppRegistry.registerComponent('Nowmad', () => App);
