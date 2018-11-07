import React from 'react'
import { Dimensions, Platform } from 'react-native'
import { NavigationActions } from 'react-navigation'
import isNumber from 'is-number'
import formatNumber from 'format-number'
import Permissions from 'react-native-permissions'
import DeviceInfo from 'react-native-device-info'
import { ATModal } from 'aloestec-rn-components'
import jsonFormat from 'json-format'
import Communications from 'react-native-communications'
import Iconfont from '../Components/Iconfont'
import { Colors } from '../Themes'
import Const from './Const'

const {height: APP_HEIGHT, width: APP_WIDTH} = Dimensions.get('window')

const APP_INFO_USER_AGENT = DeviceInfo.getUserAgent()
const APP_INFO_UNIQUE_ID = DeviceInfo.getUniqueID()
const APP_VERSION = DeviceInfo.getVersion()
const APP_BUNDLE_ID = DeviceInfo.getBundleId()
const APP_DIST = DeviceInfo.getBuildNumber()

export default class Helper {
  static appHeight = APP_HEIGHT
  static appWidth = APP_WIDTH
  static CODE_PUSH_STATUS = 0
  static APP_HEIGHT = APP_HEIGHT
  static APP_WIDTH = APP_WIDTH
  static APP_VERSION = APP_VERSION
  static APP_BUNDLE_ID = APP_BUNDLE_ID
  static APP_USER_AGENT = APP_INFO_USER_AGENT
  static APP_UNIQUE_ID = APP_INFO_UNIQUE_ID
  static APP_DIST = APP_DIST
  static APP_PLATFORM = Platform.OS === 'android' ? 'android' : 'ios'
  static IS_ANDROID = Platform.OS === 'android'

  static eventManage = {
    handles: {},
    on (eName, fn) {
      this.handles[eName] = this.handles[eName] ? this.handles[eName] : []
      this.handles[eName].push(fn)
    },
    emit (eName, data = {}) {
      if (this.handles[eName]) {
        for (var i = 0; i < this.handles[eName].length; i++) {
          this.handles[eName][i](data)
        }
      }
    },
    off: function (eventType, handler = null) {
      if (handler === null) {
        delete this.handles[eventType]
        return
      }
      let currentEvent = this.handles[eventType]
      let len = 0
      if (currentEvent) {
        len = currentEvent.length
        for (let i = len - 1; i >= 0; i--) {
          if (currentEvent[i] === handler) {
            currentEvent.splice(i, 1)
          }
        }
      }
    }
  }

  static showToast = (msg, options = {}) => {
    ATModal.toast({
      content: msg,
      duration: 2500
    })
  }

  static sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  static formatNumberToLocal (num) {
    if (num || num === 0) {
      num = num.toString().replace(/,/g, '')
      if (isNumber(num)) {
        num = Number(num).toFixed(2)
        const format = formatNumber()
        return format(num)
      } else {
        return '0.00'
      }
    } else {
      return ''
    }
  }

  static makeApi (api, data) {
    let re = api
    data.forEach(v => {
      re += `/${v}`
    })
    return re
  }

  static routerManage = {
    resetRouteTo (route, params) {
      const {dispatch} = this.props.navigation
      if (dispatch) {
        dispatch(
          NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: route, params: params})],
          })
        )
      }
    },
    resetActiveRouteTo (actionsArray, activeIndex) {
      const {dispatch} = this.props.navigation
      console.log('resetActiveRouteTo', dispatch)
      if (dispatch) {
        // const actionsArray = [];
        // for (let i = 0; i < routeArray.length; i++) {
        //   actionsArray.push(NavigationActions.navigate({ routeName: routeArray[i] }));
        // }

        const resetAction = NavigationActions.reset({
          index: activeIndex,
          actions: actionsArray,
        })
        dispatch(resetAction)
      }
    },
    backTo (key) {
      const {dispatch} = this.props.navigation
      if (dispatch) {
        dispatch(
          NavigationActions.reset({
            key: key
          })
        )
      }
    },
    setParamsWrapper (params, key) {
      const {dispatch} = this.props.navigation
      if (dispatch) {
        const setParamsAction = NavigationActions.setParams({
          params: params,
          key: key,
        })
        dispatch(setParamsAction)
      }
    }
  }

  static checkPermission = (type, onSuccess = () => {}, onError = () => {}, restrictedMsg = '您已拒绝应用访问权限') => {
    Permissions.check(type).then(permission => {
      console.log(permission)
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      if (permission === 'authorized') {
        onSuccess()
      } else if (permission === 'restricted' || permission === 'denied') {
        Helper.showToast(restrictedMsg)
      } else {
        Permissions.request(type, {type: 'always'}).then(response => {
          if (response === 'authorized') {
            onSuccess()
          } else {
            ATModal.message({
              content: '您已拒绝应用访问权限',
              icon: 'danger',
              onOk: () => {
                onError()
              }
            })
          }
        })
      }
    })
  }

  static debugMessage = (obj) => {
    ATModal.message({
      width: 300,
      contentMaxHeight: 300,
      contentAlign: 'left',
      content: jsonFormat(obj)
    })
  }

  static confirm = ({
                      onOk = () => {},
                      onCancle = () => {},
                      icon,
                      content
                    }) => {
    ATModal.confirm({
      content: content,
      icon: icon,
      buttons: [
        {
          title: '取消',
          type: 'cancel',
          onPress: onCancle
        }, {
          title: '确定',
          type: 'cancel',
          onPress: onOk
        }
      ]
    })
  }

  static message = ({
                      onOk = () => {},
                      icon,
                      content,
                      contentAlign
                    }) => {
    ATModal.confirm({
      content: content,
      icon: icon,
      contentAlign: contentAlign || 'center',
      buttons: [{
        title: '我知道了',
        type: 'cancel',
        onPress: onOk
      }]
    })
  }

  static call = () => {
    let k = Math.round(Math.random())
    let phoneNum = Const.helperPhone[k]
    Helper.confirm({
      content: `客服工作时间：9:00-22:00`,
      icon: <Iconfont name='phone-call' size={30} color={Colors.primary} />,
      onOk: () => {
        Communications.phonecall(phoneNum, false)
      }
    })
  }

  static checkFormError = () => {

  }
}
