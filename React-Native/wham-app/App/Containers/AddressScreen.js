import React, { Component } from 'react'
import { View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ATInput, ATAddrSelector, ATButton } from 'aloestec-rn-components'
import dismissKeyboard from 'react-native-dismiss-keyboard'
import { GlobalStyle, Metrics, Colors } from '../Themes'
import { Header, Iconfont } from '../Components'
import Helper from '../Lib/Helper'
import R from 'ramda'
import { fetchAuthAddressAdd, fetchAuthData } from '../Services/UserApi'
import Const from '../Lib/Const'

export default class AddressScreen extends Component {
  state = {
    city: '',
    address: ''
  }

  showAddrSelector = () => {
    this.addrSelector.show()
  }

  handleFinish = (city) => {
    this.setState({city})
  }

  submit = () => {
    dismissKeyboard()
    let {city, address} = this.state
    address = R.trim(address)
    if (city === '') {
      Helper.showToast('请选择省市区')
      return
    }
    if (address === '') {
      Helper.showToast('请输入详细地址')
      return
    }
    return fetchAuthAddressAdd({
      authInfo: JSON.stringify({
        city,
        address
      })
    }).then(d => {
      if (d !== 'fail') {
        this.props.navigation.goBack(null)
      }
    })
  }

  getInfo = () => {
    return fetchAuthData({authId: Const.authIdMap.address}).then(d => {
      if (d !== 'fail' && d) {
        let authInfo = JSON.parse(d.authInfo)
        this.setState({
          city: authInfo.city,
          address: authInfo.address
        })
      }
    })
  }

  componentDidMount () {
    this.getInfo()
  }

  render () {
    const {city, address} = this.state
    return (
      <View style={GlobalStyle.screen}>
        <Header
          title='地址设置'
          headerRight={<ATButton title='完成' ghost style={{borderWidth: 0}} onPress={this.submit} />}
        />
        <KeyboardAwareScrollView alwaysBounceVertical={false}>
          <View style={{marginHorizontal: 20, marginTop: 20}}>
            <ATInput
              ref={v => {this.input = v}}
              alwaysChange
              value={city}
              editable={false}
              label='省市区'
              placeholder='请选择地址'
              right={(
                <Iconfont name='right' color='#999' size={20} />
              )}
              onPress={this.showAddrSelector}
            />
            <ATAddrSelector
              ref={v => {this.addrSelector = v}}
              city={city}
              onSelectAddress={this.handleSelectAddress}
              onFinish={this.handleFinish}
              // style={{backgroundColor: "#fff"}}
            />
            <ATInput
              style={{
                height: 170,
                marginTop: 20
              }}
              textInputStyle={{
                height: 140,
                textAlignVertical: 'top'
              }}
              multiline
              label={null}
              placeholder='请输入详细地址'
              value={address}
              onChangeText={v => {this.setState({address: v})}}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}
