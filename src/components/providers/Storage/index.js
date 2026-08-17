import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react'

const InMemoryStorageContext = createContext([{}, () => ({})])

export const InMemoryStorageProvider = ({ initialStorage = {}, children }) => {
  const [state, setState] = useState(initialStorage)

  return (
    <InMemoryStorageContext.Provider value={[state, setState]}>
      {children}
    </InMemoryStorageContext.Provider>
  )
}

const PersistenceProvider = ({ onRehydrate, persistenceAdapter, children }) => {
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
}) => {
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
  const [state, setState] = useContext(InMemoryStorageContext)
  return [state, setState]
}
