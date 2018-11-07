import React, { Component } from 'react'
import { View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { GlobalStyle } from '../Themes'
import { ATButton, ATSelect } from 'aloestec-rn-components'
import { Header } from '../Components'
import Helper from '../Lib/Helper'
import { fetchAuthData, fetchAuthEdAdd } from '../Services/UserApi'
import Const from '../Lib/Const'

export default class EducationScreen extends Component {
  state = {
    education: ''
  }

  submit = () => {
    const {education} = this.state
    if (education === '') {
      Helper.showToast('请选择学历')
      return
    }
    return fetchAuthEdAdd({
      authInfo: JSON.stringify({
        education
      })
    }).then(d => {
      if (d !== 'fail') {
        this.props.navigation.goBack(null)
      }
    })
  }

  getInfo = () => {
    return fetchAuthData({authId: Const.authIdMap.education}).then(d => {
      if (d !== 'fail' && d) {
        let authInfo = JSON.parse(d.authInfo)
        this.setState({
          education: authInfo.education
        })
      }
    })
  }

  componentDidMount () {
    this.getInfo()
  }

  render () {
    return (
      <View style={GlobalStyle.screen}>
        <Header
          title='学历(学位)'
          headerRight={<ATButton title='完成' ghost style={{borderWidth: 0}} onPress={this.submit} />}
        />
        <KeyboardAwareScrollView alwaysBounceVertical={false}>
          <View style={{marginHorizontal: 20, marginTop: 20}}>
            <ATSelect
              value={this.state.education}
              options={[
                {label: '高中及以下', value: '高中及以下'},
                {label: '大专', value: '大专'},
                {label: '本科', value: '本科'},
                {label: '研究生', value: '研究生'},
                {label: '博士', value: '博士'}
              ]}
              onChange={(v) => {
                this.setState({education: v})
              }}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}
