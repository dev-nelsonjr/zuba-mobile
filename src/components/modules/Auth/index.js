import * as React from 'react'
import { createContext, useState, useEffect, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = '@auth'

const AuthContext = createContext([{}, () => ({})])

export const useAuth = () => {
const [state, setState] = useContext(AuthContext)

const logout = () => setState(prevState => ({
  ...prevState,
  auth: false
}))

const login = auth => setState(prevState => ({
  ...prevState,
  auth
}))

return [state, { login, logout }]
}

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    rehydrated: false,
  })

  const  setItem = async (value) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, value && JSON.stringify(value))
    } catch (err) {
      console.log(err)
    }
}

const getItem = async() => {
  try{
    const data = await AsyncStorage.getItem(STORAGE_KEY)

    if (data) {
      setState(JSON.parse(data))
    }
    }catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    state?.rehydrated && setItem(state)
  }, [JSON.stringify(state)])


useEffect(() => {
  getItem()
}, [])

return  (
  <AuthContext.Provider value={[state, setState]}>
   {children}
  </AuthContext.Provider>
)}
