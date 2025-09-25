import * as React from 'react'
import { StatusBar, ScrollView } from 'react-native'
import styled from '~/lib/styled-native'
import { useQuery } from '@tanstack/react-query'
import { useNavigation } from '@react-navigation/native'

import { getTransactions } from '../../components/modules'

import { th } from '../../components/Theme'
import { SafeArea, Box, Text, Icon, Button } from '~/components/uikit'
import { Transaction } from '~/components/system'

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
  background: ${th.color('black')};
  padding: ${th.space(4)}px;
`
const SectionTitle = styled(Text)`
  color: ${th.color('gray')};
  font-size: ${th.size(3)}px;
  margin: 0;
  font-weight: 400;
  padding: ${th.space(1)}px;
`

export const Dashboard = () => {
  const navigation = useNavigation()

  const { data, isLoading } = useQuery({
    queryKey: ['Transactions'],
    queryFn: getTransactions,
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

          <Box p={2}>
            {isLoading && <Text>loading...</Text>}
            {!isLoading &&
              data.map(({ id, description, value }) => (
                <Transaction key={id} title={description} value={value} />
              ))}
          </Box>
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
