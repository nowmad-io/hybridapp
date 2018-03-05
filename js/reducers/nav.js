import { NavigationActions } from 'react-navigation';

import { LOGOUT } from '../constants/auth';
import { MainNavigator } from '../Routers/MainRouter';

const initialState = MainNavigator.router.getStateForAction(MainNavigator.router.getActionForPathAndParams('Login'));

function nav(state = initialState, action) {
  let nextState;

  switch (action.type) {
    case LOGOUT:
      nextState = initialState;
    default:
      nextState = MainNavigator.router.getStateForAction(action, state) || state;
      break;
  }

  return nextState || state;
}


export default nav;
