import axios from 'axios'

const endpoints = {
  production: 'http://api.zuba',
  development: 'http://dev.zuba',
  staging: 'http://stg.zuba',
}

export const baseURL =
  endpoints[process.env.API_ENV] ||
  process.env.CUSTOM_URL ||
  endpoints.production

const auth = {}

export const setToken = token => {
  auth.token = token
}

export const request = params =>
  axios({
    baseURL,
    ...params,
    headers: {
      ...params.headers,
      ...(auth.token && {
        Authorization: `Bearer ${auth.token}`,
      }),
    },
  })
