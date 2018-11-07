import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { ATList } from 'aloestec-rn-components'
import { Colors, GlobalStyle, Metrics } from '../Themes'
import { Header, Iconfont } from '../Components'
import { fetchAuthEmailAddr } from '../Services/UserApi'

@connect((state) => ({
  userData: state.user
}))
class MyInfoScreen extends Component {
  state = {
    info: {}
  }

  componentDidMount () {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      this.getInfo()
    })
  }

  componentWillUnmount () {
    this._navListener && this._navListener.remove()
  }

  getInfo = () => {
    return fetchAuthEmailAddr().then(d => {
      if (d !== 'fail') {
        this.setState({info: d})
      }
    })
  }

  formatPhone = (phone) => {
    if (phone) {
      let re = phone.substr(0, 3)
      let re2 = phone.substr(phone.length - 4, phone.length)
      return re + '****' + re2
    } else {
      return ''
    }
  }

  render () {
    const {userData: {userInfo}} = this.props
    const {info} = this.state
    return (
      <View style={GlobalStyle.screen}>
        <Header title='个人信息' />
        <ScrollView alwaysBounceVertical={false}>
          <ATList
            contentStyle={{height: 50}}
            style={[styles.list]}
            data={[{
              content: '用户名',
              right: userInfo.username
            }, {
              content: '手机号',
              right: this.formatPhone(userInfo.phone)
            }, {
              content: '邮箱',
              right: info.isEmail ? '去修改' : '去设置',
              showArrow: true,
              onPress: () => {
                this.props.navigation.navigate('EMail')
              }
            }, {
              content: '地址',
              right: info.isAddress ? '去修改' : '去设置',
              showArrow: true,
              onPress: () => {
                this.props.navigation.navigate('Address')
              }
            }]} />
        </ScrollView>
      </View>
    )
  }
}

const styles = {
  list: {
    borderBottomWidth: Metrics.borderWidth,
    borderBottomColor: Colors.border.normal
  }
}

export default MyInfoScreen
