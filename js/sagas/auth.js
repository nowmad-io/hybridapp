import { take, put, race, call, takeLatest } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';

import {
  apiLogin,
  apiRegister
} from '../api/auth';

import { loginRequest } from '../actions/auth';

import {
  LOGIN,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOGOUT,
  LOGOUT_REQUEST,
  SENDING_REQUEST,
  REQUEST_ERROR,
  FORM_ERROR
} from '../constants/auth';

export function * parseError({ error }) {
  let parsedError = {};
  if (error.non_field_errors || error.email || error.password) {
    parsedError = {
      'non_field_errors': error.non_field_errors && error.non_field_errors[0],
      'email': error.email && error.email[0],
      'password': error.password && error.password[0]
    }
  } else  {
    parsedError.non_field_errors = 'Unknown error while authenticating';
  }
  yield put({ type: FORM_ERROR, error: parsedError });
}

/**
 * Log in saga
 */
function* loginFlow(action) {
  // And we're listening for `LOGIN_REQUEST` actions and destructuring its payload
  const { email, password } = action.data;

  yield put({ type: SENDING_REQUEST, sending: true });

  const [, winner] = yield [
    put(apiLogin({ email, password })),
    race({
      loginSuccess: take(LOGIN_SUCCESS),
      loginFail: take(REQUEST_ERROR),
      logout: take(LOGOUT_REQUEST),
    }),
  ];

  yield put({ type: SENDING_REQUEST, sending: false });

  // If `auth` was the winner...
  if (winner.loginSuccess) {
    yield put({ type: LOGIN, token: winner.loginSuccess.payload.auth_token }); // User is logged in (authorized)

    yield put(NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'App' })],
    }));
  } else if (winner.loginFail) {
    yield call(parseError, { error: winner.loginFail.payload });
  } else if (winner.logout) {
    yield put({ type: LOGOUT }); // User is not logged in (not authorized)
  }
}

/**
 * Register saga
 * Very similar to log in saga!
 */
export function * registerFlow(action) {
  const { email, password } = action.data;

  yield put({ type: SENDING_REQUEST, sending: true });

  const [, winner] = yield [
    put(apiRegister({ email, password })),
    race({
      registerSuccess: take(REGISTER_SUCCESS),
      registerFail: take(REQUEST_ERROR),
    }),
  ];

  yield put({ type: SENDING_REQUEST, sending: false });

  if (winner.registerSuccess) {
    yield put(loginRequest({ email, password }));
  } else if (winner.registerFail) {
    yield call(parseError, { error: winner.registerFail.payload });
  }
}

export function * logoutFlow() {
  // TODO: clear user models reviews
  yield put({ type: LOGOUT });

  yield put(NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Login' })],
  }));
}

// Bootstrap sagas
export default function* root() {
  yield takeLatest(LOGIN_REQUEST, loginFlow);
  yield takeLatest(REGISTER_REQUEST, registerFlow);
  yield takeLatest(LOGOUT_REQUEST, logoutFlow);
}
