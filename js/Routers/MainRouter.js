import { createStackNavigator } from 'react-navigation';

import Login from '../components/pages/auth/login';
import Register from '../components/pages/auth/register';
import AppRouter from './AppRouter';

export default createStackNavigator({
  Register,
  Login,
  App: AppRouter,
}, {
  navigationOptions: {
    header: null,
  },
});
