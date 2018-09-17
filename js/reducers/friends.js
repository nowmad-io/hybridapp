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

export const getOutgoings = state => state.friends.outgoings;
export const getIncomings = state => state.friends.incomings;

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
    case `${ACCEPT_FRIENDSHIP}_ERROR`:
    case `${CANCEL_FRIENDSHIP}_ERROR`:
    case `${REJECT_FRIENDSHIP}_ERROR`:
      return {
        ...state,
        incomings: state.incomings.map(request => ({
          ...request,
          loading: false,
        })),
      };
    case `${ACCEPT_FRIENDSHIP}_API_CALL`:
    case `${CANCEL_FRIENDSHIP}_API_CALL`:
    case `${REJECT_FRIENDSHIP}_API_CALL`:
      return {
        ...state,
        incomings: state.incomings.map(request => ({
          ...request,
          loading: request.id !== action.payload.extra.id,
        })),
      };
    case `${ACCEPT_FRIENDSHIP}_SUCCESS`:
      return addNewFriend(state, action);
    case `${SEND_FRIENDSHIP}_API_CALL`:
      return {
        ...state,
        outgoings: [
          ...state.outgoings,
          {
            from_user: { id: action.payload.params.from_user_id },
            to_user: { id: action.payload.params.to_user_id },
          },
        ],
      };
    case `${SEND_FRIENDSHIP}_SUCCESS`:
      return {
        ...state,
        outgoings: state.outgoings.map((request) => {
          if (request.to_user.id === action.payload.to_user.id) {
            return action.payload;
          }
          return request;
        }),
      };
    case `${SEND_FRIENDSHIP}_ERROR`:
      return {
        ...state,
        outgoings: _.filter(
          state.outgoings,
          request => (request.to_user.id !== action.payload.to_user.id),
        ),
      };
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
    case `${LOGOUT}_REQUEST`:
      return initialState;
    default:
      return state;
  }
};

export default friendsReducer;
