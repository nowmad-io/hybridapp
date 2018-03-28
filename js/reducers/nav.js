import { LOGOUT } from '../constants/auth';
import { MainNavigator } from '../Routers/MainRouter';

const initialState = MainNavigator.router.getStateForAction(MainNavigator.router.getActionForPathAndParams('Login'));

const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      return initialState;
    default:
      return MainNavigator.router.getStateForAction(action, state) || state;
  }
};

export default navReducer;
