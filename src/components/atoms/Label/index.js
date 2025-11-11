import { themeGet } from '@styled-system/theme-get'
import styled from 'styled-components/native'

import { Text } from '~/components/atoms/Text'

export const Label = styled(Text)`
  padding: ${themeGet('space.2')}px ${themeGet('space.3')}px;
`
