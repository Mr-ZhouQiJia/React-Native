import React, { Component } from 'react'
import { View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import dismissKeyboard from 'react-native-dismiss-keyboard'
import R from 'ramda'
import { ATInput, ATButton, ATList, ATText } from 'aloestec-rn-components'
import { createForm } from 'rc-form'
import { GlobalStyle } from '../Themes'
import { Header } from '../Components'
import Helper from '../Lib/Helper'
import Const from '../Lib/Const'
import { fetchAuthData, fetchAuthBankCardAdd } from '../Services/UserApi'

class Input extends Component {
  render () {
    const {onChange, ...eProps} = this.props
    return (
      <ATInput
        label={null}
        onChangeText={onChange}
        placeholderTextColor="#999"
        shape="underline"
        style={{paddingHorizontal: 0}}
        {...eProps}
      />
    )
  }
}

@createForm()
export default class BankCardScreen extends Component {
  state = {
    info: {},
    userInfo: {}
  }

  submit = () => {
    dismissKeyboard()
    this.props.form.validateFields((error, value) => {
      if (error) {
        for (let key in error) {
          Helper.showToast(error[key].errors[0].message)
          return
        }
      } else {
        return fetchAuthBankCardAdd({
          bankCardNo: value.bankCardNo,
          authInfo: JSON.stringify(value)
        }).then(d => {
          if (d !== 'fail') {
            this.props.navigation.goBack(null)
          }
        })
      }
    })
  }

  getInfo = () => {
    return Promise.all([
      fetchAuthData({authId: Const.authIdMap.bankcard}).then(d => {
        if (d !== 'fail' && d) {
          this.setState({info: JSON.parse(d.authInfo)})
        }
      }),
      fetchAuthData({authId: Const.authIdMap.realname}).then(d => {
        if (d !== 'fail' && d) {
          this.setState({userInfo: JSON.parse(d.authInfo)})
        }
      })
    ])
  }

  componentDidMount () {
    this.getInfo()
  }

  render () {
    const {getFieldDecorator} = this.props.form
    const {info, userInfo} = this.state
    return (
      <View style={GlobalStyle.screen}>
        <Header
          title='银行卡'
          headerRight={<ATButton title='完成' ghost style={{borderWidth: 0}} onPress={this.submit} />}
        />
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps='handled'
          alwaysBounceVertical={false}
        >
          <ATList
            data={[
              {left: <ATText style={{width: 80}}>姓名</ATText>, content: userInfo.name},
              {left: <ATText style={{width: 80}}>{Const.idcardTypeMap[userInfo.type]}</ATText>, content: userInfo.idcard}
            ]}
            style={GlobalStyle.borderBottom}
          />
          <ATList
            style={[GlobalStyle.borderHorizontal, {marginTop: 10}]}
            data={[
              {
                left: <ATText style={{width: 80}}>银行卡号</ATText>,
                content: getFieldDecorator('bankCardNo', {
                  initialValue: info.bankCardNo || '',
                  rules: [{required: true, message: '请输入银行卡号'}]
                })(
                  <Input placeholder='请输入银行卡号' />
                )
              },
              {
                left: <ATText style={{width: 80}}>预留手机号</ATText>,
                content: getFieldDecorator('phone', {
                  initialValue: info.phone || '',
                  rules: [{required: true, message: '请输入银行卡预留手机号'}]
                })(
                  <Input placeholder='请输入预留手机号' />
                )
              }
            ]}
          />
          <ATText color='#999' style={{marginHorizontal: 20, marginTop: 20, lineHeight: 18}}>
            为保证账号资金安全，只能绑定认证用户本人的银行卡。
          </ATText>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}
