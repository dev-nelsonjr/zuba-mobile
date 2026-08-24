import { request } from '../request'
import { parse, formatISO } from 'date-fns'

export type TransactionType = 'revenue' | 'expense'

export interface Transaction {
  id: string
  userId: string
  description: string
  value: string
  dueDate: string | null
  type: TransactionType | null
  resolved: boolean
}

export interface DashboardPeriod {
  month: number
  year: number
}

export interface Dashboard {
  total: string | number | null
  revenue: string | number
  expense: string | number
  balance: number
  docs: Transaction[]
}

export interface TransactionData {
  value: string
  description: string
  dueDate?: string
  type?: TransactionType
}

export const getDashboard = async (params: DashboardPeriod) => {
  const response = await request<Dashboard>({
    method: 'GET',
    url: '/dashboard',
    params,
  })

  return response.data
}

export const saveTransaction = async ({
  dueDate,
  ...data
}: TransactionData) => {
  const response = await request<Transaction>({
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
