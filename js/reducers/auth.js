import { Api } from '../libs/requests';

import {
  LOGIN,
  REGISTER,
  LOGOUT,
  ME,
  UPDATE_PROFILE,
} from '../constants/auth';

export const getMe = state => state.auth.me;

const initialState = {
  token: null,
  me: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
    case REGISTER: {
      const { token } = action;
      Api.setAuthorisation(token);
      return {
        ...state,
        token,
      };
    }
    case `${UPDATE_PROFILE}_REQUEST`:
      return {
        ...state,
        me: {
          ...state.me,
          ...action.payload.params,
        },
      };
    case `${UPDATE_PROFILE}_SUCCESS`:
      return { ...state, authLoading: false };
    case `${LOGIN}_ERROR`:
    case `${REGISTER}_ERROR`:
    case `${UPDATE_PROFILE}_ERROR`:
      return { ...state, authLoading: false };
    case `${ME}_SUCCESS`:
      return { ...state, me: action.payload };
    case `${LOGOUT}_REQUEST`:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
