import type { ReactNode } from 'react'
import { ThemeProvider } from 'styled-components/native'
import { definitions } from './definitions'

interface ThemeProps {
  children: ReactNode
}

const Theme = ({ children }: ThemeProps) => (
  <ThemeProvider theme={definitions}>{children}</ThemeProvider>
)

export default Theme
export { Theme }
