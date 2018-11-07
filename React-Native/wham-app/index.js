import './App/Config/ReactotronConfig'
import { AppRegistry, YellowBox } from 'react-native'
import App from './App/Containers/App'
import Config from './App/Config/AppConfig'
import { Sentry } from 'react-native-sentry'

if (!Config.debug) {
  Sentry.config('https://112daba776dd4529bba365ef042ecfd7:6be6608898e54f6a8ea911a689baf21c@sentry.io/1255304').install()
}

YellowBox.ignoreWarnings([
  'Class RCTCxxModule was not exported',
  'Module RNAloestecRnAmapLocation requires main queue',
  'Module RNFetchBlob requires main queue',
  'Remote debugger is in a background tab',
  'Module RCTImageLoader requires main queue',
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: componentWillUpdate is deprecated',
  'Warning: isMounted(...) is deprecated in plain JavaScript React classes.',
  'Method `jumpToIndex` is deprecated'
])

AppRegistry.registerComponent('whamApp', () => App)
