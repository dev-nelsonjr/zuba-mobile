import * as React from 'react'
import { useState } from 'react'
import { StatusBar, ScrollView } from 'react-native'

import { useQuery } from '@tanstack/react-query'
import { useNavigation } from '@react-navigation/native'

import { Transaction, MonthSelect } from '~/components/molecules'

import { getDashboard } from '~/services/sdk'

import { SafeArea, Box, Text, Button, Card, Currency } from '~/components/atoms'

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

const getCurrentMonth = () => {
  const now = new Date()
  return now.getMonth() + 1
}

export const Dashboard = () => {
  const navigation = useNavigation()
  const [month, setMonth] = useState(() => new Date())

  const { data, isLoading } = useQuery({
    queryKey: ['dashboard', month],
    queryFn: () =>
      getDashboard({
        month: month.getMonth() + 1,
      }),
  })

  return (
    <Screen>
      <Box px={4} py={7}>
        <Currency value={data?.total} fontSize={10} textAlign="center" />
        <Text textAlign="center" p={2} fontSize={3} color="gray">
          Account balance
        </Text>
      </Box>
      <MonthSelect value={month} onChange={setMonth} />
      <Box p={4}>
        <Card icon="graph" title="Monthly Balance" mb={2}>
          <Box p={1} flexDirection="row">
            <Box fontSize={2} color="grayscale.5" flex={1}>
              <Text> Income </Text>
            </Box>
            <Currency value={data?.revenue} />
          </Box>

          <Box p={1} flexDirection="row">
            <Box fontSize={2} color="grayscale.5" flex={1}>
              <Text> Expanses </Text>
            </Box>
            <Currency value={data?.expense} />
          </Box>

          <Box
            px={0}
            py={3}
            mt={3}
            flexDirection="row"
            justifyContent="flex-end"
            borderTopWidth={1}
            borderTopColor="grayscale.1"
          >
            <Currency value={data?.balance} color="white" />
          </Box>
        </Card>

        <Card icon="resume" title="Daily summary">
          <Box p={2}>
            {isLoading && <Text>loading...</Text>}

            {!isLoading && !data?.docs?.length && (
              <Text>No information registered.</Text>
            )}

            {!isLoading &&
              data?.docs?.map(({ id, description, value }) => (
                <Transaction key={id} title={description} value={value} />
              ))}
          </Box>
        </Card>
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
