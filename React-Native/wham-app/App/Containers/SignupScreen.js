import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { ATButton, ATInput, ATText, ATCheckBox, ATModal } from 'aloestec-rn-components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { createForm } from 'rc-form'
import dismissKeyboard from 'react-native-dismiss-keyboard'
import { Images, Metrics } from '../Themes'
import Const from '../Lib/Const'
import Header from '../Components/Header'
import { fetchSmsCode, fetchSmsCodeCheck } from '../Services/UserApi'
import GlobalStyle from '../Themes/GlobalStyle'

class Input extends Component {
  render() {
    const { onChange, ...eProps } = this.props
    return (
      <ATInput
        label={null}
        onChangeText={onChange}
        placeholderTextColor="#999"
        shape="underline"
        style={{ paddingHorizontal: 0, marginTop: 10, height: 40 }}
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

  componentWillUnmount() {
    this.countdownTimer && clearInterval(this.countdownTimer)
  }

  countdown = () => {
    let seconds = 60;
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
    }, 1000);
  }

  reset = () => {
    clearInterval(this.countdownTimer)
    this.setState({
      smsCodeTitle: '获取验证码',
      buttonDisabled: false
    })
  }

  render() {
    const { style, onPress, ...eProps } = this.props
    const { smsCodeTitle, buttonDisabled } = this.state
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
export default class LoginScreen extends Component {
  state = {
    isAgreeContract: false
  }

  toggleChecked = (checked) => {
    this.setState({
      isAgreeContract: checked
    })
  }

  getAuthCode = () => {
    dismissKeyboard();
    this.props.form.validateFields((e, v) => {
      if (e && (e.username)) {
        ATModal.toast({
          content: e.username.errors[0].message
        })
      } else if (e && (e.phone)) {
        ATModal.toast({
          content: e.phone.errors[0].message
        })
      } else {
        fetchSmsCode({ phone: v.phone, username: v.username }).then(d => {
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
      console.log('submit', value)
      if (error) {
        for (let key in error) {
          ATModal.toast({
            content: error[key].errors[0].message
          })
          return
        }
      } else if (!this.state.isAgreeContract) {
        ATModal.toast({
          content: '请先勾选同意协议'
        })
      } else {
        let params = Object.assign({}, value)
        fetchSmsCodeCheck(params).then(data => {
          if (data !== 'fail') {
            this.goto('SetPassword', params)
          }
        })
      }
    })
  }

  goto = (path, params = {}) => {
    path && this.props.navigation.navigate(path, params)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { isAgreeContract } = this.state
    return (
      <View style={GlobalStyle.screen}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          enableOnAndroid={true}
          extraHeight={130}
          style={[GlobalStyle.container, { backgroundColor: 'transparent' }]}
        >
          <View style={{ paddingTop: 50, paddingHorizontal: 33, alignItems: 'center' }}>
            <Image
              resizeMode='contain'
              style={{ height: 120 }}
              source={Images.logo}
            />
            <View style={{ width: '100%', marginTop: 40 }}>
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: '请输入用户名' },
                  { pattern: Const.regExp.username, message: '用户名由1-20位中文字母数字组成' },
                ]
              })(
                <Input placeholder="用户名" />
              )}

              {getFieldDecorator('phone', {
                rules: [
                  { required: true, message: '请输入手机号' },
                  { pattern: Const.regExp.phone, message: '手机号格式不正确' }
                ],
              })(
                <Input keyboardType="numeric" placeholder="手机号" />
              )}

              {getFieldDecorator('smsCode', {
                rules: [{ required: true, message: '请输入验证码' }]
              })(
                <Input
                  keyboardType="numeric"
                  placeholder="验证码"
                  right={
                    <AuthCodeBtn
                      ref={v => this.authCodeBtn = v}
                      onPress={this.getAuthCode}
                    />
                  }
                />
              )}

              {getFieldDecorator('salesCode', {
                initialValue: '',
              })(
                <Input placeholder="推荐码，没有可不填" />
              )}

              <View style={{ marginVertical: 20 }}>
                <ATCheckBox
                  tintColor="#999"
                  checked={isAgreeContract}
                  onPress={this.toggleChecked}
                  rightTextView={
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 15 }}>
                      <ATText color="#999">同意</ATText>
                      <ATButton
                        text
                        title="《都快金服用户协议》"
                        onPress={() => this.goto('Web', {
                          url: Const.URL.signupAgreement
                        })}
                        style={{ paddingHorizontal: 0, paddingVertical: 0 }}
                      />
                    </View>
                  }
                />
              </View>

              <ATButton full onPress={this.submit} title='下一步' />

              <View style={styles.footer}>
                <ATText color="#999">已有账号，直接</ATText>
                <ATButton
                  text
                  title="登录"
                  onPress={() => this.props.navigation.goBack(null)}
                  style={{ paddingHorizontal: 0, paddingVertical: 0 }}
                />
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

const styles = {
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 38,
    marginBottom: 30,
  }
}
