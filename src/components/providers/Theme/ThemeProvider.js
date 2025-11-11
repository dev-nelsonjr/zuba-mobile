import * as React from 'react'
import { ThemeProvider } from 'styled-components/native'
import { definitions } from './definitions.js'

const Theme = ({ children }) => (
  <ThemeProvider theme={definitions}>{children}</ThemeProvider>
)

export default Theme
export { Theme }
