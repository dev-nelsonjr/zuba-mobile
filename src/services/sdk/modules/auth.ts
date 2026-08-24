import { request } from '../request'

export interface Credentials {
  email: string
  password: string
}

export interface SignupData extends Credentials {
  name: string
}

export interface User {
  id: string
  name: string | null
  email: string
  firebaseToken: string | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export interface AuthResponse {
  user: User
  token: string
}

export type UpdateProfileData = Partial<
  Pick<User, 'name' | 'email' | 'firebaseToken'>
>

export const login = async ({ email, password }: Credentials) => {
  const response = await request<AuthResponse>({
    method: 'POST',
    url: '/login',
    auth: {
      username: email,
      password,
    },
  })

  return response.data
}

export const signup = async ({ name, email, password }: SignupData) => {
  const response = await request<AuthResponse>({
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

export const updateProfile = async (data: UpdateProfileData) => {
  const response = await request<User>({
    method: 'PUT',
    url: '/profile',
    data,
  })

  return response.data
}
