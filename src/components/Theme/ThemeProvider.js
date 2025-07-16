import * as React from 'react'
import { ThemeProvider } from 'styled-components/native'

import { definitions as config } from './Config.js'

export const Theme = ({ children }) => (
  <ThemeProvider theme={config}>
    {children}
  </ThemeProvider>
)
