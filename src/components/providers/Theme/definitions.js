const baseColors = {
  black: '#000000',
  white: '#ffffff',
  red: '#FF647C',
  green: '#0BD9B3',
  blue: '#487FD9',
  yellow: '#EBC455',
  gray: '#A0A2AE',
}

const grayscale = [
  baseColors.black,
  `#2d2d2d`,
  `#4a4a4a`,
  `#686868`,
  `#858585`,
  `#a3a3a3`,
  `#c0c0c0`,
  `#dddddd`,
  baseColors.white,
]

const brandColors = {
  jet: '#2f3037',
  raisinBlack: '#16171C',
  caribbeanGreen: baseColors.green,
}

const colors = {
  ...baseColors,
  ...brandColors,
  grayscale,
}

const fontSizes = [10, 12, 14, 16, 18, 21, 24, 27, 30, 36, 42, 48]
const space = [4, 12, 16, 18, 20, 24, 28, 32, 64, 128]

export const definitions = {
  colors,
  fontSizes,
  space,
  borderWidth: [0, 1, 2, 3, 4, 5],
  borderStyles: ['solid'],
  radii: {
    sm: 4,
    md: 8,
    lg: 12,
    full: '100%',
  },
}
