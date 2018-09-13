import { createStackNavigator } from 'react-navigation';

import Auth from '../components/pages/auth';
import Profile from '../components/pages/auth/profile';
import AppRouter from './AppRouter';

export default createStackNavigator({
  Register: Auth,
  Profile,
  Login: Auth,
  App: AppRouter,
}, {
  navigationOptions: {
    header: null,
  },
});
