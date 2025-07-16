const getIf = (prop, value) => (prop ? value : '')

export const theme = prop => value => props => props.theme[prop]?.[value] || value
export const th = {
  space: theme('spaces'),
  size: theme('fontSizes'),
  color: theme('colors'),
}

export const flexbox = props => {
  const direction = typeof props.flexbox === 'string' ? props.flexbox : undefined

  const justifyContent = props.justifyContent || (props.center && 'center' )
  const alignItems = props.alignItems || (props.center && 'center' )

  return `
    ${getIf(props.flex, `flex: ${props.flex};`)}
    ${getIf(direction, `flex-direction: ${direction};`)}
    ${getIf(justifyContent, `justify-content: ${justifyContent};`)}
    ${getIf(alignItems, `align-items: ${alignItems};`)}
  `
}

export const background = props =>
  getIf(props.bg, `background-color: ${props.theme.colors[props.bg] || props.bg};`)

  export const font = props => {
      const color = getIf(props.color, `color: ${props.theme.colors[props.color] || props.color};`)

      const size = getIf(
        props.fontSize !== undefined && props.theme.fontSizes[props.fontSize] !== undefined,
        `font-size: ${props.theme.fontSizes[props.fontSize]}px;`
      );

  return `
    ${getIf(color, color)}
    ${getIf(size, size)}
    ${getIf(props.fontWeight, `font-weight: ${props.fontWeight};`)}
    ${getIf(props.textAlign, `text-align: ${props.textAlign};`)}
    `
}

export const margin = props => {
  const mb = props.mb ?? props.my ?? props.m
  const mt = props.mt ?? props.my ?? props.m
  const ml = props.ml ?? props.mx ?? props.m
  const mr = props.mr ?? props.mx ?? props.m

  return `
    ${mb !== undefined ? `margin-bottom: ${props.theme.spaces[mb]}px;` : ''}
    ${mt !== undefined ? `margin-top: ${props.theme.spaces[mt]}px;` : ''}
    ${ml !== undefined ? `margin-left: ${props.theme.spaces[ml]}px;` : ''}
    ${mr !== undefined ? `margin-right: ${props.theme.spaces[mr]}px;` : ''}
  `
}
export const padding = props => {
  const pb = props.pb ?? props.py ?? props.p
  const pt = props.pt ?? props.py ?? props.p
  const pl = props.pl ?? props.px ?? props.p
  const pr = props.pr ?? props.px ?? props.p

  return `
    ${pb !== undefined ? `padding-bottom: ${props.theme.spaces[pb]}px;` : ''}
    ${pt !== undefined ? `padding-top: ${props.theme.spaces[pt]}px;` : ''}
    ${pl !== undefined ? `padding-left: ${props.theme.spaces[pl]}px;` : ''}
    ${pr !== undefined ? `padding-right: ${props.theme.spaces[pr]}px;` : ''}
  `
}
