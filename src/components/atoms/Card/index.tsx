import type { ReactNode } from 'react'
import styled from 'styled-components/native'
import { themeGet } from '@styled-system/theme-get'

import { Box } from '~/components/atoms/Box'
import type { BoxProps } from '~/components/atoms/Box'
import { Text } from '~/components/atoms/Text'
import { Icon, type IconName } from '~/components/atoms/Icon'

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

interface CardProps extends Omit<BoxProps, 'children' | 'title'> {
  icon?: IconName
  title?: string
  children?: ReactNode
}

export const Card = ({
  icon,
  title,
  bg = 'black',
  children,
  ...props
}: CardProps) => (
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
