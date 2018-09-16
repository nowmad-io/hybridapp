import { Api } from '../libs/requests';

import {
  AUTHENTICATE,
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
    case AUTHENTICATE: {
      const { token } = action;
      console.log('token', token);
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
    case `${ME}_SUCCESS`:
      return { ...state, me: action.payload };
    case `${LOGOUT}_REQUEST`:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
