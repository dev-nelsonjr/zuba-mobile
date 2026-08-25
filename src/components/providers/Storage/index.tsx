import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react'

import type { AuthResponse } from '~/services/sdk/modules/auth'

export interface StorageState {
  rehydrated?: boolean
  auth?: AuthResponse | false
}

type StorageContextValue = [
  StorageState,
  Dispatch<SetStateAction<StorageState>>,
]

interface InMemoryStorageProviderProps {
  initialStorage?: StorageState
  children: ReactNode
}

interface PersistenceAdapter {
  getItem: () => Promise<StorageState | null>
  setItem: (data: StorageState) => Promise<unknown>
}

interface StorageProviderProps {
  onRehydrate: (
    data: StorageState | null
  ) => Promise<StorageState | null | undefined>
  persistenceAdapter: PersistenceAdapter
  children: ReactNode
}

const InMemoryStorageContext = createContext<StorageContextValue>([
  {},
  () => undefined,
])

export const InMemoryStorageProvider = ({
  initialStorage = {},
  children,
}: InMemoryStorageProviderProps) => {
  const [state, setState] = useState(initialStorage)

  return (
    <InMemoryStorageContext.Provider value={[state, setState]}>
      {children}
    </InMemoryStorageContext.Provider>
  )
}

const PersistenceProvider = ({
  onRehydrate,
  persistenceAdapter,
  children,
}: StorageProviderProps) => {
  const [state, setState] = useContext(InMemoryStorageContext)

  const rehydrate = useCallback(async () => {
    const result = await persistenceAdapter.getItem()
    const data = await onRehydrate(result)

    setState({
      ...(data && data),
      rehydrated: true,
    })
  }, [setState, persistenceAdapter, onRehydrate])

  useEffect(() => {
    rehydrate()
  }, [rehydrate])

  useEffect(() => {
    if (state?.rehydrated) {
      persistenceAdapter.setItem(state)
    }
  }, [state, persistenceAdapter])

  return children
}

export const StorageProvider = ({
  onRehydrate,
  persistenceAdapter,
  children,
}: StorageProviderProps) => {
  const initialStorage = {
    rehydrated: false,
  }

  return (
    <InMemoryStorageProvider initialStorage={initialStorage}>
      <PersistenceProvider
        persistenceAdapter={persistenceAdapter}
        onRehydrate={onRehydrate}
      >
        {children}
      </PersistenceProvider>
    </InMemoryStorageProvider>
  )
}

export const useStorage = () => {
  return useContext(InMemoryStorageContext)
}
