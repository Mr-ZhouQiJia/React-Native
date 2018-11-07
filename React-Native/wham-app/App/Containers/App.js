import '../Config'
import DebugConfig from '../Config/DebugConfig'
import React, { Component } from 'react'
import { AppState, View, Image } from 'react-native'
import { Provider } from 'react-redux'
import codePush from 'react-native-code-push'
import { Sentry } from 'react-native-sentry'
import SplashScreen from 'aloestec-rn-splash-screen'
import { ATModal } from 'aloestec-rn-components'
// import JPush from 'jpush-react-native'
import { Images } from '../Themes'
import Config from '../Config/AppConfig'
import RootContainer from './RootContainer'
import createStore from '../Redux'
import Helper from '../Lib/Helper'

// create our store
const store = createStore()

class App extends Component {
  timer = null
  canHide = false
  splash = null
  afterFirstIn = false

  componentDidMount () {
    this.hideSplash()
    // if (!Helper.IS_ANDROID) JPush.setBadge(0, () => {})
    AppState.addEventListener('change', this.appStateChange)
    setTimeout(() => {
      this.afterFirstIn = true
    }, 2000)
    if (!Config.debug) {
      codePush.getUpdateMetadata().then((update) => {
        if (update) {
          Sentry.setDist(`${Helper.APP_DIST}`)
          Sentry.setRelease(`${Helper.APP_BUNDLE_ID}-${Helper.APP_PLATFORM}-${Helper.APP_VERSION}-codepush:${update.label}`)
          // Sentry.setVersion(`${Helper.APP_BUNDLE_ID}-${Helper.APP_PLATFORM}-${Helper.APP_VERSION}-codepush:${update.label}`)
        }
      })
    }
  }

  componentWillUnmount () {
    clearInterval(this.timer)
    AppState.removeEventListener('change', this.appStateChange)
  }

  appStateChange = (newState) => {
    // if (!Helper.IS_ANDROID) JPush.setBadge(0, () => {})
    if (newState === 'active' && !Config.debug && this.afterFirstIn) {
      this.codePushSync()
    }
  }

  iosShowSplash = () => {
    this.splash = ATModal.modal({
      render: () => <View style={{width: Helper.APP_WIDTH, height: Helper.APP_HEIGHT}}>
        <Image source={Images.splash} style={{width: '100%', height: '100%', resizeMode: 'stretch'}} />
      </View>,
      animationDuration: 0,
      animation: false,
      backdropOpacity: 0
    })
  }

  hideSplash = () => {
    clearInterval(this.timer)
    if (Config.debug) {
      SplashScreen.hide()
      return
    }
    this.timer = setInterval(() => {
      if (this.canHide) {
        clearInterval(this.timer)
        SplashScreen.hide()
      }
    }, 500)
  }

  iosHideSplash = () => {
    clearInterval(this.timer)
    if (Config.debug) {
      this.splash.close()
      return
    }
    this.timer = setInterval(() => {
      if (this.canHide) {
        clearInterval(this.timer)
        this.splash.close()
      }
    }, 500)
  }

  codePushSync = () => {
    return codePush.sync({}, status => {
      console.log('*****status: ', status)
      if (status === codePush.SyncStatus.CHECKING_FOR_UPDATE) {
      } else if (status === codePush.SyncStatus.DOWNLOADING_PACKAGE) {
        console.log('Downloading package.')
        this.canHide = false
        if (Helper.IS_ANDROID) {
          SplashScreen.show()
          this.hideSplash()
        } else {
          this.iosShowSplash()
          this.iosHideSplash()
        }
      } else if (status === codePush.SyncStatus.INSTALLING_UPDATE) {
      } else if (status === codePush.SyncStatus.UP_TO_DATE) {
        console.log('Up-to-date.')
        this.canHide = true
      } else if (status === codePush.SyncStatus.UPDATE_INSTALLED) {
        console.log('Update installed.')
        this.canHide = true
      }
    })
  }

  codePushStatusDidChange (status) {
    switch (status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log('Checking for updates.')
        break
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log('Downloading package.')
        this.canHide = false
        break
      case codePush.SyncStatus.INSTALLING_UPDATE:
        console.log('Installing update.')
        break
      case codePush.SyncStatus.UNKNOWN_ERROR:
        console.log('Installing update.')
        this.canHide = true
        break
      case codePush.SyncStatus.UP_TO_DATE:
        console.log('Up-to-date.')
        this.canHide = true
        break
      case codePush.SyncStatus.UPDATE_INSTALLED:
        console.log('Update installed.')
        this.canHide = true
        codePush.restartApp()
        break
    }
  }

  render () {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}

const MyApp = !Config.debug ? codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_START
})(App) : App

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron
  ? console.tron.overlay(MyApp)
  : codePush(MyApp)
