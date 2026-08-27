import { Path, Svg, type SvgProps } from 'react-native-svg'

import icons from './map.json'

export type IconName = keyof typeof icons

interface IconProps extends SvgProps {
  name: IconName
  color?: string
}

export const Icon = ({ name, color = 'white', ...props }: IconProps) => {
  const icon = icons[name]

  return (
    <Svg {...icon.attrs} {...props}>
      {icon.childs.map((child, index) => (
        <Path key={index} {...child.attrs} stroke={color} />
      ))}
    </Svg>
  )
}
