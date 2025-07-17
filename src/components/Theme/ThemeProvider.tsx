import * as React from 'react'
import { ThemeProvider } from 'styled-components/native'

import { definitions } from './definitions'

interface ThemeProps {
  children: React.ReactNode;
}

export const Theme = ({ children }: ThemeProps) => (
  <ThemeProvider theme={definitions}>
    {children}
  </ThemeProvider>
)
