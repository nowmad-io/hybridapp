import { normalize } from 'normalizr';

class Api {
  constructor(passedConfig) {
    const baseConfig = {
      bodyEncoder: JSON.stringify,
      credentials: 'same-origin',
      format: 'json',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      methods: ['get', 'post', 'put', 'delete'],
    };

    if (!passedConfig.basePath) {
      throw new Error('You must pass a base path to the ApiClient');
    }

    const methods = passedConfig.methods || baseConfig.methods;

    methods.forEach((method) => {
      this[method] = (path, {
        params, data, options, schema, parser,
      } = {}) => {
        const config = {
          ...baseConfig,
          ...passedConfig,
          ...options,
          headers: {
            ...baseConfig.headers,
            ...(options ? options.headers : {}),
          },
        };

        const {
          methods: _methods, basePath, headers, format, bodyEncoder,
          ...otherConfig
        } = config;

        const requestPath = ((path.indexOf('http') === -1) ? basePath : '') + path + Api.queryString(data);

        const body = params ? bodyEncoder(params) : undefined;

        const fetchOptions = {
          ...otherConfig,
          method,
          headers,
        };

        if (method !== 'get') {
          fetchOptions.body = body;
        }

        return fetch(requestPath, fetchOptions)
          .then(response => ({ response, format }))
          .then(Api.handleErrors)
          .then(response => response[format]())
          .then(response => (parser ? parser(response) : response))
          .then(response => (schema ? normalize(response, schema) : response));
      };
    });
  }

  // thanks http://stackoverflow.com/a/12040639/5332286
  static queryString(params) {
    const s = Object.keys(params).map(key => (
      [key, params[key]].map(encodeURIComponent).join('=')
    )).join('&');
    return s ? `?${s}` : '';
  }

  static handleErrors({ response, format }) {
    if (!response.ok) {
      return response[format]()
        // if response parsing failed send back the entire response object
        .catch(() => { throw response; })
        // else send back the parsed error
        .then((parsedErr) => { throw parsedErr; });
    }
    return response;
  }
}

export default Api;
