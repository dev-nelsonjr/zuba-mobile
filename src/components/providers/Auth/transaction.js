import { request } from '~/services/sdk'
import { parse, formatISO } from 'date-fns'

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

export const saveTransactions = async ({ dueDate, ...data }) => {
  try {
    const response = await request({
      method: 'POST',
      url: '/transactions',
      data: {
        ...data,
        ...(dueDate && {
          dueDate: formatISO(parse(dueDate, 'MM/dd/yyyy', new Date())),
        }),
      },
    })

    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}
