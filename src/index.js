import React from 'react'

import { Theme } from './components'
import { StorageProvider } from './components/modules/Storage'
import * as asyncStorage from './components/modules/Storage/persistence-adapter/async-storage'

import { App } from './pages'

export const Main = () => {
  return (
    <Theme>
      <StorageProvider persistenceAdapter={asyncStorage}>
        <App />
      </StorageProvider>
    </Theme>
  )
}
