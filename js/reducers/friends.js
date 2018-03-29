import _ from 'lodash';

import {
  SEARCH_FRIENDS,
  FETCH_FRIENDS,
  FETCH_FRIENDSINCOMING,
  FETCH_FRIENDSOUTGOING,
  SEND_FRIENDSHIP,
  ACCEPT_FRIENDSHIP,
  CANCEL_FRIENDSHIP,
  REJECT_FRIENDSHIP,
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

const friendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${SEARCH_FRIENDS}_SUCCESS`:
      return { ...state, search: action.payload };
    case `${FETCH_FRIENDS}_SUCCESS`:
      return { ...state, all: action.payload };
    case `${FETCH_FRIENDSINCOMING}_SUCCESS`:
      return { ...state, incomings: action.payload };
    case `${FETCH_FRIENDSOUTGOING}_SUCCESS`:
      return { ...state, outgoings: action.payload };
    case `${ACCEPT_FRIENDSHIP}_SUCCESS`:
      return addNewFriend(state, action);
    case `${SEND_FRIENDSHIP}_SUCCESS`:
      return { ...state, outgoings: state.outgoings.concat([action.payload]) };
    case `${CANCEL_FRIENDSHIP}_SUCCESS`:
      return {
        ...state,
        outgoings: _.filter(
          state.outgoings,
          outgoing => (outgoing.id !== action.payload.id),
        ),
      };
    case `${REJECT_FRIENDSHIP}_SUCCESS`:
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
};

export default friendsReducer;
