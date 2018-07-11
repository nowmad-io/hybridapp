import _ from 'lodash';

import { CONNECTION_CHANGE, FETCH_OFFLINE_MODE, REMOVE_FROM_ACTION_QUEUE } from './constants';

export const initialState = {
  isConnected: false,
  actionQueue: [],
};

const networkReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONNECTION_CHANGE:
      return {
        ...state,
        isConnected: action.payload,
      };
    case FETCH_OFFLINE_MODE:
      return {
        ...state,
        actionQueue: [
          ...state.actionQueue,
          action.payload,
        ],
      };
    case REMOVE_FROM_ACTION_QUEUE: {
      const similarActionQueued = _.find(state.actionQueue, a => _.isEqual(action, a));

      return {
        ...state,
        actionQueue: _.without(state.actionQueue, similarActionQueued),
      };
    }
    default:
      return state;
  }
};

export default networkReducer;
