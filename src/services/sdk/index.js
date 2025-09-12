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

const fetch = ({ method, url, ...params }) =>
  axios[method](`${baseURL}${url}`, params)

export const login = async ({ email, password }) => {
  try {
    const res = await fetch({
      method: 'post',
      url: '/login',
      auth: { username: email, password },
    })
    return res.data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const signup = async ({ email, password }) => {
  try {
    const res = await fetch({
      method: 'post',
      url: '/signup',
      email,
      password,
    })
    return res.data
  } catch (error) {
    return Promise.reject(error)
  }
}
