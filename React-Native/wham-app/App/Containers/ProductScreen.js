import React, { Component } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { ATText, ATList, ATHairLine, ATTouchable, ATFormItem, ATSelect } from 'aloestec-rn-components'
import { createForm } from 'rc-form'
import { Header, RetryBox } from '../Components'
import { GlobalStyle, Colors } from '../Themes'
import { fetchProductList } from '../Services/ProductApi'

@createForm()
export default class ProductScreen extends Component {
  state = {
    productList: [],
    tryAgain: false
  }

  componentDidMount() {
    this.getProductList()
  }

  getProductList = () => {
    const parmas = this.props.form.getFieldsValue()
    fetchProductList(parmas).then(data => {
      if (data !== 'fail') {
        this.setState({
          productList: data,
          tryAgain: false
        })
      } else {
        this.setState({
          tryAgain: true
        })
      }
    })
  }

  onChange = () => {
    setTimeout(this.getProductList, 200)
  }

  gotoProductDetail = (id) => {
    this.props.navigation.navigate('ProductDetail', { productId: id })
  }

  renderProduct = (product, index) => {
    const hasDivide = index !== (this.state.productList.length - 1)
    return (
      <View style={styles.listItem}>
        <ATTouchable onPress={() => this.gotoProductDetail(product.id)}>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {
                product.logo
                  ? <Image source={{ uri: product.logo }} style={styles.logo} />
                  : <View style={styles.logo}></View>
              }
              <ATText size={15}>{product.name}</ATText>
            </View>
            <View style={styles.productItemWrap}>
              <View style={{ flex: 1 }}>
                <ATText size={30} color={Colors.primary}>{product.yearRate}</ATText>
                <ATText style={styles.tip}>预计年化收益</ATText>
              </View>
              <View style={{ flex: 1 }}>
                <ATText size={15}>期限：{product.period}</ATText>
                <ATText style={styles.tip}>{product.price}元起购</ATText>
              </View>
            </View>
          </View>
        </ATTouchable>
        {hasDivide && <ATHairLine style={styles.divider} />}
      </View>
    )
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { productList, tryAgain } = this.state

    return (
      <View style={GlobalStyle.screen}>
        <Header title="产品" headerLeft={null} />
        <View style={styles.header}>
          <ATFormItem label="类型" {...formItemProps}>
            {getFieldDecorator('searchWhere1', {
              initialValue: '0',
            })(
              <ATSelect
                numberOfLines={1}
                options={[
                  { label: '全部', value: '0' },
                  { label: '网络理财', value: '10' },
                  { label: '公募基金', value: '20' },
                  { label: '众筹', value: '30' },
                  { label: '私募', value: '40' },
                ]}
                onChange={this.onChange}
                style={styles.selector}
                textStyle={styles.selectorText}
              />
            )}
          </ATFormItem>
          <ATFormItem label="合作机构" {...formItemProps}>
            {getFieldDecorator('searchWhere2', {
              initialValue: '0',
            })(
              <ATSelect
                numberOfLines={1}
                options={[
                  { label: '全部', value: '0' },
                  { label: '银行', value: '10' },
                  { label: '非银金融', value: '20' },
                  { label: '交易场所', value: '30' },
                  { label: '其他合作机构', value: '40' },
                ]}
                onChange={this.onChange}
                style={styles.selector}
                textStyle={styles.selectorText}
              />
            )}
          </ATFormItem>
          <ATFormItem label="收益类型" {...formItemProps}>
            {getFieldDecorator('searchWhere3', {
              initialValue: '0',
            })(
              <ATSelect
                numberOfLines={1}
                options={[
                  { label: '全部', value: '0' },
                  { label: '保守型', value: '10' },
                  { label: '稳健型', value: '20' },
                  { label: '进取型', value: '30' },
                ]}
                onChange={this.onChange}
                style={styles.selector}
                textStyle={styles.selectorText}
              />
            )}
          </ATFormItem>
          <ATFormItem label="投资期限" {...formItemProps}>
            {getFieldDecorator('searchWhere4', {
              initialValue: '0',
            })(
              <ATSelect
                numberOfLines={1}
                options={[
                  { label: '全部', value: '0' },
                  { label: '短期(6个月以下)', value: '10' },
                  { label: '中短期(6-12个月以下)', value: '20' },
                  { label: '中期(12-36个月以下)', value: '30' },
                  { label: '中长期(36个月以上)', value: '40' },
                ]}
                onChange={this.onChange}
                style={styles.selector}
                textStyle={styles.selectorText}
              />
            )}
          </ATFormItem>
        </View>
        <View style={GlobalStyle.container}>
          {tryAgain ? (
            <RetryBox onPress={this.getProductList} />
          ) : (
              <ATList
                flat
                refreshControl={null}
                data={productList}
                renderItem={this.renderProduct}
                noMore={true}
                divide={false}
                style={{ paddingTop: 10 }}
              />
            )}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    height: 75,
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#fff',
  },
  formItem: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 0,
  },
  selector: {
    height: 25,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  selectorText: {
    marginRight: 2
  },
  listItem: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingLeft: 15,
  },
  productItemWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingLeft: 10,
    marginTop: 13
  },
  divider: {
    marginTop: 16,
    // marginBottom: 10,
    marginLeft: 15
  },
  logo: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#f8f8f8',
    marginRight: 9
  },
  tip: {
    fontSize: 12,
    color: '#666',
    marginTop: 12
  }
})

const formItemProps = {
  labelStyle: { marginRight: 0, alignItems: 'center', justifyContent: 'center', marginBottom: 5 },
  labelTextStyle: { marginRight: 0, textAlign: 'center' },
  style: styles.formItem
}
