import { Text as BaseText } from 'react-native'
import { themeGet } from '@styled-system/theme-get'
import styled from 'styled-components/native'

import { color, space, typography } from 'styled-system'

export const Text = styled(BaseText)`
  color: ${themeGet('colors.white')};
  ${color}
  ${space}
  ${typography}
`
Text.defaultProps = {
  color: 'white',
}
