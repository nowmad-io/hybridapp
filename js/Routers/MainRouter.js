import { createStackNavigator } from 'react-navigation';

import Auth from '../components/pages/auth';
import AppRouter from './AppRouter';

export default createStackNavigator({
  Register: Auth,
  Login: Auth,
  App: AppRouter,
}, {
  navigationOptions: {
    header: null,
  },
});
