import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

import { background, space, color, flexbox } from 'styled-system'

export const SafeArea = styled(SafeAreaView)`
  ${background}
  ${space}
  ${color}
  ${flexbox}
`
