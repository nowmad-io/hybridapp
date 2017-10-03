import {
  FORM_ERROR,
  LOGOUT_SUCCESS
} from '../constants/auth';

import { TOKEN } from '../requests';

const initialState = {
  loading: false,
  token: null
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case TOKEN:
      return { ...state, token: action.token };
    case LOGOUT_SUCCESS:
      return { ...state, token: null };
    case FORM_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
}

export default authReducer;
