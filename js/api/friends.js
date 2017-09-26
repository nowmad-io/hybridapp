import { fetchCollection } from 'redux-crud-store';

const MODEL = 'friends';
const PATH = 'friends/';

const fetchConfig = (state) => {
  const token = state.auth.token;
  return {
    headers: {
      Authorization: token ? `Token ${token}` : null,
    },
  };
};

export function fetchFriends(state, params = {}) {
  return fetchCollection(MODEL, PATH, params, { fetchConfig: fetchConfig(state) });
}
