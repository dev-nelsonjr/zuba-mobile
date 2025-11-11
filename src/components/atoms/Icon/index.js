import * as React from 'react'
import * as svg from 'react-native-svg'

import icons from './map.json'

export const Icon = ({ name, color = 'white', ...props }) => {
  const icon = icons[name]

  const element = (child, index) => {
    const Element = svg[child.type]

    return <Element key={index} {...child.attrs} stroke={color} />
  }

  return (
    <svg.Svg {...icon.attrs} {...props}>
      {icon.childs.map(element)}
    </svg.Svg>
  )
}
