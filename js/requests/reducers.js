import { CONNECTION_CHANGE } from './constants';

export const initialState = {
  isConnected: true,
  actionQueue: [],
};

const networkReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONNECTION_CHANGE:
      return {
        ...state,
        isConnected: action.payload,
      };
    default:
      return state;
  }
};

export default networkReducer;
