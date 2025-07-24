module.exports = {
  preset: 'react-native',
  setupFiles: [
    './jest/setup.js'
  ],
  "setupFilesAfterEnv": [
    '@testing-library/jest-native/extend-expect'
  ],

  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation)'
  ],

  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.test.{js,jsx,ts,tsx}",
    "!src/**/index.{js,ts}"
  ]
};
