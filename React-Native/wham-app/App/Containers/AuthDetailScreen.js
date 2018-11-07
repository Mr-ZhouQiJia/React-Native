import React, { Component } from 'react'
import { View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ATList, ATText } from 'aloestec-rn-components'
import { GlobalStyle, Metrics, Colors } from '../Themes'
import { Header } from '../Components'
import { fetchAuthData, fetchAuthDetail } from '../Services/UserApi'

export default class AuthDetailScreen extends Component {
  state = {
    info: {}
  }

  goto = (route) => {
    this.props.navigation.navigate(route)
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
    return fetchAuthDetail().then(d => {
      if (d !== 'fail') {
        this.setState({info: d})
      }
    })
  }

  render () {
    const {info} = this.state
    return (
      <View style={GlobalStyle.screen}>
        <Header title='详细认证' />
        <KeyboardAwareScrollView alwaysBounceVertical={false}>
          <ATList
            style={styles.list}
            contentStyle={{height: 50}}
            data={[
              {
                content: '银行卡',
                right: info.isBankCard ? '去修改' : '去添加',
                showArrow: true,
                onPress: () => this.goto('BankCard')
              },
              {
                content: '金融资产承诺书',
                right: info.isPromise ? '去修改' : '去上传',
                showArrow: true,
                onPress: () => this.goto('Promise')
              },
              {
                content: '工作职业属性',
                right: info.isOccupation ? '去修改' : '去添加',
                showArrow: true,
                onPress: () => this.goto('Profession')
              },
              {
                content: '学历(学位)',
                right: info.isEducation ? '去修改' : '去添加',
                showArrow: true,
                onPress: () => this.goto('Education')
              }
            ]}
          />
          <ATText color='#999' style={{marginHorizontal: 20, marginTop: 20, lineHeight: 18}}>
            认证信息对真实和完整关系到您的账户安全，信息错误造成的损失，由用户本人承担。
          </ATText>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

const styles = {
  input: {
    paddingHorizontal: 0,
    borderWidth: 0
  },
  list: {
    borderBottomWidth: Metrics.borderWidth,
    borderBottomColor: Colors.border.normal
  }
}
