import * as React from 'react'
import styled from 'styled-components'
import { themeGet } from '@styled-system/theme-get'

import { Box } from '~/components/atoms/Box'
import { Text } from '~/components/atoms/Text'
import { Icon } from '~/components/atoms/Icon'

const Container = styled(Box)`
  border-radius: ${themeGet('space.1')}px;
  padding: ${themeGet('space.1')}px;
`

const Header = styled(Box)`
  display: flex;
  align-items: center;
  padding: ${themeGet('space.2')}px;
  color: ${themeGet('colors.grayscale.4')};
  flex-direction: row;
`

const Title = styled(Text)`
  color: ${themeGet('colors.gray')};
  font-size: ${themeGet('fontSizes.3')}px;
  margin: 0;
  font-weight: 400;
  padding: ${themeGet('space.1')}px;
`

export const Card = ({ icon, title, bg = 'black', children, ...props }) => (
  <Container {...props} bg={bg}>
    {title && (
      <Header>
        {icon && <Icon name={icon} width={40} height={40} />}
        <Title>{title}</Title>
      </Header>
    )}

    {children && <Box p={2}>{children}</Box>}
  </Container>
)
