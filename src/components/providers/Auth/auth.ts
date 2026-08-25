import { useStorage } from '../Storage'
import { setToken } from '~/services/sdk'
import type { AuthResponse } from '~/services/sdk/modules/auth'
import type { StorageState } from '../Storage'

export const onRehydrateAuthMiddleware = (data: StorageState | null) => {
  if (data?.auth && data.auth.token) {
    setToken(data.auth.token)
  }
  return Promise.resolve(data)
}

export const useAuth = () => {
  const [state, setState] = useStorage()
  const logout = () => {
    setToken(false)
    setState(prevState => ({
      ...prevState,
      auth: false,
    }))
  }

  const login = (auth: AuthResponse) => {
    setToken(auth.token)
    setState(prevState => ({
      ...prevState,
      auth,
    }))
  }

  return [state.auth || {}, { login, logout }] as const
}
