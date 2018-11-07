import React, { Component } from 'react'
import { View, Image, Platform, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import UserActions from '../Redux/UserRedux'
import { ATButton, ATInput, ATText, ATIconButton } from 'aloestec-rn-components'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { createForm } from 'rc-form'
import dismissKeyboard from 'react-native-dismiss-keyboard'
import { Images, Metrics } from '../Themes'
import Const from '../Lib/Const'
import Helper from '../Lib/Helper'
import Header from '../Components/Header'
import { fetchLogin, fetchUserInfo } from '../Services/UserApi'
import GlobalStyle from '../Themes/GlobalStyle'
import { NavigationActions } from 'react-navigation'

class Input extends Component {
  render () {
    const {onChange, ...eProps} = this.props
    return (
      <ATInput
        label={null}
        onChangeText={onChange}
        placeholderTextColor="#999"
        shape="underline"
        style={{paddingHorizontal: 0, marginTop: 10, height: 40}}
        {...eProps}
      />
    )
  }
}

@connect((state) => ({
  userData: state.user
}))
@createForm()
export default class LoginScreen extends Component {
  state = {
    isShowPassword: false
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
        let params = Object.assign({}, value, {source: Platform.OS})
        fetchLogin(params).then(data => {
          if (data !== 'fail') {
            const backTo = this.props.navigation.state.params ? this.props.navigation.state.params.backTo : null
            this.props.dispatch(UserActions.setUserLogin(true))
            AsyncStorage.setItem('userIsLogin', 'YES')
            this.getUserInfo()
            if (backTo) {
              const navigateAction = NavigationActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({
                    routeName: 'Root',
                    action: NavigationActions.navigate({routeName: backTo})
                  })
                ]
              })
              this.props.navigation.dispatch(navigateAction)
            } else {
              this.props.navigation.goBack(null)
            }
          }
        })
      }
    })
  }

  getUserInfo = () => {
    return fetchUserInfo().then(d => {
      if (d !== 'fail') {
        this.props.dispatch(UserActions.setUserInfo(d))
      }
    })
  }

  goto = (path) => {
    path && this.props.navigation.navigate(path)
  }

  replace = (path) => {
    path && this.props.navigation.replace(path)
  }

  render () {
    const {getFieldDecorator} = this.props.form
    const {isShowPassword} = this.state
    return (
      <View style={GlobalStyle.screen}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          enableOnAndroid={true}
          extraHeight={130}
          style={[GlobalStyle.container, {backgroundColor: 'transparent'}]}
        >
          <View style={{paddingTop: 50, paddingHorizontal: 33, alignItems: 'center'}}>
            <Image
              resizeMode='contain'
              style={{height: 120}}
              source={Images.logo}
            />
            <View style={{width: '100%', marginTop: 40}}>
              {getFieldDecorator('username', {
                rules: [{required: true, message: '请输入用户名/手机号'}]
              })(
                <Input placeholder="用户名/手机号" />
              )}
              {getFieldDecorator('password', {
                rules: [{required: true, message: '请输入密码'}]
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
              <View style={{marginVertical: 18, alignItems: 'flex-end'}}>
                <ATButton text title="忘记密码?" onPress={() => this.goto('ResetPassword')} />
              </View>

              <ATButton full onPress={this.submit} title='登录' />

              <View style={styles.footer}>
                <ATText color="#999">没有账号，先</ATText>
                <ATButton
                  text
                  title="注册"
                  onPress={() => this.goto('Signup')}
                  // onPress={() => this.goto('SetPassword')}
                  style={{paddingHorizontal: 0, paddingVertical: 0}}
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
  }
}
