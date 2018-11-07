import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { ATButton, ATInput, ATText, ATModal, ATIconButton } from 'aloestec-rn-components'
import { Header } from '../Components'
import { NavigationActions } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import dismissKeyboard from 'react-native-dismiss-keyboard'
import { createForm } from 'rc-form'
import { GlobalStyle } from '../Themes'
import { fetchSignup } from '../Services/UserApi'
import Const from '../Lib/Const'
import Helper from '../Lib/Helper'

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

@createForm()
export default class ResetPasswordScreen extends Component {
  state = {
    isShowPassword: false,
    isShowRepeatPassword: false,
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
      } else if (value.password !== value.repeatPassword) {
        ATModal.toast({
          content: '两次密码不一致'
        })
      } else {
        delete value.repeatPassword
        const preParams = this.props.navigation.state.params
        let params = Object.assign({}, preParams, value)
        fetchSignup(params).then(data => {
          if (data !== 'fail') {
            ATModal.toast({
              content: '注册成功'
            })
            this.props.navigation.dispatch(
              NavigationActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({
                    routeName: 'Login',
                    params: {backTo: 'Home'}
                  })
                ]
              })
            )
          }
        })
      }
    })
  }

  render () {
    const {getFieldDecorator} = this.props.form
    const {isShowPassword, isShowRepeatPassword} = this.state

    return (
      <View style={GlobalStyle.screen}>
        <Header title="设置密码" />
        <KeyboardAwareScrollView
          alwaysBounceVertical={false}
          keyboardShouldPersistTaps='handled'
          style={[GlobalStyle.container, {backgroundColor: '#f8f8f8'}]}
        >
          <View style={[GlobalStyle.shadowBox, styles.formWrapper]}>
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
              />
            )}

            {getFieldDecorator('repeatPassword', {
              rules: [{required: true, message: '请输入密码'}]
            })(
              <Input
                placeholder="重复密码"
                secureTextEntry={!isShowRepeatPassword}
                right={
                  <ATIconButton
                    backgroundColor="transparent"
                    children={
                      <Icon
                        name={isShowRepeatPassword ? 'eye-outline' : 'eye-off-outline'}
                        color={isShowRepeatPassword ? '#666' : '#999'}
                        size={20}
                      />
                    }
                    updatePress
                    onPress={() => {
                      this.setState({
                        isShowRepeatPassword: !isShowRepeatPassword
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
