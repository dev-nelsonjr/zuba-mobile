import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import * as ThemeModule from './components/providers/Theme/ThemeProvider.js'
import { StorageProvider } from './components/providers/Storage'
import { onRehydrateAuthMiddleware } from '~/components/providers/Auth'
import * as asyncStorage from './components/providers/Storage/persistence-adapter/async-storage'

import { App } from './pages'

const queryClient = new QueryClient()

const Theme = ThemeModule.default || ThemeModule.Theme

export const Main = () => {
  return (
    <Theme>
      <QueryClientProvider client={queryClient}>
        <StorageProvider
          persistenceAdapter={asyncStorage}
          onRehydrate={onRehydrateAuthMiddleware}
        >
          <App />
        </StorageProvider>
      </QueryClientProvider>
    </Theme>
  )
}

export default Main
