import { SafeAreaView } from 'react-native'
import styled from 'styled-components/native'

import { background, padding, margin, flexbox } from '../../Theme/styled'

export const SafeArea = styled(SafeAreaView)`
  ${background}
  ${padding}
${margin}
${flexbox}
`
