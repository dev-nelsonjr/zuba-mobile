/**
 * @format
 */

import { AppRegistry } from 'react-native'
import { encode, decode } from 'base-64'

import { name as appName } from './app.json'
import * as MainModule from './src/index.js'

const Main = MainModule.default || MainModule.Main

if (!global.btoa) {
  global.btoa = encode
}

if (!global.atob) {
  global.atob = decode
}

AppRegistry.registerComponent(appName, () => Main)
