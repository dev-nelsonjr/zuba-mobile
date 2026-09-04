module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['inline-dotenv'],
    ['module-resolver', { alias: { '~': './src', '@': '.' } }],
    'react-native-worklets/plugin',
  ],
}
