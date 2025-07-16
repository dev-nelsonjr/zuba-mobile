import styled from "styled-components/native"

import { th } from '~/components/Theme/styled'
import { Text } from '~/components/uikit/Text'

export const Label = styled(Text)`
  padding: ${props => th.space(2)(props)}px ${props => th.space(3)(props)}px;
`
