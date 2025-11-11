import { SafeAreaView } from 'react-native'
import styled from 'styled-components/native'

import { background, space, color, flexbox } from 'styled-system'

export const SafeArea = styled(SafeAreaView)`
  ${background}
  ${space}
  ${color}
  ${flexbox}
`
