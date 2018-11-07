import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import Image from 'react-native-fast-image'
import { ATList, ATTouchable } from 'aloestec-rn-components'
import { Colors, GlobalStyle, Metrics, Images } from '../Themes'
import { Header, Iconfont } from '../Components'
import Helper from '../Lib/Helper'
import { fetchUserInfo } from '../Services/UserApi'
import UserActions from '../Redux/UserRedux'

@connect((state) => ({
  userData: state.user
}))
class MineScreen extends Component {
  componentDidMount () {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      // 首次进页面不会触发
      const {isLogin} = this.props.userData
      // ?? 每次都返回Home
      if (!isLogin) {
        this.props.navigation.goBack(null)
        this.props.navigation.navigate('Login', {backTo: 'Mine'})
      } else {
        setTimeout(() => {
          this.getUserInfo()
        }, 0)
      }
    })
  }

  componentWillUnmount () {
    this._navListener && this._navListener.remove()
  }

  goto = (route) => {
    this.props.navigation.navigate(route)
  }

  getUserInfo = () => {
    return fetchUserInfo().then(d => {
      if (d !== 'fail') {
        this.props.dispatch(UserActions.setUserInfo(d))
      }
    })
  }

  gotoAuthDetail = () => {
    const {userData: {userInfo}} = this.props
    if (userInfo.isRealname) {
      this.goto('AuthDetail')
    } else {
      Helper.message({
        content: '请先完成实名认证',
        onOk: () => {
          this.goto('RealName')
        }
      })
    }
  }

  render () {
    const {userData: {userInfo}} = this.props
    return (
      <View style={GlobalStyle.screen}>
        <Header title='我的' headerLeft={null} />
        <ScrollView alwaysBounceVertical={false}>
          <ATList
            contentStyle={{height: 60}}
            style={styles.list}
            data={[{
              left: <Iconfont name='mine' size={18} color={Colors.primary} />,
              content: userInfo.username || '未认证',
              showArrow: true,
              onPress: () => this.goto('MyInfo')
            }]} />
          <ATTouchable style={styles.banner} onPress={() => {
            this.props.navigation.navigate('Product')
          }}>
            <Image source={Images.myBanner} style={styles.myBanner} resizeMode='contain' />
          </ATTouchable>
          <ATList
            centerStyle={{paddingLeft: 10}}
            contentStyle={{height: 50}}
            style={[styles.list, styles.list2]}
            data={[
              {
                left: <Image source={Images.myAccount} />,
                content: '我的账户',
                showArrow: true,
                onPress: () => this.goto('MyAccount')
              },
              {
                left: <Image source={Images.myCard} />,
                content: '实名认证',
                showArrow: true,
                onPress: () => this.goto('RealName')
              },
              {
                left: <Image source={Images.myAuth} />,
                content: '详细认证',
                showArrow: true,
                onPress: this.gotoAuthDetail
              },
              {
                left: <Image source={Images.mySetting} />,
                content: '设置',
                showArrow: true,
                onPress: () => this.goto('Setting')
              },
              // {
              //   left: <Image source={Images.myService}/>,
              //   content: '联系客服',
              //   right: '0571-44441111',
              //   showArrow: true,
              //   onPress: Helper.call
              // },
            ]}
          />
        </ScrollView>
      </View>
    )
  }
}

const styles = {
  banner: {
    height: 100,
    paddingHorizontal: 20,
    marginVertical: 5
  },
  myBanner: {
    width: '100%',
    height: '100%'
  },
  list: {
    borderBottomWidth: Metrics.borderWidth,
    borderBottomColor: Colors.border.normal
  },
  list2: {
    borderTopWidth: Metrics.borderWidth,
    borderTopColor: Colors.border.normal
  }
}

export default MineScreen
