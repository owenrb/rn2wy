/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native'
import App from './src/App'
import {name as appName} from './app.json'

LogBox.ignoreLogs(['new NativeEventEmitter']) // Ignore log notification by message

AppRegistry.registerComponent(appName, () => App)
