import AsyncStorage from '@react-native-async-storage/async-storage'
import type { StorageState } from '..'

const STORAGE_KEY = '@zuba'

export const getItem = async (): Promise<StorageState | null> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY)
    return data ? (JSON.parse(data) as StorageState) : null
  } catch (error) {
    return Promise.reject(error)
  }
}
export const setItem = async (data: StorageState) => {
  try {
    const result = await AsyncStorage.setItem(
      STORAGE_KEY,
      data && JSON.stringify(data)
    )
    return result
  } catch (error) {
    return Promise.reject(error)
  }
}

export const clear = AsyncStorage.clear
