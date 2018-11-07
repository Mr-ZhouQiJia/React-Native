import React, { Component } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { ATButton, ATText, ATHairLine, ATInput, ATList, ATModal } from 'aloestec-rn-components'
import { createForm } from "rc-form";
import { NavigationActions } from 'react-navigation'
import dismissKeyboard from 'react-native-dismiss-keyboard'
import { Header } from '../Components'
import { GlobalStyle } from '../Themes'
import { fetchProductDetail, fetchProductBuy } from '../Services/ProductApi'
import { fetchUserBankCard } from '../Services/UserApi'
import Helper from '../Lib/Helper'
class Input extends Component {
  render () {
    const {onChange, ...eProps} = this.props
    return (
      <ATInput
        onChangeText={onChange}
        placeholderTextColor="#999"
        style={{height: 40, borderWidth: 0}}
        {...eProps}
      />
    )
  }
}

@createForm()
export default class ProductBuy extends Component {
  state = {
    money: '',
    productDetail: {
      name: '',
      price: 0
    },
    bankcardInfo: {},
    salesCode: ''
  }

  componentDidMount () {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      this.init()
    })
  }

  componentWillUnmount () {
    this._navListener && this._navListener.remove()
  }

  init = () => {
    this.getProductDetail()
    this.getBankcardInfo()
  }

  getProductDetail = () => {
    const {productId} = this.props.navigation.state.params
    fetchProductDetail({productId}).then(data => {
      if (data !== 'fail') {
        data.productInfo = JSON.parse(data.productInfo)
        this.setState({
          productDetail: data
        })
      }
    })
  }

  getBankcardInfo = () => {
    fetchUserBankCard().then(data => {
      if (data !== 'fail') {
        this.setState({
          bankcardInfo: data
        })
      }
    })
  }

  buyProduct = () => {
    dismissKeyboard()
    const {productId} = this.props.navigation.state.params
    const {productDetail: {price}, money, salesCode} = this.state
    this.props.form.validateFields((error, value) => {
      if (error) {
        for (let key in error) {
          Helper.showToast(error[key].errors[0].message)
          return
        }
      } else {
        let params = Object.assign({}, value, {productId})
        fetchProductBuy(params).then(data => {
          if (data !== 'fail') {
            ATModal.message({
              content: '购买成功',
              onOk: () => {
               const actions = NavigationActions.reset({
                  index: 0,
                  actions: [
                    NavigationActions.navigate({
                      routeName: 'Root',
                      action: NavigationActions.navigate('Home')
                    })
                  ],
                })
                this.props.navigation.dispatch(actions)
              }
            })
          }
        })
      }
    })
  }

  render () {
    const {productDetail: {name, price}, money, bankcardInfo} = this.state
    const {getFieldDecorator, getFieldError, getFieldValue, } = this.props.form
    console.log('getFieldError', getFieldError('money'))
    const errorTip = getFieldError('money') && getFieldError('money')[0]
    return (
      <View style={GlobalStyle.screen}>
        <Header title="买入" />
        <View style={GlobalStyle.screen}>
          <ScrollView>
            <View style={styles.header}>
              <ATText size={16}>{name}</ATText>
            </View>
            <View style={styles.content}>
              <ATText style={styles.title}>买入金额</ATText>
              {getFieldDecorator('money', {
                rules: [
                  {required: true, message: '请输入买入金额'},
                  {validator:(rule, value, callback) => {
                    console.log('reg', !/^[0-9]+([.]{1}[0-9]+){0,1}$/.test(value))
                    if(value < price) {
                      callback(new Error(`最低买入${price}元`))
                    } else if(value > 100000000) {
                      callback(new Error('数额超限'))
                    } else if(!/^[0-9]+([.]{1}[0-9]+){0,1}$/.test(value)) {
                      callback(new Error('请输入数字'))
                    }else {
                      callback()
                    }
                  }}
                ]
              })(
                <Input
                  keyboardType="numeric"
                  label="¥"
                  labelStyle={{fontSize: 36, fontWeight: 'bold'}}
                  placeholder={`最低买入${price}元`}
                  textInputStyle={{fontSize: 18}}
                />
              )}
              <ATText style={styles.errorTip}>{errorTip}</ATText>
              <ATHairLine />
              <ATText style={styles.title}>推荐码</ATText>
              {getFieldDecorator('salesCode', {
                initialValue: '',
              })(
                <Input
                  label={null}
                  placeholder="填写与您联系的业务员的推荐码，没有可不填"
                  textInputStyle={{fontSize: 15}}
                />
              )}
            </View>
            <ATList
              data={[{
                content: '银行卡',
                right: this.state.bankcardInfo.isBankCard ? `尾号（${this.state.bankcardInfo.bankCardNo}）` : '去绑卡',
                showArrow: !bankcardInfo.isBankCard,
                onPress: () => {
                  !this.state.bankcardInfo.isBankCard && this.props.navigation.navigate('BankCard')
                }
              }]}
              style={GlobalStyle.shadowBox}
            />

            <ATButton
              long
              title="买入"
              onPress={this.buyProduct}
              style={{marginTop: 58, marginBottom: 25}}
              textStyle={{fontSize: 18}}
            />
            <ATText style={styles.tip}>立即购买您将自动享受金交所的会员权益</ATText>
          </ScrollView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingVertical: 28,
    ...GlobalStyle.shadowBox
  },
  content: {
    marginVertical: 10,
    paddingBottom: 20,
    backgroundColor: '#fff',
    ...GlobalStyle.shadowBox
  },
  title: {
    fontSize: 16,
    marginTop: 24,
    marginBottom: 15,
    marginLeft: 20,
  },
  errorTip: {
    marginLeft: 20,
    marginVertical: 5,
    fontSize: 12,
    fontWeight: '200',
    color: '#ff0000',
  },
  tip: {
    marginLeft: 20,
    fontSize: 12,
    fontWeight: '200',
    color: '#999',
  }
})
