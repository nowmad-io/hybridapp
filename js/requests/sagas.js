import { NetInfo } from 'react-native';
import { take, all, call, fork, put, takeEvery, select, cancelled } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import { API_CALL } from './constants';
import { connectionChange, fetchOfflineMode, removeActionFromQueue } from './actions';

function* handleConnectivityChange(hasInternetAccess) {
  yield put(connectionChange(hasInternetAccess));
  const actionQueue = yield select(state => state.network.actionQueue);

  if (hasInternetAccess && actionQueue.length > 0) {
    // eslint-disable-next-line
    for (const action of actionQueue) {
      yield put(action);
    }
  }
}

function createNetInfoConnectionChangeChannel() {
  return eventChannel((emit) => {
    NetInfo.isConnected.addEventListener('connectionChange', emit);
    return () => {
      NetInfo.isConnected.removeEventListener('connectionChange', emit);
    };
  });
}

function* initialNetInfo() {
  const channel = yield call(() => eventChannel((emit) => {
    NetInfo.getConnectionInfo().then(({ type }) => {
      emit((type !== 'none' && type !== 'unknown'));
    });
    return () => {};
  }));

  const isConnected = yield take(channel);
  yield fork(handleConnectivityChange, isConnected);
}

function* netInfoChangeSaga() {
  yield fork(initialNetInfo);

  const chan = yield call(createNetInfoConnectionChangeChannel);
  try {
    while (true) {
      const isConnected = yield take(chan);
      yield fork(handleConnectivityChange, isConnected);
    }
  } finally {
    if (yield cancelled()) {
      chan.close();
    }
  }
}

const apiGeneric = api =>
  function* _apiGeneric(action) {
    const {
      method, path, params, data, schema, parser,
    } = action.payload;
    const { options } = action.payload;
    const { request, success, failure } = action.meta;

    const { token, isConnected } = yield select(state => ({
      token: state.auth.token,
      isConnected: state.network.isConnected,
    }));

    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Token ${token}`,
      };
    }

    yield put({
      type: request, params, data, schema,
    });

    if (isConnected) {
      yield put(removeActionFromQueue(action));

      try {
        const response = yield call(api[method], path, {
          params, data, options, schema, parser,
        });
        yield put({ type: success, payload: response });
      } catch (error) {
        yield put({ type: failure, payload: error, error: true });
      }
      return;
    }

    yield put(fetchOfflineMode(action));
  };

const watchApiCall = api => function* _watchApiCall() {
  yield takeEvery(API_CALL, apiGeneric(api));
};

export default function requestsSaga(api) {
  return function* _requestsSaga() {
    yield all([
      fork(watchApiCall(api)),
      fork(netInfoChangeSaga),
    ]);
  };
}
