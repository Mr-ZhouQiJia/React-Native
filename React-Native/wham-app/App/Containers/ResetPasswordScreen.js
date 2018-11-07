import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { ATButton, ATInput, ATText, ATModal, ATIconButton } from 'aloestec-rn-components'
import { Header } from '../Components'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import dismissKeyboard from 'react-native-dismiss-keyboard'
import { createForm } from 'rc-form'
import Const from '../Lib/Const'
import { GlobalStyle } from '../Themes'
import { fetchResetSmscode, fetchResetPassword } from '../Services/UserApi'

class Input extends Component {
  render () {
    const {onChange, style, ...eProps} = this.props
    return (
      <ATInput
        label={null}
        onChangeText={onChange}
        placeholderTextColor="#999"
        shape="underline"
        style={{paddingHorizontal: 0, height: 50, paddingRight: 10, ...style}}
        {...eProps}
      />
    )
  }
}

class AuthCodeBtn extends Component {
  state = {
    time: 0,
    smsCodeTitle: '获取验证码',
    buttonDisabled: false,
  }

  componentWillUnmount () {
    this.countdownTimer && clearInterval(this.countdownTimer)
  }

  countdown = () => {
    let seconds = 60
    this.countdownTimer = setInterval(() => {
      if (seconds === 0) {
        this.setState({
          smsCodeTitle: '获取验证码',
          buttonDisabled: false
        })
        clearInterval(this.countdownTimer)
      } else {
        this.setState({
          smsCodeTitle: (seconds--) + '秒',
          buttonDisabled: true,
        })
      }
    }, 1000)
  }

  reset = () => {
    clearInterval(this.countdownTimer)
    this.setState({
      smsCodeTitle: '获取验证码',
      buttonDisabled: false
    })
  }

  render () {
    const {style, onPress, ...eProps} = this.props
    const {smsCodeTitle, buttonDisabled} = this.state
    return (
      <ATButton
        text
        title={smsCodeTitle}
        style={style}
        disabled={buttonDisabled}
        onPress={onPress}
        {...eProps}
      />
    )
  }
}

@createForm()
export default class ResetPasswordScreen extends Component {
  state = {
    isShowPassword: false,
  }

  getAuthCode = () => {
    dismissKeyboard()
    this.props.form.validateFields((e, v) => {
      if (e && e.phone) {
        ATModal.toast({
          content: e.phone.errors[0].message
        })
      } else {
        fetchResetSmscode({phone: v.phone}).then(d => {
          if (d !== 'fail') {
            ATModal.toast({
              content: '验证码已发送，请注意查收'
            })
            this.authCodeBtn.countdown()
          }
        })
      }
    })
  }

  submit = () => {
    dismissKeyboard()
    this.props.form.validateFields((error, value) => {
      if (error) {
        for (let key in error) {
          ATModal.toast({
            content: error[key].errors[0].message
          })
          return
        }
      } else {
        let params = Object.assign({}, value)
        fetchResetPassword(params).then(data => {
          if (data !== 'fail') {
            ATModal.toast({
              content: '重置成功'
            })
            this.props.navigation.goBack(null)
          }
        })
      }
    })
  }

  render () {
    const {getFieldDecorator} = this.props.form
    const {isShowPassword} = this.state

    return (
      <View style={GlobalStyle.screen}>
        <Header title="重置密码" />
        <KeyboardAwareScrollView
          alwaysBounceVertical={false}
          keyboardShouldPersistTaps='handled'
          style={[GlobalStyle.container, {backgroundColor: '#f8f8f8'}]}
        >
          <View style={[GlobalStyle.shadowBox, styles.formWrapper]}>
            {getFieldDecorator('phone', {
              rules: [
                {required: true, message: '请输入手机号'},
                {pattern: Const.regExp.phone, message: '手机号格式不正确'}
              ],
            })(
              <Input placeholder="手机号" />
            )}

            {getFieldDecorator('smsCode', {
              rules: [{required: true, message: '请输入验证码'}]
            })(
              <Input
                placeholder="验证码"
                right={
                  <AuthCodeBtn
                    ref={v => this.authCodeBtn = v}
                    onPress={this.getAuthCode}
                  />
                }
              />
            )}

            {getFieldDecorator('password', {
              rules: [
                {required: true, message: '请输入密码'},
                {pattern: Const.regExp.password, message: '密码由8-16字母和数字组成'}
              ]
            })(
              <Input
                placeholder="密码"
                secureTextEntry={!isShowPassword}
                right={
                  <ATIconButton
                    backgroundColor="transparent"
                    children={
                      <Icon
                        name={isShowPassword ? 'eye-outline' : 'eye-off-outline'}
                        color={isShowPassword ? '#666' : '#999'}
                        size={20}
                      />
                    }
                    updatePress
                    onPress={() => {
                      this.setState({
                        isShowPassword: !isShowPassword
                      })
                    }}
                  />
                }
                style={{borderBottomWidth: 0}}
              />
            )}
          </View>

          <ATButton long onPress={this.submit} title='完成' />
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  formWrapper: {
    backgroundColor: '#fff',
    marginTop: 24,
    marginBottom: 50,
    paddingLeft: 15,
  }
})
