import { createStackNavigator } from 'react-navigation';

import Auth from '../components/pages/auth';
import Profile from '../components/pages/auth/profile';
import AppRouter from './AppRouter';

export default createStackNavigator({
  Profile,
  Register: Auth,
  Login: Auth,
  App: AppRouter,
}, {
  navigationOptions: {
    header: null,
  },
});
