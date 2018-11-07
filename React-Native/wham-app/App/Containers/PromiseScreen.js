import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ATModal, ATButton, ATTouchable } from 'aloestec-rn-components'
import ImagePicker from 'react-native-image-picker'
import { connect } from 'react-redux'
import { GlobalStyle, Images } from '../Themes'
import { Header, Icon, WebCos } from '../Components'
import Const from '../Lib/Const'
import { fetchAuthData, fetchAuthPromiseAdd, fetchCosObject } from '../Services/UserApi'
import Helper from '../Lib/Helper'

@connect((state) => ({
  userData: state.user
}))
export default class PromiseScreen extends Component {
  state = {
    source: Images.splash,
    uri: '',
    isChange: false
  }

  baseData = ''
  loading = null

  submit = () => {
    if (this.state.isChange) {
      const {userData: {userInfo}} = this.props
      const path = `${Const.ossPath}${userInfo.phone}_promise.json`
      this.loading = ATModal.loading({content: '上传中，请稍后'})
      this.cos.upload(path, this.baseData)
    }
  }

  getInfo = () => {
    let loading = ATModal.loading({content: '加载中...'})
    return fetchAuthData({authId: Const.authIdMap.promise}).then(d => {
      if (d !== 'fail' && d) {
        let authInfo = JSON.parse(d.authInfo)
        return fetchCosObject({
          ossKey: authInfo.ossKey
        }, true).then(dd => {
          if (dd !== 'fail') {
            this.setState({
              source: {uri: `data:image/png;base64,${dd.data}`}
            })
          }
          loading.close()
        })
      } else {
        loading.close()
      }
    })
  }

  select = () => {
    const options = {
      cameraType: 'back',
      quality: 0.68,
      maxHeight: 1280,
      noData: false,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }
    ATModal.select({
      bottom: true,
      buttons: [
        {
          content: '拍照',
          onPress: () => {
            ImagePicker.launchCamera(options, this.handleImagePicker)
          }
        },
        {
          content: '从相册中选择照片',
          onPress: () => {
            ImagePicker.launchImageLibrary(options, this.handleImagePicker)
          }
        }
      ]
    })
  }

  handleImagePicker = (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker')
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error)
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton)
    } else {
      let source = {uri: response.uri}
      this.setState({
        source,
        isChange: true,
        uri: response.uri
      })
      this.baseData = response.data
    }
  }

  onMessage = (data) => {
    this.loading.close()
    if (data.data === 'success') {
      const {userData: {userInfo}} = this.props
      const ossPath = `${Const.ossPath}${userInfo.phone}_promise.json`
      fetchAuthPromiseAdd({
        authInfo: JSON.stringify({
          ossKey: ossPath
        })
      }).then(d => {
        if (d !== 'fail') {
          Helper.message({
            content: '上传成功',
            icon: Icon.Success,
            onOk: () => this.props.navigation.goBack(null)
          })
        }
      })
    }
  }

  componentDidMount () {
    this.getInfo()
  }

  render () {
    return (
      <View style={GlobalStyle.screen}>
        <Header title='金融资产承诺函' />
        <KeyboardAwareScrollView alwaysBounceVertical={false}>
          <ATTouchable onPress={this.select} style={{margin: 20, backgroundColor: '#fff'}}>
            <Image source={this.state.source} style={{height: 300, width: '100%'}} resizeMode='contain' />
          </ATTouchable>
          <ATButton long ghost title={'选择图片'} onPress={this.select} />
          <ATButton long disabled={!this.state.isChange} style={{marginTop: 20}} title={'确认'} onPress={this.submit} />
          <WebCos onMessage={this.onMessage} ref={cos => {this.cos = cos}} style={{width: '100%', height: 5}} />
        </KeyboardAwareScrollView>
      </View>
    )
  }
}
