import React from 'react'

import * as ThemeModule from './components/Theme/ThemeProvider.js'
import { StorageProvider } from './components/modules/Storage'
import * as asyncStorage from './components/modules/Storage/persistence-adapter/async-storage'

import { App } from './pages'

const Theme = ThemeModule.default || ThemeModule.Theme

export const Main = () => {
  return (
    <Theme>
      <StorageProvider persistenceAdapter={asyncStorage}>
        <App />
      </StorageProvider>
    </Theme>
  )
}

export default Main
