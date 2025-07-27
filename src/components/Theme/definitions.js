const baseColors = {
  black: '#000000',
  white: '#ffffff',
  red: '#FF647C',
  green: '#0BD9B3',
  blue: '#487FD9',
  yellow: '#EBC455',
  gray: '#A0A2AE',
}

 const brandColors = {
  raisinBlack: '#16171C',
  caribbeanGreen: baseColors.green,
}

const colors = {
  ...baseColors,
  ...brandColors,
}

const fontSizes = [10, 12, 14, 16, 18, 21, 24, 27, 30, 36, 42, 48]
const spaces = [4, 12, 16, 18, 20, 24, 28, 32, 64, 128]

export const definitions = {
  colors,
  fontSizes,
  spaces,
}
