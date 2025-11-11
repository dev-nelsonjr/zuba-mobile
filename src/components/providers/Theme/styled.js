import { definitions } from './definitions'

const getIf = (prop, value) => (prop ? value : '')
const getTheme = props => props.theme || definitions

export const theme = prop => value => props =>
  getTheme(props)[prop]?.[value] || value
export const th = {
  space: theme('space'),
  size: theme('fontSizes'),
  color: theme('colors'),
}

export const flexbox = props => {
  const justifyContent = props.justifyContent || (props.center && 'center')
  const alignItems = props.alignItems || (props.center && 'center')

  return `
    ${getIf(props.flex, `flex: ${props.flex};`)}
    ${getIf(props.flexDirection, `flex-direction: ${props.flexDirection};`)}
    ${getIf(justifyContent, `justify-content: ${justifyContent};`)}
    ${getIf(alignItems, `align-items: ${alignItems};`)}
  `
}

export const background = props => {
  const { colors } = getTheme(props)
  return getIf(props.bg, `background: ${colors[props.bg]};`)
}

export const font = props => {
  const { colors, fontSizes } = getTheme(props)
  const color = getIf(
    props.color,
    `color: ${colors[props.color] || props.color};`
  )

  const size = getIf(
    props.fontSize !== undefined && fontSizes[props.fontSize] !== undefined,
    `font-size: ${fontSizes[props.fontSize]}px;`
  )

  return `
    ${getIf(color, color)}
    ${getIf(size, size)}
    ${getIf(props.fontWeight, `font-weight: ${props.fontWeight};`)}
    ${getIf(props.textAlign, `text-align: ${props.textAlign};`)}
    `
}

export const margin = props => {
  const { spaces } = getTheme(props)
  const mb = props.mb ?? props.my ?? props.m
  const mt = props.mt ?? props.my ?? props.m
  const ml = props.ml ?? props.mx ?? props.m
  const mr = props.mr ?? props.mx ?? props.m

  return `
    ${mb !== undefined ? `margin-bottom: ${spaces[mb]}px;` : ''}
    ${mt !== undefined ? `margin-top: ${spaces[mt]}px;` : ''}
    ${ml !== undefined ? `margin-left: ${spaces[ml]}px;` : ''}
    ${mr !== undefined ? `margin-right: ${spaces[mr]}px;` : ''}
  `
}
export const padding = props => {
  const { spaces } = getTheme(props)
  const pb = props.pb ?? props.py ?? props.p
  const pt = props.pt ?? props.py ?? props.p
  const pl = props.pl ?? props.px ?? props.p
  const pr = props.pr ?? props.px ?? props.p

  return `
    ${pb !== undefined ? `padding-bottom: ${spaces[pb]}px;` : ''}
    ${pt !== undefined ? `padding-top: ${spaces[pt]}px;` : ''}
    ${pl !== undefined ? `padding-left: ${spaces[pl]}px;` : ''}
    ${pr !== undefined ? `padding-right: ${spaces[pr]}px;` : ''}
  `
}
