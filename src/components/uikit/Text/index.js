import { Text as BaseText } from 'react-native'
import styled from '~/lib/styled-native'

import { th, padding, margin, font } from '../../Theme/styled'

export const Text = styled(BaseText)`
  color: ${th.color('white')};
  ${padding}
  ${margin}
${font}
`
