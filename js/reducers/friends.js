import _ from "lodash";

import {
  SEARCH_FRIENDS_SUCCESS,
  FETCH_FRIENDS_SUCCESS,
  FETCH_FRIENDSINCOMING_SUCCESS,
  FETCH_FRIENDSOUTGOING_SUCCESS,
  SOCKET_FRIEND
} from '../constants/friends';
import { LOGOUT } from '../constants/auth';

const initialState = {
  search: [],
  all: [],
  incomings: [],
  outgoings: [],
  error: ''
};

function socket_friend(state, action) {
  const all = state.all.concat([action.friend]);

  const incomings = _.flatten(state.incomings.map(incoming => {
    if (incoming.from_user.id === action.friend.id) {
      return [];
    }
    return incoming;
  }));

  const outgoings = _.flatten(state.outgoings.map(outgoing => {
    if (outgoing.to_user.id === action.friend.id) {
      return [];
    }
    return outgoing;
  })

  return { ...state, all, incomings, outgoings };
}

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
    case SOCKET_FRIEND:
      return socket_friend(state, action);
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default friendsReducer;
