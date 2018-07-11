import { CONNECTION_CHANGE } from '../constants/network';

// eslint-disable-next-line
export function connectionChange(isConnected) {
  return {
    type: CONNECTION_CHANGE,
    payload: isConnected,
  };
}
