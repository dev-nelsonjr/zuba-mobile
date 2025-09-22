import axios from 'axios'

const endpoints = {
  production: 'http://api.puf.work',
  development: 'http://dev.puf.work',
  staging: 'http://stg.puf.work',
}

const baseURL =
  endpoints?.[process.env.API_ENV] ||
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
      ...(auth.token && { Authorization: `Bearer ${auth.token}` }),
    },
  })

export const login = async ({ email, password }) => {
  try {
    const res = await request({
      method: 'post',
      url: '/login',
      auth: {
        username: email,
        password,
      },
    })
    return res.data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const signup = async ({ email, password }) => {
  try {
    const res = await request({
      method: 'post',
      url: '/signup',
      data: { email, password },
    })
    return res.data
  } catch (error) {
    return Promise.reject(error)
  }
}
