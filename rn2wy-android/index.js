/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native'
import App from './src/App'
import {name as appName} from './app.json'
import {PaperProvider} from 'react-native-paper'

LogBox.ignoreLogs(['new NativeEventEmitter']) // Ignore log notification by message

export default Main = () => {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  )
}

AppRegistry.registerComponent(appName, () => Main)
