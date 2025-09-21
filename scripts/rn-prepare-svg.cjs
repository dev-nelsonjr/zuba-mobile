if (!process.stdout.cursorTo) {
  process.stdout.cursorTo = () => {}
}

if (!process.stdout.clearLine) {
  process.stdout.clearLine = () => {}
}

require('react-native-prepare-svg/bin/rn-prepare-svg')
