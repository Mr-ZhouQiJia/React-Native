import React, { Component, Fragment } from 'react'
import { View, ScrollView, StyleSheet, Image } from 'react-native'
import { ATButton, ATText, ATList, ATHairLine, ATTouchable } from "aloestec-rn-components"
import { RetryBox } from '../Components'
import Swiper from 'aloestec-rn-swiper'
import PropTypes from 'prop-types'
import { GlobalStyle, Colors } from '../Themes'
import { fetchBannerList, fetchProductList } from "../Services/HomeApi"

export default class HomeScreen extends Component {
  state = {
    bannerList: [],
    recommendProduct: {
      yearRate: '**%',
      price: '**',
      period: '**'
    },
    hotProductList: [],
    tryAgain: false
  }

  componentDidMount() {
    this.init()
    setTimeout(() => {
      this._navListener = this.props.navigation.addListener('didFocus', this.init)
    }, 200);
  }

  componentWillUnmount() {
    this._navListener && this._navListener.remove()
  }

  init = () => {
    this.getBannerList()
    this.getProductList()
  }

  getBannerList = () => {
    fetchBannerList().then(data => {
      if (data !== 'fail') {
        let bannerList = data.map(item => ({
          source: { uri: item.pictureUrl },
          type: item.type,
          targetUrl: item.targetUrl
        }))
        this.setState({ bannerList })
      }
    })
  }

  getProductList = () => {
    fetchProductList().then(data => {
      if (data !== 'fail') {
        const recommendProduct = data[0] || {}
        data.shift()
        this.setState({
          recommendProduct,
          hotProductList: data,
          tryAgain: false
        })
      } else {
        this.setState({
          tryAgain: true
        })
      }
    })
  }

  gotoProductDetail = (id) => {
    this.props.navigation.navigate('ProductDetail', { productId: id })
  }

  handleClickBanner = (banner) => {
    switch (banner.type) {
      case 1:
        this.gotoWebView(banner.targetUrl)
        break
      case 2:
        this.props.navigation.navigate(banner.targetUrl)
        break
      default:
        break
    }
  }

  clickBannerDisabled = banner => {
    return [1, 2].indexOf(banner.type) === -1
  }

  gotoWebView = (url) => {
    this.props.navigation.navigate('Web', {url})
  }  

  renderProduct = (product, index) => {
    const hasDivide = index !== (this.state.hotProductList.length - 1)
    return (
      <Fragment>
        <ATTouchable onPress={() => this.gotoProductDetail(product.id)}>
          <View style={{ paddingLeft: 15 }}>
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
      </Fragment>
    )
  }

  render() {
    const {
      bannerList,
      recommendProduct,
      hotProductList,
      tryAgain
    } = this.state

    return (
      <View style={GlobalStyle.screen}>
        { tryAgain ? <RetryBox onPress={this.init} /> : ( 
          <ScrollView>
            <View style={{ paddingVertical: 20 }}>
                {bannerList && bannerList.length > 0
                  ? (
                    <Swiper style={styles.swiperWrapper} autoplay autoplayTimeout={6} paginationStyle={{ bottom: 0 }}
                      removeClippedSubviews={false}
                      activeDotColor="#fff"
                      dotStyle={{ borderWidth: 1, borderColor: '#fff', backgroundColor: 'transparent' }}>

                      {
                        bannerList.map((banner, index) => (
                          <SwiperSlide
                            key={index}
                            source={banner.source}
                            disabled={this.clickBannerDisabled(banner)}
                            onPress={() => { this.handleClickBanner(banner) }}
                          />
                        ))
                      }
                    </Swiper>
                  )
                  : <View style={styles.swiperWrapper}><View style={styles.swiperDefault} /></View>
                }

                <View style={styles.headerWrap}>
                  <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                    <View style={styles.headerTitle}>
                      <ATText size={18} weight="bold">推荐产品</ATText>
                    </View>
                    <ATText 
                      size={12} 
                      color="#666" 
                      style={{ marginLeft: 8 }}
                    >{recommendProduct.name}</ATText>
                  </View>
                  <View style={{ alignItems: 'center', marginTop: 25 }}>
                    <ATText size={12}>预计年化收益</ATText>
                    <ATText style={styles.yearRate}>{recommendProduct.yearRate}</ATText>
                    <ATText size={12}>
                      <ATText size={12} color="#ffc601">{recommendProduct.price}</ATText>
                      <ATText size={12}>元起购  |  期限</ATText>
                      <ATText size={12} color="#ffc601">{recommendProduct.period}</ATText>
                    </ATText>
                    <ATButton
                      title="立即投资"
                      textStyle={{ fontSize: 18 }}
                      style={styles.investBtn}
                      updatePress
                      disabled={!recommendProduct.id}
                      onPress={() => this.gotoProductDetail(recommendProduct.id)}
                    />
                  </View>
                </View>

                <View style={styles.productListWrap}>
                  <View style={styles.headerTitle}>
                    <ATText size={18} weight="bold">热门产品</ATText>
                  </View>
                  <ATList
                    data={hotProductList}
                    renderItem={this.renderProduct}
                    divide={false}
                    style={{ paddingVertical: 20 }}
                  />
                </View>
              </View>
          </ScrollView>
        )}
      </View>
    )
  }
}

class SwiperSlide extends Component {
  static propTypes = {
    source: PropTypes.any,
    onPress: PropTypes.func
  }

  constructor (props) {
    super()
    const {source, onPress, disabled} = props
    this.state = {
      source,
      onPress: onPress ? onPress : () => {},
      disabled: disabled
    }
  }

  render () {
    const {source, onPress, disabled} = this.state
    return (
      <ATTouchable style={styles.swiperSlide} onPress={onPress} disabled={disabled}>
        <Image
          resizeMode='stretch'
          style={styles.swiperImage}
          source={source}
        />
      </ATTouchable>
    )
  }
}

const styles = StyleSheet.create({
  swiperWrapper: {
    height: 180
  },
  swiperDefault: {
    flex: 1,
    backgroundColor: '#eee',
    // borderRadius: 10,
    // marginHorizontal: 20
  },
  swiperSlide: {
    flex: 1,
    backgroundColor: 'transparent',
    // marginHorizontal: 20,
    // borderRadius: 10,
    overflow: 'hidden',
  },
  swiperImage: {
    width: '100%',
    height: '100%',
  },
  headerWrap: {
    paddingTop: 15,
    paddingBottom: 30,
    backgroundColor: '#fff'
  },
  yearRate: {
    marginTop: 10,
    marginBottom: 15,
    fontSize: 36,
    color: Colors.primary
  },
  investBtn: {
    width: 290,
    height: 49,
    borderRadius: 0,
    marginTop: 28,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 18,
    paddingVertical: 1,
    paddingLeft: 6,
    marginLeft: 20,
    borderLeftWidth: 3,
    borderColor: Colors.primary,
  },
  productListWrap: {
    marginVertical: 10,
    paddingTop: 15,
    backgroundColor: '#fff'
  },
  productItemWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingLeft: 10,
    marginTop: 13
  },
  divider: {
    marginTop: 16,
    marginBottom: 21,
    marginLeft: 30
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
