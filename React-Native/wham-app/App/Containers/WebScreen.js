import React, { Component } from 'react'
import { View, WebView, BackHandler, AsyncStorage } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { ATIconButton } from 'aloestec-rn-components'
import { Header, Icon, Iconfont } from '../Components'
import { Colors, GlobalStyle } from '../Themes'
import Helper from '../Lib/Helper'

export default class WebScreen extends Component {
  constructor (props) {
    super(props)
    this.webView = null
    this.setWebViewFunc = this.setWebView.bind(this)
  }

  state = {
    backButtonEnabled: false,
    title: '',
    dataNeedSend: {},
    progress: 0,
    showProgress: false
  }

  setWebView (el) {
    this.webView = el
  }

  _backHandle = () => {
    if (this.state.backButtonEnabled) {
      this.webView.goBack()
    } else {
      this._close()
    }
    return true
  }

  _close = () => {
    this.props.navigation.goBack()
  }

  _load = () => {
    this.getToken().then(d => {
      this.sendMessage({
        type: 'aloestec/token',
        payload: {
          accessToken: d[0],
          refreshToken: d[1],
          type: d[2]
        }
      })
      this.sendMessage({
        type: 'aloestec/data',
        payload: this.state.dataNeedSend
      })
    })
  }

  sendMessage = (obj) => {
    this.webView.postMessage(JSON.stringify(obj))
  }

  getToken = () => {
    return Promise.all([
      AsyncStorage.getItem('token/accessToken'),
      AsyncStorage.getItem('token/refreshToken'),
      AsyncStorage.getItem('token/type')
    ])
  }

  onNavigationStateChange = navState => {
    this.setState({
      backButtonEnabled: navState.canGoBack,
      title: navState.title.slice(0,15)
    })
  }

  onLoadStart = () => {
    this.setState({
      progress: 0,
      showProgress: true
    })
    setTimeout(() => {
      this.setState({
        progress: 0.5
      })
    }, 100)
  }

  onLoadEnd = () => {
    this.setState({
      progress: 1
    })
  }

  webViewInit = () => {
    const {url} = this.props.navigation.state.params
    return `
      window.ALOESTEC_DATA_JSON = '${url}';
    `
  }

  onMessage = (e) => {
    const data = JSON.parse(e.nativeEvent.data)
    const {type, payload} = data
    if (type === 'web/aloestec/back') {
      if (payload.status === 'success') {
        Helper.message({
          icon: Icon.Success,
          content: '支付成功！',
          onOk: () => {
            this.props.navigation.goBack(null)
            Helper.eventManage.emit('app/orderInfo/reload')
          }
        })
      }
      if (payload.status === 'fail') {
        Helper.message({
          icon: Icon.Warning,
          content: '支付失败，请稍后重试'
        })
      }
      if (payload.pop) {
        this.props.navigation.pop(payload.pop)
      } else {
        this._close()
      }
    }
    if (type === 'web/aloestec/gxb/back') {
      Helper.eventManage.emit('aloestec/gxb/callback', payload)
      this._close()
    }
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({
        dataNeedSend: this.props.navigation.state.params.data,
        title: this.props.navigation.state.params.title
      })
    }, 0)
    BackHandler.addEventListener('hardwareBackPress', this._backHandle)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this._backHandle)
  }

  render () {
    const headerLeft = (
      <View style={styles.headerLeft}>
        <ATIconButton ghost style={{borderWidth: 0}} onPress={this._backHandle} icon={<Iconfont name='web-back' size={22} color='#333' />} />
        <ATIconButton ghost style={{borderWidth: 0}} onPress={this._close} icon={<Iconfont name='web-close' size={22} color='#333' />} />
      </View>
    )
    const {url} = this.props.navigation.state.params
    const progress = this.state.showProgress ? (<ProgressBar progress={this.state.progress} onClose={() => {
      this.setState({
        showProgress: false
      })
    }} />) : null

    console.log('this.state.title', this.state.title)
    return (
      <View style={GlobalStyle.screen}>
        <Header
          title={this.state.title}
          headerLeft={headerLeft}
        />
        {progress}
        <WebView
          ref={this.setWebViewFunc}
          source={{uri: url, headers: {'Cache-Control': 'no-cache'}}}
          onNavigationStateChange={this.onNavigationStateChange}
          onLoadStart={this.onLoadStart}
          onLoadEnd={this.onLoadEnd}
          onMessage={this.onMessage}
          injectedJavaScript={this.webViewInit()}
          onLoad={this._load} />
      </View>
    )
  }
}

// onError={e => {
//   const ev = e.nativeEvent
//   if (ev.url.indexOf('prod.gxb.io') > -1) {
//     ATModal.message({
//       icon: Icon.Error,
//       content: '未检测到支付宝，请确认您的手机上已安装并登录了支付宝',
//       contentAlign: 'left',
//       onOk: () => {
//         this.props.navigation.goBack(null)
//       }
//     })
//   }
// }}

class ProgressBar extends Component {
  state = {
    show: false
  }
  animate = (progress) => {
    let oldP = progress === 1 ? 0.5 : 0
    this.setState({
      show: true
    })
    this.bar.transition({
      width: Helper.appWidth * oldP
    }, {
      width: Helper.appWidth * progress
    }, 1000, 'ease')
    setTimeout(() => {
      if (progress === 1) {
        this.props.onClose()
      }
    }, 1000)
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.progress !== nextProps.progress) {
      this.animate(nextProps.progress)
    }
  }

  render () {
    return (
      <View style={[styles.progress, {opacity: this.state.show ? 1 : 0}]}>
        <Animatable.View ref={v => {this.bar = v}}>
          <View style={styles.progressBar} />
        </Animatable.View>
      </View>
    )
  }
}

const styles = {
  headerLeft: {
    flexDirection: 'row'
  },
  progress: {
    position: 'absolute',
    top: 60,
    height: 2,
    width: '100%',
    backgroundColor: '#fff',
    zIndex: 999
  },
  progressBar: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.primary
  }
}
