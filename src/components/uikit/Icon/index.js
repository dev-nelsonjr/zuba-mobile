import * as React from 'react'
import * as svg from 'react-native-svg'

import icons from './map.json'

export const Icon = ({ name, color = 'white', size = 27 }) => {
  const icon = icons[name]

  const element = (child, index) => {
    const Element = svg[child.type]

    return <Element key={index} {...child.attrs} stroke={color} />
  }

  return (
    <svg.Svg {...icon.attrs} width={size} height={size}>
      {icon.childs.map(element)}
    </svg.Svg>
  )
}
