import { AppRegistry, Alert } from 'react-native';
import Config from 'react-native-config';
import { Sentry } from 'react-native-sentry';
import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler';
import RNRestart from 'react-native-restart';

import { persistor, App } from './js/App';

if (Config.NODE_ENV !== 'development') {
  Sentry.config('https://800cd8afc59b49259e319e7e209e1768:ceefd4f8ccf348e49ee927c1311bcf67@sentry.io/662082').install();
}

const onRestartPress = () => persistor.purge().then(() => RNRestart.Restart());

// Set global error handler
setJSExceptionHandler((e, isFatal) => {
  Alert.alert(
    'Unexpected error occurred',
    `Error: ${(isFatal) ? 'Fatal:' : ''} ${e.name} ${e.message}

    We will need to restart the app.`,
    [{
      text: 'Restart',
      onPress: onRestartPress,
    }],
  );
}, true);

setNativeExceptionHandler((exceptionString) => {
  if (Config.NODE_ENV !== 'development') {
    Sentry.captureException(new Error(exceptionString), {
      logger: 'NativeExceptionHandler',
    });
  }
}, false);

AppRegistry.registerComponent('nowmad', () => App);
