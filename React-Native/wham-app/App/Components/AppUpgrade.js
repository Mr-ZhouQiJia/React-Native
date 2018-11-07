import React, { Component } from 'react'
import { View, NativeModules, StyleSheet, Image, DeviceEventEmitter } from 'react-native'
import { ATModalBox, ATModal, ATText } from 'aloestec-rn-components'
import Helper from '../Lib/Helper'
import { Images } from '../Themes'
import throttle from 'lodash.throttle'
import ProgressBar from '../Components/ProgressBar'
import { fetchVersionAndroid, fetchVersionIOS } from '../Services/UserApi'
import Const from '../Lib/Const'

export default class AppUpgrade extends Component {
  state = {
    progress: 0
  }
  needUpdate = (vNew, vLocal) => {
    //去掉收尾空格
    let v1 = vNew.replace(/(^\s+)|(\s+$)/gi, '')
    let v2 = vLocal.replace(/(^\s+)|(\s+$)/gi, '')
    //空检查
    if (!v1 || !v2) {
      return
    }
    //截取v1,v2中的版本数字
    v1 = /\d(\.|\d)*\d/gi.exec(v1)[0]
    v2 = /\d(\.|\d)*\d/gi.exec(v2)[0]
    //版本比较，我们分为三个数组然后比较
    let arr1 = v1.split('.')
    let arr2 = v2.split('.')
    arr1 = arr1.map(v => parseInt(v))
    arr2 = arr2.map(v => parseInt(v))
    if (arr1[0] > arr2[0]) {
      return true
    } else if (arr1[0] === arr2[0]) {
      if (arr1[1] > arr2[1]) {
        return true
      } else if (arr1[1] === arr2[1]) {
        if (arr1[2] > arr2[2]) {
          return true
        } else if (arr1[2] === arr2[2]) {
          return false
        }
      }
    }
    return false
  }
  checkVersion = (alert = true, loading = false) => {
    let version = Helper.APP_VERSION
    if (!Helper.IS_ANDROID) {
      fetchVersionIOS({}, loading).then(d => {
        if (d !== 'fail') {
          if (d && this.needUpdate(d.versionNo, version)) {
            ATModal.confirm({
              content: '发现新版本！是否前往App Store更新？',
              onOk: () => {
                NativeModules.upgrade.openAPPStore(Const.APP_STORE_ID)
              }
            })
          } else {
            if (alert) {
              ATModal.message({
                content: '当前已经是最新版本'
              })
            }
          }
        }
      })
    } else {
      fetchVersionAndroid({}, loading).then(d => {
        if (d !== 'fail') {
          if (d && this.needUpdate(d.versionNo, version)) {
            ATModal.confirm({
              content: '发现新版本！是否立即下载？',
              onOk: () => {
                this.open()
                NativeModules.upgrade.upgrade(d.versionUrl)
              }
            })
          } else {
            if (alert) {
              ATModal.message({
                content: '当前已经是最新版本'
              })
            }
          }
        }
      })
    }
  }
  close = () => {
    this.props.onHide && this.props.onHide()
    this.modal.modalClose()
  }
  open = () => {
    this.modal.open()
  }

  loadProgress = throttle((progress) => {
    this.setState({
      progress: progress / 100
    })
    if(progress === 100){
      this.close()
    }
  }, 500, {
    'leading': true,
    'trailing': true
  })

  componentDidMount () {
    this.listen = DeviceEventEmitter.addListener('LOAD_PROGRESS', this.loadProgress)
  }

  componentWillUnmount () {
    this.listen.remove()
  }

  render () {
    return <ATModalBox
      style={{}}
      animation
      backdropOpacity={0.6}
      coverScreen={true}
      backdropPressToClose={false}
      backButtonClose={false}
      animationDuration={0}
      position='center'
      autoOpen={false}
      swipeToClose={false}
      onClose={this.close}
      ref={v => this.modal = v}
      render={() => <View style={styles.box}>
        <View style={styles.logoBox}>
          <View style={styles.logo}>
            <Image source={Images.download} style={styles.logoImg} />
          </View>
        </View>
        <View style={styles.content}>
          <View style={{flex: 1}}>
            <ATText>正在努力下载中...</ATText>
            <ProgressBar
              style={{marginTop: 10, width: 200}}
              progress={this.state.progress}
            />
          </View>
        </View>
      </View>
      }
    />
  }
}

const styles = StyleSheet.create({
  content: {
    height: 100,
    width: 240,
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingHorizontal: 20,
    borderRadius: 6
  },
  logoBox: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: 30,
    zIndex: 99
  },
  logoImg: {
    height: 40,
    width: 40
  },
  logo: {
    height: 60,
    width: 60,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
})
