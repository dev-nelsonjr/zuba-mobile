import { request } from '../request'

export const login = async ({ email, password }) => {
  const response = await request({
    method: 'POST',
    url: '/login',
    auth: {
      username: email,
      password,
    },
  })

  return response.data
}

export const signup = async ({ name, email, password }) => {
  const response = await request({
    method: 'POST',
    url: '/signup',
    data: {
      name,
      email,
      password,
    },
  })

  return response.data
}

export const updateProfile = async data => {
  const response = await request({
    method: 'PUT',
    url: '/profile',
    data,
  })

  return response.data
}
