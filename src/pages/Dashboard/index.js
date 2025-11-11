import * as React from 'react'
import { useState } from 'react'
import { StatusBar, ScrollView } from 'react-native'

import { themeGet } from '@styled-system/theme-get'
import styled from 'styled-components/native'
import { useQuery } from '@tanstack/react-query'
import { useNavigation } from '@react-navigation/native'

import { getDashboard } from '~/services/sdk'

import { SafeArea, Box, Text, Icon, Button } from '~/components/atoms'
import { Transaction } from '~/components/molecules'

const Screen = ({
  bg = 'raisinBlack',
  barStyle = 'light-content',
  children,
  ...props
}) => (
  <SafeArea bg={bg} flex={1}>
    <StatusBar barStyle={barStyle} />
    <ScrollView {...props}>{children}</ScrollView>
  </SafeArea>
)

const Section = styled(Box)`
  border-radius: 12px;
  background: ${themeGet('colors.black')};
  padding: ${themeGet('space.4')}px;
`
const SectionTitle = styled(Text)`
  color: ${themeGet('colors.gray')};
  font-size: ${themeGet('fontSizes.3')}px;
  margin: 0;
  font-weight: 400;
  padding: ${themeGet('space.1')}px;
`
const getCurrentMonth = () => {
  const now = new Date()
  return now.getMonth() + 1
}

export const Dashboard = () => {
  const navigation = useNavigation()
  const [month, setMonth] = useState(getCurrentMonth)

  const { data } = useQuery({
    queryKey: ['dashboard', month],
    queryFn: () => getDashboard({ month: month }),
  })

  return (
    <Screen>
      <Box p={4}>
        <Section>
          <Box flexDirection="row" alignItems="center">
            <Icon name="resume" width={40} height={40} />
            {/* eslint-disable-next-line react-native/no-raw-text */}
            <SectionTitle>resumo diario</SectionTitle>
          </Box>

          {/* <Box p={2}>
            {isLoading && <Text>loading...</Text>}
            {!isLoading &&
              data.map(({ id, description, value }) => (
                <Tr ansaction key={id} title={description} value={value} />
              ))}
          </Box>*/}
        </Section>
      </Box>

      <Box p={4}>
        <Button
          label="Add"
          onPress={() => navigation.navigate('/transaction')}
        />
      </Box>
    </Screen>
  )
}
