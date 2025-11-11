import { useStorage } from '../Storage'
import { setToken } from '~/services/sdk'

export const onRehydrateAuthMiddleware = data => {
  if (data?.auth?.token) {
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

  const login = auth => {
    setToken(auth.token)
    setState(prevState => ({
      ...prevState,
      auth,
    }))
  }

  return [state?.auth || {}, { login, logout }]
}
