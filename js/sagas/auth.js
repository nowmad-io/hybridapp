import { all, take, put, race, call, takeLatest } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';

import {
  apiLogin,
  apiRegister,
  apiLogout
} from '../api/auth';

import { loginRequest } from '../actions/auth';

import {
  LOGIN,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  LOGOUT_REQUEST,
  FORM_ERROR,
  ME_SUCCESS,
  LOGIN_LOADING,
  REGISTER_LOADING
} from '../constants/auth';

import {
  STOP_SAGAS,
  REQUEST_ERROR
} from '../constants/utils';

import { TOKEN } from '../requests';

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

  yield put({ type: LOGIN_LOADING, loading: true });

  const [, winner] = yield all([
    put(apiLogin({ email, password })),
    race({
      loginSuccess: take(LOGIN_SUCCESS),
      loginFail: take(REQUEST_ERROR),
      logout: take(LOGOUT_REQUEST),
    }),
  ]);

  // If `auth` was the winner...
  if (winner.loginSuccess) {
    yield put({ type: TOKEN, token: winner.loginSuccess.payload.auth_token });

    yield take(ME_SUCCESS);

    yield put(NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'App' })],
    }));
  } else if (winner.loginFail) {
    yield put({ type: LOGIN_LOADING, loading: false });
    yield call(parseError, { error: winner.loginFail.payload });
  } else if (winner.logout) {
    yield put({ type: LOGIN_LOADING, loading: false });
    yield put({ type: LOGOUT }); // User is not logged in (not authorized)
  }
}

/**
 * Register saga
 * Very similar to log in saga!
 */
export function * registerFlow(action) {
  const credentials = action.data;

  yield put({ type: REGISTER_LOADING, loading: true });

  const [, winner] = yield all([
    put(apiRegister(credentials)),
    race({
      registerSuccess: take(REGISTER_SUCCESS),
      registerFail: take(REQUEST_ERROR),
    }),
  ]);

  if (winner.registerSuccess) {
    yield put(loginRequest(credentials));
  } else if (winner.registerFail) {
    yield put({ type: REGISTER_LOADING, loading: false });
    yield call(parseError, { error: winner.registerFail.payload });
  }
}

export function * logoutFlow() {
  yield put({ type: STOP_SAGAS });

  yield put({ type: LOGOUT });
  yield put(NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Login' })],
  }));

  yield put(apiLogout());
}

// Bootstrap sagas
export default function * root() {
  yield takeLatest(LOGIN_REQUEST, loginFlow);
  yield takeLatest(REGISTER_REQUEST, registerFlow);
  yield takeLatest(LOGOUT_REQUEST, logoutFlow);
}
