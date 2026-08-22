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

export const Dashboard = () => {
  const navigation = useNavigation()
  const [month, setMonth] = useState(() => new Date())

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['dashboard', month.getFullYear(), month.getMonth() + 1],
    queryFn: () =>
      getDashboard({
        month: month.getMonth() + 1,
        year: month.getFullYear(),
      }),
  })

  return (
    <Screen>
      <MonthSelect value={month} onChange={setMonth} />

      <Box p={4}>
        {isPending && (
          <Card>
            <Box p={6} alignItems="center">
              <Text color="grayscale.5">Loading dashboard...</Text>
            </Box>
          </Card>
        )}

        {isError && (
          <Card>
            <Box p={6} alignItems="center">
              <Text color="grayscale.5">Unable to load your dashboard.</Text>
              <Button label="Try again" onPress={() => refetch()} mt={3} />
            </Box>
          </Card>
        )}

        {!isPending && !isError && (
          <>
            <Card mb={2}>
              <Currency value={data?.total} fontSize={9} />
              <Text fontSize={2} color="grayscale.5">
                Current balance
              </Text>
            </Card>

            <Card icon="graph" title="Monthly Balance" mb={2}>
              <Box p={1} flexDirection="row">
                <Box flex={1}>
                  <Text fontSize={2} color="grayscale.5">
                    Income
                  </Text>
                </Box>
                <Currency value={data?.revenue} />
              </Box>

              <Box p={1} flexDirection="row">
                <Box flex={1}>
                  <Text fontSize={2} color="grayscale.5">
                    Expenses
                  </Text>
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

            <Card icon="resume" title="Transactions">
              <Box p={2}>
                {!data?.docs?.length && (
                  <Text color="grayscale.5" textAlign="center" p={4}>
                    No transactions registered for this month.
                  </Text>
                )}

                {data?.docs?.map(({ id, description, value }) => (
                  <Transaction key={id} title={description} value={value} />
                ))}
              </Box>
            </Card>

            <Button
              label="Add"
              onPress={() => navigation.navigate('/transaction')}
              mt={4}
            />
          </>
        )}
      </Box>
    </Screen>
  )
}
