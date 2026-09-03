import { useState, type ReactNode } from 'react'
import {
  StatusBar,
  ScrollView,
  type ScrollViewProps,
  type StatusBarStyle,
} from 'react-native'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigation, type NavigationProp } from '@react-navigation/native'

import { Transaction, MonthSelect } from '~/components/molecules'

import {
  deleteTransaction,
  getDashboard,
  updateTransaction,
} from '~/services/sdk'

import { SafeArea, Box, Text, Button, Card, Currency } from '~/components/atoms'
import type { AppDrawerParamList } from '../routes'

interface ScreenProps extends ScrollViewProps {
  bg?: string
  barStyle?: StatusBarStyle
  children: ReactNode
}

const Screen = ({
  bg = 'raisinBlack',
  barStyle = 'light-content',
  children,
  ...props
}: ScreenProps) => (
  <SafeArea bg={bg} flex={1}>
    <StatusBar barStyle={barStyle} />
    <ScrollView {...props}>{children}</ScrollView>
  </SafeArea>
)

export const Dashboard = () => {
  const queryClient = useQueryClient()
  const navigation = useNavigation<NavigationProp<AppDrawerParamList>>()
  const [month, setMonth] = useState(() => new Date())

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['dashboard', month.getFullYear(), month.getMonth() + 1],
    queryFn: () =>
      getDashboard({
        month: month.getMonth() + 1,
        year: month.getFullYear(),
      }),
  })

  const refreshDashboard = () =>
    queryClient.invalidateQueries({ queryKey: ['dashboard'] })

  const statusMutation = useMutation({
    mutationFn: updateTransaction,
    onSuccess: refreshDashboard,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: refreshDashboard,
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
                {(statusMutation.isError || deleteMutation.isError) && (
                  <Text color="red" textAlign="center" mb={2}>
                    Unable to save the transaction change.
                  </Text>
                )}

                {!data?.docs?.length && (
                  <Text color="grayscale.5" textAlign="center" p={4}>
                    No transactions registered for this month.
                  </Text>
                )}

                {data?.docs?.map(
                  ({ id, description, value, type, resolved }) => (
                    <Transaction
                      key={id}
                      title={description}
                      value={value}
                      type={type}
                      resolved={resolved}
                      disabled={
                        statusMutation.isPending || deleteMutation.isPending
                      }
                      onToggle={() =>
                        statusMutation.mutate({ id, resolved: !resolved })
                      }
                      onDelete={() => deleteMutation.mutate(id)}
                    />
                  )
                )}
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
