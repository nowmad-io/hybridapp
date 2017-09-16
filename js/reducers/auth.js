import {
  FORM_ERROR,
  LOGIN,
  LOGOUT
} from '../constants/auth';

const initialState = {
  loading: false,
  token: null
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, token: action.token };
    case LOGOUT:
      return { ...state, token: null };
    case FORM_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
}

export default authReducer;
