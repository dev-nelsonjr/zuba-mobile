import { request } from '../request'
import { parse, formatISO } from 'date-fns'

export const getDashboard = async params => {
  const response = await request({
    method: 'GET',
    url: '/dashboard',
    params,
  })

  return response.data
}

export const getBalance = async params => {
  const response = await request({
    method: 'GET',
    url: '/balance',
    params,
  })

  return response.data
}

export const getTransactions = async params => {
  const response = await request({
    method: 'GET',
    url: '/transactions',
    params,
  })

  return response.data
}

export const saveTransactions = async ({ dueDate, ...data }) => {
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
}
