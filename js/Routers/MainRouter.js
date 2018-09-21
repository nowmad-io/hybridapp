import { createStackNavigator } from 'react-navigation';

import Auth from '../components/pages/auth';
import Profile from '../components/pages/auth/profile';
import AppRouter from './AppRouter';

export default createStackNavigator({
  Register: Auth,
  Login: Auth,
  Profile,
  App: AppRouter,
}, {
  navigationOptions: {
    header: null,
  },
});
