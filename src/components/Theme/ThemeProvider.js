import * as React from 'react'
import { ThemeProvider } from 'styled-components/native'

import { definitions } from './definitions'

export const Theme = ({ children }) => (
  <ThemeProvider theme={definitions}>{children}</ThemeProvider>
)
