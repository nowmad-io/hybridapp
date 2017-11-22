import _ from "lodash";

import {
  SEARCH_FRIENDS_SUCCESS,
  FETCH_FRIENDS_SUCCESS,
  FETCH_FRIENDSINCOMING_SUCCESS,
  FETCH_FRIENDSOUTGOING_SUCCESS,
  ADD_NEW_FRIEND,
  NEW_OUTGOING_REQUEST,
  NEW_INCOMING_REQUEST,
  DELETE_OUTGOING_REQUEST,
  DELETE_INCOMING_REQUEST
} from '../constants/friends';
import { LOGOUT } from '../constants/auth';

const initialState = {
  search: [],
  all: [],
  incomings: [],
  outgoings: [],
  error: ''
};

export default function friendsReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_FRIENDS_SUCCESS:
      return { ...state, search: action.payload }
    case FETCH_FRIENDS_SUCCESS:
      return { ...state, all: action.payload }
    case FETCH_FRIENDSINCOMING_SUCCESS:
      return { ...state, incomings: action.payload }
    case FETCH_FRIENDSOUTGOING_SUCCESS:
      return { ...state, outgoings: action.payload }
    case ADD_NEW_FRIEND:
      return add_new_friend(state, action)
    case NEW_OUTGOING_REQUEST:
      return { ...state, outgoings: state.outgoings.concat([action.request]) }
    case NEW_INCOMING_REQUEST:
      return { ...state, incomings: state.incomings.concat([action.request]) }
    case DELETE_OUTGOING_REQUEST:
      return { ...state, outgoings: _.filter(state.outgoings, (outgoing) => (outgoing.id !== action.request.id)) }
    case DELETE_INCOMING_REQUEST:
      return { ...state, incomings: _.filter(state.incomings, (incoming) => (incoming.id !== action.request.id)) }
    case LOGOUT:
      return initialState;
    default:
      return state
  }
}

function add_new_friend(state, action) {
  const all = state.all.concat([action.friend]);
  const outgoings = _.filter(state.outgoings, (outgoing) => (outgoing.to_user.id !== action.friend.id));
  const incomings = _.filter(state.incomings, (incoming) => (incoming.from_user.id !== action.friend.id));

  return { ...state, all, incomings, outgoings };
}
