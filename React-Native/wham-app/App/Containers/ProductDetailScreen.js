import React, { Component } from 'react'
import { View, ScrollView, StyleSheet, Animated, Text } from "react-native"
import { connect } from 'react-redux'
import { ATButton, ATText, ATTouchable } from "aloestec-rn-components"
import { Footer, Header, WebChart } from "../Components"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { GlobalStyle, Colors } from '../Themes'
import moment from "moment"
import { fetchProductDetail, fetchProductCount } from "../Services/ProductApi"

// 返回前 num 天的日期
const formatDate = (num) => {
  return moment().subtract(num, 'days').format('YYYY-MM-DD')
}
const picker = [
  { label: '近1周', startTime: formatDate(7) },
  { label: '近1月', startTime: formatDate(30) },
  { label: '近3月', startTime: formatDate(30 * 3) },
  { label: '近6月', startTime: formatDate(30 * 6) },
  { label: '近1年', startTime: formatDate(365) },
]

class Line extends Component {
  state = {
    isExpand: false
  }

  render() {
    const { label, value, ...eProps } = this.props
    const { isExpand } = this.state
    const neexExpand = String(value).length >= 16
    return (
      <View {...eProps}>
        <View style={styles.infoRow}>
          <View style={{ width: 105, flexWrap: 'wrap' }}>
            <ATText size={15} weight="200">{label}</ATText>
          </View>
          {
            neexExpand
              ? <ATTouchable
                  onPress={() => {
                    this.setState({ isExpand: !isExpand })
                  }}
                > 
                  <View style={{flexDirection:'row'}}>
                    <ATText size={15}>{isExpand ? '收起' : '查看'}</ATText>
                    <Icon name={isExpand ? 'chevron-up' : 'chevron-down'} size={15}/>
                  </View>
                </ATTouchable>
              : <ATText size={15} weight="200">{value}</ATText>
          }
        </View>
        {isExpand && (
          <View style={{ paddingLeft: 15, paddingVertical: 5, backgroundColor: '#f1f1f1' }}>
            <ATText size={15} weight="200" lineHeight={1.5}>{value}</ATText>
          </View>
        )}
      </View>
    )
  }
}

@connect((state) => ({
  userData: state.user
}))
export default class ProductDetailScreen extends Component {
  state = {
    productDetail: {
      name: '',
      productInfo: []
    },
    productCount: null,
    activeStartTime: picker[0].startTime,
    activeDataIndex: 0,
    sliderAnim: new Animated.Value(-100)
  }

  opacity = this.state.sliderAnim.interpolate({
    inputRange: [-100, 0],
    outputRange: [0, 1]
  })

  top = this.state.sliderAnim.interpolate({
    inputRange: [-100, 0],
    outputRange: [-100, 0]
  })

  componentDidMount() {
    this.init()
  }

  init = () => {
    this.getProductDetail()
    this.getProductCount()
  }

  getProductDetail = () => {
    const { productId } = this.props.navigation.state.params
    fetchProductDetail({ productId }).then(data => {
      if (data !== 'fail') {
        data.productInfo = JSON.parse(data.productInfo)
        this.setState({
          productDetail: data
        })
      }
    })
  }

  getProductCount = (startTime) => {
    const { productId } = this.props.navigation.state.params
    startTime = startTime || this.state.activeStartTime

    fetchProductCount({ productId, startTime }).then(data => {
      if (data !== 'fail') {
        this.setState({
          productCount: data
        })
      }
    })
  }

  onToggleDate = (activeStartTime) => {
    this.setState({ activeStartTime })
    this.getProductCount(activeStartTime)
  }

  buyProduct = () => {
    const productId = this.state.productDetail.id
    if (this.props.userData.isLogin) {
      this.props.navigation.navigate('ProductBuy', { productId })
    } else {
      this.props.navigation.navigate('Login')
    }
  }

  alertMessage = (params) => {
    this.setState({
      activeDataIndex: params.payload.index
    })

    Animated.sequence([
      Animated.timing(this.state.sliderAnim, {
        toValue: 0,
        duration: 500,
      }),
      Animated.timing(this.state.sliderAnim, {
        delay: 2000,
        toValue: -100,
        duration: 500,
      }),
    ]).start()
  }

  renderDatePicker = () => {
    const { activeStartTime } = this.state
    return (
      <View style={{ height: 40 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}
        >
          {picker.map(item => {
            const isActive = activeStartTime === item.startTime
            return (
              <ATTouchable
                key={item.label}
                updatePress
                onPress={() => isActive ? '' : this.onToggleDate(item.startTime)}
                style={{ alignItems: 'center', flex: 1 }}
              >
                <View style={{}} key={item.label}>
                  <ATText
                    size={isActive ? 16 : 12}
                    weight={isActive ? '400' : '200'}
                    color={isActive ? Colors.primary : '#333'}
                  >{item.label}</ATText>
                </View>
              </ATTouchable>
            )
          })}

        </ScrollView>
      </View>
    )
  }

  renderChart = () => {
    const { productCount } = this.state
    const sourceData = productCount && productCount.map(item => ({
      countDate: moment(item.countDate).format('MM-DD'),
      value: item.value,
    }))
    const hasData = sourceData && sourceData.length > 0
    return (
      <View style={{ height: 200 }}>
        {hasData ? (
          <WebChart
            style={styles.chart}
            option={{
              dataset: {
                dimensions: ['countDate', 'value'],
                source: sourceData || [{ countDate: null, value: 0 }],
              },
              grid: {
                left: '0%',
                right: '5%',
                bottom: '0%',
                top: '10%',
                height: '85%',
                containLabel: true,
                z: 22,
              },
              xAxis: [{
                type: 'category',
                axisLabel: {
                  color: '#666'
                },
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                }
              }],
              yAxis: {
                type: 'value',
                axisLabel: {
                  formatter: '{value}%',
                  color: '#666'
                },
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                }
              },
              dataZoom: [{
                type: 'inside',
              },],
              series: [{
                type: 'line',
                zlevel: 11,
                symbolSize: 10,
              }],
            }}
            exScript={`
              chart.on('click', (params) => {
                if(params.componentType === 'series') {
                  window.postMessage(JSON.stringify({
                    type: 'select',
                    payload: {
                      index: params.dataIndex,
                      data: params.value
                    },
                  }));
                }
              });
            `}
            onMessage={this.alertMessage}
          />
        ) : (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <ATText>暂无数据</ATText>
            </View>
          )}
      </View>
    )
  }

  render() {
    const {
      productDetail: { name, productInfo },
      productCount = [],
      activeDataIndex
    } = this.state

    const activeData = productCount && productCount[activeDataIndex] || {}
    return (
      <View style={GlobalStyle.screen}>
        <Header title={name} />
        <View style={GlobalStyle.container}>
          <Animated.View style={[styles.slider, { top: this.top, opacity: this.opacity }]}>
            <ATText>{moment(activeData.countDate).format('YYYY-MM-DD')}</ATText>
            <ATText>涨幅：{activeData.value}%</ATText>
          </Animated.View>
          <ScrollView>
            <View style={styles.header}>
              <ATText size={16}>业绩走势</ATText>
              {this.renderDatePicker()}
              {this.renderChart()}
            </View>
            <View style={styles.infoWrap}>
              <ATText size={16} style={{ paddingLeft: 15, marginBottom: 20 }}>产品信息</ATText>
              {productInfo.map((item, index) => (
                <Line key={index} label={item.key} value={item.value}></Line>
              ))}
            </View>
          </ScrollView>
        </View>
        <Footer style={{ backgroundColor: '#fff' }}>
          <ATButton
            long
            title="买入"
            updatePress
            onPress={this.buyProduct}
          />
        </Footer>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  slider: {
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    width: '100%',
    paddingHorizontal: 10,
    zIndex: 99,
    backgroundColor: '#f3f8fc'
  },
  header: {
    paddingTop: 22,
    paddingLeft: 13,
    backgroundColor: '#fff',
  },
  chart: {
    height: 200,
  },
  infoWrap: {
    marginTop: 10,
    paddingVertical: 28,
    backgroundColor: '#fff',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    // height: 30,
    paddingHorizontal: 15,
    paddingVertical: 10
  },
})