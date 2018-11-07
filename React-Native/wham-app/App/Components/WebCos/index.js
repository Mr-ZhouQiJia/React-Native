/* eslint-disable */
import React from 'react'
import {
  View,
  WebView,
  Platform,
} from 'react-native'
import { fetchCosToken } from '../../Services/UserApi'

import html from './index.html';

const os = Platform.OS

/**
 * props:
 *
 * option(Object): Param of chart.setOption(),
 *                 the setOption will auto execute when option is changed.
 * exScript(String): Any JavaScript that will execute when WebView is loaded.
 * oMessage(Function): The handler for the WebView's postMessage.
 *                     You will have to set postMessage in the exScript first.
 */
export default class WebCos extends React.Component {
  static defaultProps = {
    option: {},
    exScript: '',
    onMessage: () => {},
  }

  upload = (path, data) => {
    fetchCosToken().then(d => {
      if (d !== 'fail') {
        this.webView.postMessage(JSON.stringify({
          TmpSecretId: d.TmpSecretId,
          TmpSecretKey: d.TmpSecretKey,
          XCosSecurityToken: d.XCosSecurityToken,
          ExpiredTime: d.ExpiredTime,
          Bucket: d.Bucket,
          Region: d.Region,
          path,
          data
        }))
      }
    })
  }

  render () {
    return (
      <View style={this.props.style}>
        <WebView
          ref={(elem) => { this.webView = elem }}
          style={{backgroundColor: 'rgba(0, 0, 0, 0)'}}
          scrollEnabled={false}
          scalesPageToFit={os !== 'ios'}
          source={os === 'ios' ? html : {uri: 'file:///android_asset/web/WebCos/index.html'}}
          injectedJavaScript={`
            ${this.props.exScript}
          `}
          onMessage={(e) => { this.props.onMessage(JSON.parse(e.nativeEvent.data)) }}
        />
      </View>
    )
  }
}
