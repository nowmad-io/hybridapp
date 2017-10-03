import {
  SEARCH_FRIENDS_SUCCESS,
  FETCH_FRIENDS_SUCCESS,
  FETCH_FRIENDSINCOMING_SUCCESS,
  FETCH_FRIENDSOUTGOING_SUCCESS
} from '../constants/friends';
import { LOGOUT } from '../constants/auth';

const initialState = {
  search: [],
  all: [],
  incomings: [],
  outgoings: [],
  error: ''
};

function friendsReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_FRIENDS_SUCCESS:
      return { ...state, search: action.payload }
    case FETCH_FRIENDS_SUCCESS:
      return { ...state, all: action.payload }
    case FETCH_FRIENDSINCOMING_SUCCESS:
      return { ...state, incomings: action.payload }
    case FETCH_FRIENDSOUTGOING_SUCCESS:
      return { ...state, outgoings: action.payload }
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default friendsReducer;
