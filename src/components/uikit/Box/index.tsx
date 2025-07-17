import styled from 'styled-components/native'

import { background, margin, padding, flexbox } from '../../Theme/styled'
import { View } from 'react-native'

export const Box = styled(View)`
  ${background}
  ${padding}
  ${margin}
  ${flexbox}
`
