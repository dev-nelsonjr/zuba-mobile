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

const PersistenceProvider = ({ persistenceAdapter, children }) => {
  const [state, setState] = useContext(InMemoryStorageContext)

  const onRehydrate = useCallback(async () => {
    const result = await persistenceAdapter.getItem()
    setState({
      ...(result && result),
      rehydrated: true,
    })
  }, [setState, persistenceAdapter])

  useEffect(() => {
    onRehydrate()
  }, [onRehydrate])

  useEffect(() => {
    if (state?.rehydrated) {
      persistenceAdapter.setItem(state)
    }
  }, [JSON.stringify(state), persistenceAdapter, state.rehydrated])

  return children
}

export const StorageProvider = ({ persistenceAdapter, children }) => {
  const initialStorage = {
    rehydrated: false,
  }

  return (
    <InMemoryStorageProvider initialStorage={initialStorage}>
      <PersistenceProvider persistenceAdapter={persistenceAdapter}>
        {children}
      </PersistenceProvider>
    </InMemoryStorageProvider>
  )
}

export const useStorage = () => {
  const [state, setState] = useContext(InMemoryStorageContext)
  return [state, setState]
}
