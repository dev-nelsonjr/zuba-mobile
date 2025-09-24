import { request } from '~/services/sdk'

export const getTransactions = async () => {
  try {
    const response = await request({
      method: 'GET',
      url: '/transactions',
    })

    return response.data
  } catch (error) {
    console.error('Error fetching transactions from backend:', error)
    return Promise.reject(error)
  }
}

export const saveTransactions = async data => {
  try {
    const response = await request({
      method: 'POST',
      url: '/transactions',
      data,
    })

    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}
