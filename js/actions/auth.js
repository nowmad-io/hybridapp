/*
 *
 * Auth actions
 *
 */

import {
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  LOGOUT_REQUEST
} from '../constants/auth';

/**
 * Tells the app we want to log in a user
 * @param  {object} data          The data we're sending for log in
 * @param  {string} data.email The email of the user to log in
 * @param  {string} data.password The password of the user to log in
 */
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
    type: LOGOUT_REQUEST
  };
}
