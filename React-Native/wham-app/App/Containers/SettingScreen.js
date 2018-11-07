import React, { Component } from 'react'
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { ATButton, ATList, ATModal, ATText } from 'aloestec-rn-components'
import { Metrics, Colors } from '../Themes'
import Helper from '../Lib/Helper'
import UserAction from '../Redux/UserRedux'
import Header from '../Components/Header'
import Const from '../Lib/Const'
import { removeTokenStorage } from '../Services/fetch'
import GlobalStyle from '../Themes/GlobalStyle'

@connect((state) => ({
  userData: state.user
}))
class SettingScreen extends Component {
  state = {
    crashPressTime: 0
  }

  crashTimer = null

  logout = () => {
    ATModal.select({
      bottom: true,
      buttons: [
        {content: '取消', onPress: () => { }},
        {
          content: '退出登录',
          contentTextStyle: {color: '#999'},
          onPress: () => {
            removeTokenStorage().then(() => {
              AsyncStorage.setItem('userIsLogin', 'NO')
              this.props.dispatch(UserAction.sagaUserLogout())
              const navigateAction = NavigationActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({
                    routeName: 'Root',
                    action: NavigationActions.navigate({routeName: 'Home'})
                  })
                ]
              })
              this.props.navigation.dispatch(navigateAction)
            })
          }
        }
      ]
    })
  }

  modifyPassword = () => {
    this.props.navigation.navigate('ModifyPassword')
  }

  checkVersion = () => {
    Helper.eventManage.emit('app/checkVersion', true)
  }

  crashDebug = () => {
    clearTimeout(this.crashTimer)
    this.setState({
      crashPressTime: this.state.crashPressTime + 1
    })
    if (this.state.crashPressTime === 4) {
      this.setState({crashPressTime: 0})
      throw new Error('CRASH_DEBUG')
    } else {
      this.crashTimer = setTimeout(() => {
        this.setState({crashPressTime: 0})
      }, 2000)
    }
  }

  render () {
    return (
      <View style={GlobalStyle.screen}>
        <Header title='设置' />
        <View style={[GlobalStyle.container]}>
          <ATList
            style={{
              ...GlobalStyle.shadowBox
            }}
            contentStyle={{height: 50}}
            centerTextStyle={{fontSize: 15}}
            data={[
              {
                content: '修改密码',
                onPress: this.modifyPassword
              },
              {
                content: '检查更新',
                onPress: this.checkVersion
              },
              {
                content: '退出登录',
                onPress: this.logout
              }
            ]} />
        </View>
        <TouchableOpacity activeOpacity={1} onPress={this.crashDebug}>
          <ATText style={styles.version} color='#999'>{`当前版本：V${Helper.APP_VERSION}-${Const.BUNDLE_VERSION}`}</ATText>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = {
  logoutBtn: {
    width: '100%',
    height: 60,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#fff'
  },
  logoutText: {
    fontSize: 15,
    lineHeight: 15 * 1.4,
    fontWeight: 'bold',
    color: '#ccc'
  },
  version: {
    textAlign: 'center',
    marginBottom: 20
  }
}

export default SettingScreen
