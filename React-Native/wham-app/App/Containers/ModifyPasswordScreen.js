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
import { fetchModifyPassword } from '../Services/UserApi'

class Input extends Component {
  render() {
    const { onChange, style, ...eProps } = this.props
    return (
      <ATInput
        label={null}
        onChangeText={onChange}
        placeholderTextColor="#999"
        shape="underline"
        style={{ paddingHorizontal: 0, height: 50, paddingRight: 10, ...style }}
        {...eProps}
      />
    )
  }
}


@createForm()
export default class ResetPasswordScreen extends Component {
  state = {
    isShowOldPassword: false,
    isShowNewPassword: false,
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
        fetchModifyPassword(params).then(data => {
          if (data !== 'fail') {
            ATModal.toast({
              content: '修改成功'
            })
            this.props.navigation.goBack(null)
          }
        })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { isShowOldPassword, isShowNewPassword } = this.state

    return (
      <View style={GlobalStyle.screen}>
        <Header title="修改密码" />
        <KeyboardAwareScrollView
          alwaysBounceVertical={false}
          keyboardShouldPersistTaps='handled'
          style={[GlobalStyle.container, { backgroundColor: '#f8f8f8' }]}
        >
          <View style={[GlobalStyle.shadowBox, styles.formWrapper]}>
            {getFieldDecorator('oldPassword', {
              rules: [
                { required: true, message: '请输入旧密码' },
                { pattern: Const.regExp.password, message: '旧密码由8-16字母和数字组成' }
              ]
            })(
              <Input
                placeholder="旧密码"
                secureTextEntry={!isShowOldPassword}
                right={
                  <ATIconButton
                    backgroundColor="transparent"
                    children={
                      <Icon
                        name={isShowOldPassword ? 'eye-outline' : 'eye-off-outline'}
                        color={isShowOldPassword ? '#666' : '#999'}
                        size={20}
                      />
                    }
                    updatePress
                    onPress={() => {
                      this.setState({
                        isShowOldPassword: !isShowOldPassword
                      })
                    }}
                  />
                }
              />
            )}

          {getFieldDecorator('newPassword', {
            rules: [
              { required: true, message: '请输入新密码' },
              { pattern: Const.regExp.password, message: '新密码由8-16字母和数字组成' }
            ]
          })(
            <Input
              placeholder="新密码"
              secureTextEntry={!isShowNewPassword}
              right={
                <ATIconButton
                  backgroundColor="transparent"
                  children={
                    <Icon
                      name={isShowNewPassword ? 'eye-outline' : 'eye-off-outline'}
                      color={isShowNewPassword ? '#666' : '#999'}
                      size={20}
                    />
                  }
                  updatePress
                  onPress={() => {
                    this.setState({
                      isShowNewPassword: !isShowNewPassword
                    })
                  }}
                />
              }
              style={{ borderBottomWidth: 0 }}
            />
          )}
          </View>

        <ATButton long onPress={this.submit} title='完成' />
        </KeyboardAwareScrollView>
      </View >
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
