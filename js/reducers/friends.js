import _ from 'lodash';

import {
  SEARCH_FRIENDS_SUCCESS,
  FETCH_FRIENDS_SUCCESS,
  FETCH_FRIENDSINCOMING_SUCCESS,
  FETCH_FRIENDSOUTGOING_SUCCESS,
  SEND_FRIENDSHIP_SUCCESS,
  ACCEPT_FRIENDSHIP_SUCCESS,
  CANCEL_FRIENDSHIP_SUCCESS,
  REJECT_FRIENDSHIP_SUCCESS,
} from '../constants/friends';
import { LOGOUT } from '../constants/auth';

function addNewFriend(state, action) {
  const all = state.all.concat([action.payload]);
  const outgoings = _.filter(
    state.outgoings,
    outgoing => (outgoing.to_user.id !== action.payload.id),
  );
  const incomings = _.filter(
    state.incomings,
    incoming => (incoming.from_user.id !== action.payload.id),
  );

  return {
    ...state, all, incomings, outgoings,
  };
}

const initialState = {
  search: [],
  all: [],
  incomings: [],
  outgoings: [],
  error: '',
};

export default function friendsReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_FRIENDS_SUCCESS:
      return { ...state, search: action.payload };
    case FETCH_FRIENDS_SUCCESS:
      return { ...state, all: action.payload };
    case FETCH_FRIENDSINCOMING_SUCCESS:
      return { ...state, incomings: action.payload };
    case FETCH_FRIENDSOUTGOING_SUCCESS:
      return { ...state, outgoings: action.payload };
    case ACCEPT_FRIENDSHIP_SUCCESS:
      return addNewFriend(state, action);
    case SEND_FRIENDSHIP_SUCCESS:
      return { ...state, outgoings: state.outgoings.concat([action.payload]) };
    case CANCEL_FRIENDSHIP_SUCCESS:
      return {
        ...state,
        outgoings: _.filter(
          state.outgoings,
          outgoing => (outgoing.id !== action.payload.id),
        ),
      };
    case REJECT_FRIENDSHIP_SUCCESS:
      return {
        ...state,
        incomings: _.filter(
          state.incomings,
          incoming => (incoming.id !== action.payload.id),
        ),
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
