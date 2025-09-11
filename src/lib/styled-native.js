import * as React from 'react'

const ThemeContext = React.createContext({})

const stylePropNames = new Set([
  'bg',
  'p',
  'px',
  'py',
  'pb',
  'pt',
  'pl',
  'pr',
  'm',
  'mx',
  'my',
  'mb',
  'mt',
  'ml',
  'mr',
  'center',
  'flex',
  'flexDirection',
  'justifyContent',
  'alignItems',
  'color',
  'fontSize',
  'fontWeight',
  'textAlign',
  'hasError',
])

export const ThemeProvider = ({ theme, children }) => (
  <ThemeContext.Provider value={theme || {}}>{children}</ThemeContext.Provider>
)

export const ThemeConsumer = ThemeContext.Consumer
export const ThemeContextValue = ThemeContext
export const ThemeContextProvider = ThemeContext.Provider
export { ThemeContext }

export const useTheme = () => React.useContext(ThemeContext)

export const css = (strings, ...interpolations) => ({
  __styledNativeCss: true,
  strings,
  interpolations,
})

const toCamelCase = property =>
  property.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())

const parseValue = value => {
  const trimmed = String(value).trim()

  if (/^-?\d+(\.\d+)?px$/.test(trimmed)) {
    return Number(trimmed.replace('px', ''))
  }

  if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
    return Number(trimmed)
  }

  return trimmed
}

const applyBoxValue = (style, prefix, value) => {
  const parts = value.trim().split(/\s+/)
  const [top, right = top, bottom = top, left = right] = parts.map(parseValue)

  style[`${prefix}Top`] = top
  style[`${prefix}Right`] = right
  style[`${prefix}Bottom`] = bottom
  style[`${prefix}Left`] = left
}

const applyDeclaration = (style, rawProperty, rawValue) => {
  const property = rawProperty.trim()
  const value = rawValue.trim()

  if (!property || !value) {
    return
  }

  if (property === 'background') {
    style.backgroundColor = parseValue(value)
    return
  }

  if (property === 'border') {
    if (value === 'none') {
      style.borderWidth = 0
      return
    }

    const [width, borderStyle, color] = value.split(/\s+/)
    style.borderWidth = parseValue(width)
    style.borderStyle = borderStyle
    style.borderColor = color
    return
  }

  if (property === 'padding') {
    applyBoxValue(style, 'padding', value)
    return
  }

  if (property === 'margin') {
    applyBoxValue(style, 'margin', value)
    return
  }

  style[toCamelCase(property)] = parseValue(value)
}

const parseStyle = cssText => {
  const style = {}

  cssText
    .split(';')
    .map(rule => rule.trim())
    .filter(Boolean)
    .forEach(rule => {
      const separator = rule.indexOf(':')

      if (separator === -1) {
        return
      }

      applyDeclaration(
        style,
        rule.slice(0, separator),
        rule.slice(separator + 1)
      )
    })

  return style
}

const resolveTemplate = (strings, interpolations, props) => {
  let output = ''

  strings.forEach((chunk, index) => {
    output += chunk

    if (index >= interpolations.length) {
      return
    }

    output += resolveInterpolation(interpolations[index], props)
  })

  return output
}

const resolveInterpolation = (interpolation, props) => {
  const value =
    typeof interpolation === 'function' ? interpolation(props) : interpolation

  if (!value) {
    return ''
  }

  if (value.__styledNativeCss) {
    return resolveTemplate(value.strings, value.interpolations, props)
  }

  return String(value)
}

const omitStyleProps = props =>
  Object.fromEntries(
    Object.entries(props).filter(
      ([key]) => key !== 'theme' && !stylePropNames.has(key)
    )
  )

const styled =
  Component =>
  (strings, ...interpolations) => {
    const StyledComponent = React.forwardRef((props, ref) => {
      const theme = React.useContext(ThemeContext)
      const propsWithTheme = { ...props, theme }
      const generatedStyle = parseStyle(
        resolveTemplate(strings, interpolations, propsWithTheme)
      )
      const forwardedProps = omitStyleProps(props)

      return (
        <Component
          {...forwardedProps}
          ref={ref}
          style={[generatedStyle, props.style]}
        />
      )
    })

    StyledComponent.displayName = `Styled(${
      Component.displayName || Component.name || 'Component'
    })`

    return StyledComponent
  }

export default styled
