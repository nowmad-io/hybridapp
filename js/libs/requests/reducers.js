import _ from 'lodash';

import { CONNECTION_CHANGE, FETCH_OFFLINE_MODE, API_CALL } from './constants';

export const initialState = {
  isConnected: false,
  actionQueue: [],
};

const networkReducer = (state = initialState, action) => {
  const apiRegex = new RegExp(API_CALL);
  if (apiRegex.test(action.type)) {
    // Only compare type and payload since SAGAS may add other attribute
    const similarActionQueued = _.find(state.actionQueue, ({ type, payload }) => _.isEqual({
      type: action.type,
      payload: action.payload,
    }, { type, payload }));

    if (similarActionQueued) {
      return {
        ...state,
        actionQueue: _.without(state.actionQueue, similarActionQueued),
      };
    }

    return state;
  }

  switch (action.type) {
    case CONNECTION_CHANGE:
      return {
        ...state,
        isConnected: action.payload,
      };
    case FETCH_OFFLINE_MODE: {
      const alreadyQueued = _.find(state.actionQueue, a => _.isEqual(action.payload, a));

      return {
        ...state,
        actionQueue: [
          ...state.actionQueue,
          ...(!alreadyQueued ? [action.payload] : []),
        ],
      };
    }
    default:
      return state;
  }
};

export default networkReducer;
