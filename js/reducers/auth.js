import {
  LOGIN,
  REGISTER,
  LOGOUT,
  ME,
  UPDATE_PROFILE,
} from '../constants/auth';

export const getMe = state => state.auth.me;

const initialState = {
  authLoading: false,
  token: null,
  me: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${LOGIN}_SUCCESS`:
    case `${REGISTER}_SUCCESS`:
      return { ...state, token: action.payload.auth_token, authLoading: false };
    case `${LOGIN}_REQUEST`:
    case REGISTER:
    case UPDATE_PROFILE:
      return { ...state, authLoading: true };
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
