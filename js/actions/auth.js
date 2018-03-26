import {
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  LOGOUT_REQUEST,
} from '../constants/auth';

export function loginRequest(data) {
  return {
    type: LOGIN_REQUEST,
    data,
  };
}

export function registerRequest(data) {
  return {
    type: REGISTER_REQUEST,
    data,
  };
}

export function logoutRequest() {
  return {
    type: LOGOUT_REQUEST,
  };
}
