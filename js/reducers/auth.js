import {
  FORM_ERROR,
  LOGOUT,
  ME_SUCCESS
} from '../constants/auth';

import { TOKEN } from '../requests';

const initialState = {
  loading: false,
  token: null,
  me: null
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case TOKEN:
      return { ...state, token: action.token };
    case ME_SUCCESS:
      return { ...state, me: action.payload };
    case FORM_ERROR:
      return { ...state, error: action.error };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default authReducer;
