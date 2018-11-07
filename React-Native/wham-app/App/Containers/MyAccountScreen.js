import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { ATTouchable, ATText, ATFlexLine, ATList } from 'aloestec-rn-components'
import { Colors, GlobalStyle, Metrics } from '../Themes'
import { Header, Iconfont } from '../Components'
import { fetchUserAccount } from '../Services/UserApi'
import Helper from '../Lib/Helper'

@connect((state) => ({
  userData: state.user
}))
class MyAccountScreen extends Component {
  state = {
    info: {
      productList: [],
      totalAsset: 0,
      totalProfit: 0,
      yesProfit: 0
    }
  }

  componentDidMount () {
    this.getInfo()
  }

  componentWillUnmount () {}

  getInfo = () => {
    return fetchUserAccount().then(d => {
      if (d !== 'fail' && d) {
        this.setState({info: d})
      }
    })
  }

  renderItem = item => <ATTouchable style={styles.card} onPress={() => {
    this.props.navigation.navigate('AccountPro', {
      id: item.productId
    })
  }}>
    <ATText size={18}>{item.productName}</ATText>
    <View style={styles.line}>
      <ATText size={16} color={'#666'}>{Helper.formatNumberToLocal(item.positionMoney)}</ATText>
      <ATText size={16} color={'#666'}>{Helper.formatNumberToLocal(item.totalProfit)}</ATText>
    </View>
    <View style={styles.line}>
      <ATText size={16} color={'#666'}>持仓金额(元)</ATText>
      <ATText size={16} color={'#666'}>累计收益(元)</ATText>
    </View>
  </ATTouchable>

  render () {
    const {info} = this.state
    return (
      <View style={GlobalStyle.screen}>
        <Header title='我的账户' />
        <ScrollView alwaysBounceVertical={false}>
          <View style={[GlobalStyle.flexBox, styles.top]}>
            <ATText color="#fff">总资产</ATText>
            <ATText color='#fff' size={20}
                    style={{marginTop: 10}}>{Helper.formatNumberToLocal(info.totalAsset)}</ATText>
          </View>
          <ATFlexLine
            height={80}
            style={styles.list}
            data={[
              {top: '昨日收益(元)', bottom: Helper.formatNumberToLocal(info.yesProfit)},
              {top: '累计收益(元)', bottom: Helper.formatNumberToLocal(info.totalProfit)}
            ]}
            renderItem={item => <View>
              <ATText size={16} color='#fff'>{item.top}</ATText>
              <ATText color='#fff' size={18} style={{marginTop: 10}}>{item.bottom}</ATText>
            </View>}
          />
          {info.productList.length === 0 ? (
            <ATText style={{textAlign: 'center', marginTop: 20}}>当前未购买任何产品</ATText>
          ) : (
            <ATList style={{backgroundColor: 'transparent'}} divide={false} data={info.productList}
                    renderItem={this.renderItem} />
          )}
        </ScrollView>
      </View>
    )
  }
}

const styles = {
  list: {
    borderBottomWidth: Metrics.borderWidth,
    borderBottomColor: Colors.border.normal,
    backgroundColor: Colors.primary,
  },
  top: {
    paddingVertical: 20,
    backgroundColor: Colors.primary,
  },
  line: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  card: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#fff',
    ...GlobalStyle.borderHorizontal
  }
}

export default MyAccountScreen
