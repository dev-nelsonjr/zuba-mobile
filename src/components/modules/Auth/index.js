import { useStorage } from '../Storage'

export const useAuth = () => {
  const [state, setState] = useStorage()
  const logout = () =>
    setState(prevState => ({
      ...prevState,
      auth: false,
    }))

  const login = auth =>
    setState(prevState => ({
      ...prevState,
      auth,
    }))

  return [state, { login, logout }]
}
