import {
  LOGIN,
  REGISTER,
  LOGOUT,
  ME,
} from '../constants/auth';

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
    case `${REGISTER}_REQUEST`:
      return { ...state, authLoading: true };
    case `${LOGIN}_ERROR`:
    case `${REGISTER}_ERROR`:
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
