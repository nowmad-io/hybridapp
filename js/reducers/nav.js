import { NavigationActions } from 'react-navigation';

import { LOGOUT } from '../constants/auth';
import { MainNavigator } from '../Routers/MainRouter';

const initialState = MainNavigator.router.getStateForAction(MainNavigator.router.getActionForPathAndParams('Login'));

function nav(state = initialState, action) {
  return MainNavigator.router.getStateForAction(action, state) || state;
}

export default nav;
