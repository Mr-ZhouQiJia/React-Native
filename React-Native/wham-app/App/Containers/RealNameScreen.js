import React, { Component } from 'react'
import { View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ATInput, ATButton, ATList, ATText, ATSelect, ATModal } from 'aloestec-rn-components'
import { createForm } from 'rc-form'
import dismissKeyboard from 'react-native-dismiss-keyboard'
import { GlobalStyle, Metrics, Colors } from '../Themes'
import { Header } from '../Components'
import Helper from '../Lib/Helper'
import { fetchAuthData, fetchAuthRealnameAdd } from '../Services/UserApi'
import Const from '../Lib/Const'

class Input extends Component {
  render () {
    const {onChange, ...eProps} = this.props
    return (
      <ATInput onChangeText={onChange} {...eProps} />
    )
  }
}

class RealNameScreen extends Component {
  state = {
    authInfo: {}
  }

  submit = () => {
    dismissKeyboard()
    this.props.form.validateFields((error, value) => {
      if (error) {
        console.log(error, value)
        for (let key in error) {
          ATModal.toast({
            content: error[key].errors[0].message
          })
          return
        }
      }
      return fetchAuthRealnameAdd({
        idcard: value.idcard,
        authInfo: JSON.stringify(value)
      }).then(d => {
        if (d !== 'fail') {
          this.props.navigation.goBack(null)
        }
      })
    })
  }

  cancel = () => {
    Helper.confirm({
      content: '确定要取消实名认证吗？',
      onOk: () => {
        this.props.navigation.goBack(null)
      }
    })
  }

  getInfo = () => {
    return fetchAuthData({authId: Const.authIdMap.realname}).then(d => {
      if (d !== 'fail' && d) {
        let authInfo = JSON.parse(d.authInfo)
        this.setState({authInfo})
      }
    })
  }

  componentDidMount () {
    this.getInfo()
  }

  render () {
    const {authInfo} = this.state
    const {getFieldDecorator} = this.props.form
    return (
      <View style={GlobalStyle.screen}>
        <Header title='实名认证' />
        <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' alwaysBounceVertical={false}>
          <ATList
            style={styles.list}
            contentStyle={{height: 50}}
            data={[
              {
                left: <Title value='证件类型' />,
                content: getFieldDecorator('type', {
                  initialValue: authInfo.type || '1',
                  rules: [{required: true, message: '请先选择证件类型'}]
                })(
                  <ATSelect style={{borderWidth: 0, paddingHorizontal: 0}} options={[
                    {label: '身份证', value: '1'},
                    {label: '户口本', value: '2'},
                    {label: '护照', value: '3'},
                    {label: '军官证', value: '4'}
                  ]} />
                )
              },
              {
                left: <Title value='姓名' />,
                content: getFieldDecorator('name', {
                  initialValue: authInfo.name || '',
                  rules: [{required: true, message: '请输入姓名'}]
                })(
                  <Input style={styles.input} label={null} placeholder='请输入姓名' />
                )
              },
              {
                left: <Title value='性别' />,
                content: getFieldDecorator('gender', {
                  initialValue: authInfo.gender || '0',
                  rules: [{required: true, message: '请先选择性别'}]
                })(
                  <ATSelect style={{borderWidth: 0, paddingHorizontal: 0}} options={[
                    {label: '男', value: '0'},
                    {label: '女', value: '1'}
                  ]} />
                )
              },
              {
                left: <Title value='证件号' />,
                content: getFieldDecorator('idcard', {
                  initialValue: authInfo.idcard || '',
                  rules: [{required: true, message: '请输入证件号'}]
                })(
                  <Input style={styles.input} label={null} placeholder='请输入证件号' />
                )
              }
            ]}
          />
          <ATText color='#999' style={{marginHorizontal: 20, marginTop: 20, lineHeight: 18}}>
            实名认证信息对真实和完整关系到您的账户安全，信息错误造成的损失，由用户本人承担。
          </ATText>
          <View style={{flexDirection: 'row', paddingHorizontal: 20, marginTop: 60}}>
            <ATButton style={{flex: 1, marginRight: 20}} title='取消' type='cancel' onPress={this.cancel} />
            <ATButton style={{flex: 1}} title='确认' onPress={this.submit} />
          </View>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

const Title = ({value}) => <ATText style={{width: 70}}>{value}</ATText>

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

export default createForm()(RealNameScreen)
