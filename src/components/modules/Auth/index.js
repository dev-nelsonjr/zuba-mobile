import * as React from 'react'
import { createContext, useState, useEffect, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = '@auth'

const AuthContext = createContext([{}, () => ({})])

export const useAuth = () => {
  const [state, setState] = useContext(AuthContext)

  const logout = () => {
    setState(prevState => ({
      ...prevState,
      auth: null
    }))
    AsyncStorage.removeItem(STORAGE_KEY)
  }

  const login = authData => {
    setState(prevState => ({
      ...prevState,
      auth: authData,
    }))
  }

  return [state, { login, logout }]
}

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    rehydrated: false,
    auth: null,
  })

  useEffect(() => {
    const getItemFromStorage = async () => {
      try {
        const data = await AsyncStorage.getItem(STORAGE_KEY)
        if (data) {
          setState(prevState => ({
            ...prevState,
            auth: JSON.parse(data),
            rehydrated: true,
          }))
        } else {
          setState(prevState => ({
            ...prevState,
            rehydrated: true,
            auth: null,
          }))
        }
      } catch (e) {
        console.log("Error loading auth from AsyncStorage:", e)
        setState(prevState => ({ ...prevState, rehydrated: true }))
      }
    }

    getItemFromStorage()
  }, [])

  useEffect(() => {
    if (state.rehydrated) {
      const saveAuthToStorage = async () => {
        try {
          if (state.auth) {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state.auth))
          } else {
            await AsyncStorage.removeItem(STORAGE_KEY)
          }
        } catch (err) {
          console.log("Error saving auth to AsyncStorage:", err)
        }
      }
      saveAuthToStorage()
    }
  }, [state.auth, state.rehydrated])

  if (!state.rehydrated) {
    return null
  }

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  )
}
