import * as React from 'react'
import { TouchableOpacity } from 'react-native'
import { addMonths, format, subMonths } from 'date-fns'

import { Box, Text } from '~/components/atoms'

export const MonthSelect = ({ value, onChange }) => (
  <Box
    flexDirection="row"
    justifyContent="space-between"
    alignItems="center"
    px={4}
    py={2}
  >
    <TouchableOpacity onPress={() => onChange(subMonths(value, 1))}>
      <Text fontSize={4}>‹</Text>
    </TouchableOpacity>

    <Text>{format(value, 'MM/yyyy')}</Text>

    <TouchableOpacity onPress={() => onChange(addMonths(value, 1))}>
      <Text fontSize={4}>›</Text>
    </TouchableOpacity>
  </Box>
)
