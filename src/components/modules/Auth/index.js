import * as React from 'react'
import { createContext, useState, useEffect, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AuthContext = createContext( [{}, () => ({})])

export const useAuth = () => {
  const [state, setState] = useContext(AuthContext)
  const logout = () => setState(false)

  return [state, { login: setState, logout }]
}

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    rehydrated: false,
  })

  const setStateContent = (data) => setState(prev => ({
    ...prev,
    ...data,
  }))

  const setItem = async(value) => {
    try {
    await AsyncStorage.setItem('auth01', value && JSON.stringify(value))
   } catch(err) {
    console.log(err)
   }
  }

  const getItem = async() => {
    try {
      const data = await AsyncStorage.getItem('auth01')

      setState(prev => ({
        ...prev,
        ...data !== null && JSON.parse(data),
        rehydrated: true
      }))

    } catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {
    state?.rehydrated && setItem(state)
  }, [JSON.stringify(state)])

  useEffect( () => {
    getItem()
  }, [])

  return (
  <AuthContext.Provider value={[state, setStateContent]}>
    {children}
  </AuthContext.Provider>
)
}
