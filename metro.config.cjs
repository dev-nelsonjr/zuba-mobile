const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config')

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname)

const config = {
  transformer: {
    ...defaultConfig.transformer,
    assetRegistryPath: 'react-native/Libraries/Image/AssetRegistry',
  },
}

module.exports = mergeConfig(defaultConfig, config)
