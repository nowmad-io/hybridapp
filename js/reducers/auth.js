import {
  FORM_ERROR,
  LOGOUT,
  ME_SUCCESS,
  LOGIN_LOADING,
  REGISTER_LOADING,
} from '../constants/auth';

import { TOKEN } from '../requests';

const initialState = {
  loginLoading: false,
  registerLoading: false,
  token: null,
  me: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOKEN:
      return { ...state, token: action.token };
    case ME_SUCCESS:
      return { ...state, me: action.payload };
    case FORM_ERROR:
      return { ...state, error: action.error };
    case LOGIN_LOADING:
      return { ...state, loginLoading: action.loading };
    case REGISTER_LOADING:
      return { ...state, registerLoading: action.loading };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
