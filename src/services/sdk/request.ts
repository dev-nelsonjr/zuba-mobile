import axios, { type AxiosRequestConfig } from 'axios'

export const baseURL = process.env.API_URL || 'http://localhost:9900'

const auth: { token?: string | false } = {}

export const setToken = (token: string | false) => {
  auth.token = token
}

export const request = <ResponseData = unknown>(params: AxiosRequestConfig) =>
  axios<ResponseData>({
    baseURL,
    ...params,
    headers: {
      ...params.headers,
      ...(auth.token && {
        Authorization: `Bearer ${auth.token}`,
      }),
    },
  })
