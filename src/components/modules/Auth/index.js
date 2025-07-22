import * as React from 'react';
import { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext( [{}, () => ({})]);

export const useAuth = () => {
  const [state, setState] = useContext(AuthContext);
  const logout = () => setState(false)

  return [state, { login: setState, logout }];
}
export const AuthProvider = ({ children }) => {
  const [state, setState] = useState(() =>{})

  const setData = async(value) => {
    try {
    await AsyncStorage.seItem('auth', state &&JSON.stringify(value))
   } catch(err) {
    console.log(err)
   }
  }

  const getData = async() => {
    try {
      const data = await AsyncStorage.getItem('auth')

      if(data !== null) {
        setState(data)
      }
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {
    setData(state)
  }, [state])

  useEffect( () => {
    getData()
  }, [])

  return (
  <AuthContext.Provider value={[state, setState]}>
    {children}
  </AuthContext.Provider>
)
}
