import axios from 'axios'

const endpoints = {
  production: 'http://api.zuba',
  development: 'http://dev.zuba',
  staging: 'http://stg.zuba'
}

const fetch = axios.create({
  baseURL: endpoints?.[process.env.API_ENV] || process.env.CUSTOM_URL || endpoints.production
})

export const login = async ({ username, password }) => {
  try {
     const res = await fetch({
      method: 'post',
      url: '/login',
      auth: { username, password }
    })
    return res.data
  } catch (error) {
    return promise.reject(error)
  }
  }


