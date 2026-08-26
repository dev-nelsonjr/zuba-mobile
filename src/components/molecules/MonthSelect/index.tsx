import { TouchableOpacity } from 'react-native'
import { addMonths, format, subMonths } from 'date-fns'

import { Box, Text } from '~/components/atoms'

interface MonthSelectProps {
  value: Date
  onChange: (value: Date) => void
}

export const MonthSelect = ({ value, onChange }: MonthSelectProps) => (
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
