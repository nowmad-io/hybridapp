import {
  SEARCH_FRIENDS_SUCCESS,
  FETCH_FRIENDS_SUCCESS,
  FETCH_FRIENDSINCOMING_SUCCESS,
  FETCH_FRIENDSOUTGOING_SUCCESS
} from '../constants/friends';

const initialState = {
  search: [],
  all: [],
  incoming: [],
  outgoing: [],
  error: ''
};

function friendsReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_FRIENDS_SUCCESS:
      return { ...state, search: action.payload }
    case FETCH_FRIENDS_SUCCESS:
      return { ...state, all: action.payload }
    case FETCH_FRIENDSINCOMING_SUCCESS:
      return { ...state, incoming: action.payload }
    case FETCH_FRIENDSOUTGOING_SUCCESS:
      return { ...state, outgoing: action.payload }
    default:
      return state;
  }
}

export default friendsReducer;
