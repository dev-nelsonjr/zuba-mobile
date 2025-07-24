import React from 'react'

import { Theme, AuthProvider } from './components'
import { App } from './pages'

export const Main = () => {
  return (
    <Theme>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Theme>
  )
}
