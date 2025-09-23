import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import * as ThemeModule from './components/Theme/ThemeProvider.js'
import { StorageProvider } from './components/modules/Storage'
import { onRehydrateAuthMiddleware } from '~/components/modules/Auth'
import * as asyncStorage from './components/modules/Storage/persistence-adapter/async-storage'

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
