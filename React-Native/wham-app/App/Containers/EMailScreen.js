import React, { Component } from 'react'
import { View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import dismissKeyboard from 'react-native-dismiss-keyboard'
import R from 'ramda'
import { ATInput, ATButton } from 'aloestec-rn-components'
import { GlobalStyle } from '../Themes'
import { Header } from '../Components'
import Helper from '../Lib/Helper'
import Const from '../Lib/Const'
import { fetchAuthData, fetchAuthEmailAdd } from '../Services/UserApi'

export default class EMailScreen extends Component {
  state = {
    email: ''
  }

  submit = () => {
    dismissKeyboard()
    const {email} = this.state
    const fEmail = R.trim(email)
    if (fEmail === '') {
      Helper.showToast('请输入邮箱')
    } else if (!R.test(Const.regExp.email, fEmail)) {
      Helper.showToast('邮箱格式不正确')
    } else {
      return fetchAuthEmailAdd({
        email: fEmail,
        authInfo: JSON.stringify({
          email: fEmail
        })
      }).then(d => {
        if (d !== 'fail') {
          this.props.navigation.goBack(null)
        }
      })
    }
  }

  getInfo = () => {
    return fetchAuthData({authId: Const.authIdMap.email}).then(d => {
      if (d !== 'fail' && d) {
        this.setState({email: d.commonData})
      }
    })
  }

  componentDidMount () {
    this.getInfo()
  }

  render () {
    const {email} = this.state
    return (
      <View style={GlobalStyle.screen}>
        <Header
          title='邮箱设置'
          headerRight={<ATButton title='完成' ghost style={{borderWidth: 0}} onPress={this.submit} />}
        />
        <KeyboardAwareScrollView alwaysBounceVertical={false}>
          <View style={{marginHorizontal: 20, marginTop: 20}}>
            <ATInput label={null} placeholder='请输入邮箱' value={email} onChangeText={v => {this.setState({email: v})}} />
          </View>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}
