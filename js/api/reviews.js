import {
  fetchCollection, fetchRecord, createRecord, updateRecord, deleteRecord, clearModelData,
} from '../../redux-crud-store';

const MODEL = 'reviews';
const PATH = 'reviews/';
const SEARCH_PATH = 'search/';

const fetchConfig = (state) => {
  const token = state.auth.token;
  return {
    headers: {
      Authorization: token ? `Token ${token}` : null,
    },
  };
};

export function fetchReviews(state, params = {}) {
  return fetchCollection(MODEL, SEARCH_PATH, params, { fetchConfig: fetchConfig(state) });
}

export function fetchReview(state, id, params = {}) {
  return fetchRecord(MODEL, id, `${PATH}${id}`, params, { fetchConfig: fetchConfig(state) });
}

export function createReview(state, data, params = {}) {
  return createRecord(MODEL, PATH, data, params, { fetchConfig: fetchConfig(state) });
}

export function updateReview(state, id, data = {}, params = {}) {
  return updateRecord(MODEL, id, `${PATH}${id}/`, data, params, { fetchConfig: fetchConfig(state) });
}

export function deleteReview(state, id, params = {}) {
  return deleteRecord(MODEL, id, `${PATH}${id}/`, params, { fetchConfig: fetchConfig(state) });
}

export function clearReviews() {
  return clearModelData(MODEL);
}
