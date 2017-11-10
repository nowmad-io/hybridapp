class Api {
  constructor(passedConfig) {
    const baseConfig = {
      bodyEncoder: JSON.stringify,
      credentials: 'same-origin',
      format: 'json',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      methods: ['get', 'post', 'put', 'delete']
    }

    if (!passedConfig.basePath) {
      // e.g. 'https://example.com/api/v3'
      throw new Error('You must pass a base path to the ApiClient')
    }

    const methods = passedConfig.methods || baseConfig.methods;

    methods.forEach(method => {
      this[method] = (path, { params, data, options } = {}) => {
        const config = {
          ...baseConfig,
          ...passedConfig,
          ...options,
          headers: {
            ...baseConfig.headers,
            ...(options ? options.headers : {})
          }
        }

        const {
          methods: _methods, basePath, headers, format, bodyEncoder,
          ...otherConfig
        } = config

        const requestPath = ((path.indexOf('http') === -1) ? basePath : '') + path + this.queryString(data);

        const body = params ? bodyEncoder(params) : undefined

        let fetchOptions = {
          ...otherConfig,
          method,
          headers
        }

        if (method !== 'get') {
          fetchOptions.body = body
        }

        return fetch(requestPath, fetchOptions)
          .then(response => ({ response, format }))
          .then(this.handleErrors)
          .then(response => response[format]())
      }
    });
  }

  // thanks http://stackoverflow.com/a/12040639/5332286
  queryString(params) {
    const s = Object.keys(params).map(key => (
      [key, params[key]].map(encodeURIComponent).join('=')
    )).join('&')
    return s ? `?${s}` : ''
  }

  handleErrors({ response, format }) {
    if (!response.ok) {
      return response[format]()
        // if response parsing failed send back the entire response object
        .catch(() => { throw response })
        // else send back the parsed error
        .then(parsedErr => { throw parsedErr })
    }
    return response
  }
}

export default Api
