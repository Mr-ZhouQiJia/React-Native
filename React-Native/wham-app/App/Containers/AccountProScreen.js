import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { ATTabs, ATText, ATFlexLine, ATList, ATButton } from 'aloestec-rn-components'
import { Colors, GlobalStyle, Metrics } from '../Themes'
import { Header } from '../Components'
import { fetchUserProDetail } from '../Services/UserApi'
import Helper from '../Lib/Helper'
import Const from '../Lib/Const'

const Progressbar = (props) => {
  // progress [0, 1]
  const {progress, money, date, style} = props
  return (
    <View style={[{width: '100%', height: 22, backgroundColor: '#f8f9f8'}, style]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: `${progress * 100}%`,
          height: '100%',
          paddingHorizontal: 10,
          backgroundColor: money > 0 ? '#fe3443' : '#009a1d',
        }}>
        <ATText color="#fff">{date}</ATText>
        <ATText color="#fff">{money}</ATText>
      </View>
    </View>
  )
}

@connect((state) => ({
  userData: state.user
}))
class AccountProScreen extends Component {
  state = {
    info: {
      orderLogList: [],
      prodfitDetailList: [],
      totalAsset: 0,
      totalProfit: 0,
      yesProfit: 0
    },
    moneyArr: []
  }

  componentDidMount () {
    this.getInfo()
  }

  componentWillUnmount () { }

  getInfo = () => {
    const {id} = this.props.navigation.state.params
    return fetchUserProDetail({
      productId: id
    }).then(d => {
      if (d !== 'fail' && d) {
        this.setState({
          info: d,
          moneyArr: d.prodfitDetailList.map(item => item.money)
        })
      }
    })
  }

  renderItem = item => <View style={styles.card}>
    <View style={styles.line}>
      <ATText size={16} color={'#666'}>{item.type === 10 ? '买入' : '卖出'}</ATText>
      <ATText size={16} color={'#666'}>{Helper.formatNumberToLocal(item.money)}元</ATText>
    </View>
    <View style={[styles.line, {marginTop: 10}]}>
      <ATText size={16} color={'#666'}>{item.transactionTime}</ATText>
      <ATText size={16} color={item.status === 10 ? '#e4482b' : '#666'}>{Const.orderStatusZhMap[item.status]}</ATText>
    </View>
  </View>

  renderDetailItem = (item) => {
    const {profitTime, money} = item
    const max = Math.max(...this.state.moneyArr)
    const maxProgress = 0.95
    const zeroProgress = 0.35
    let progress = 0

    if (money === 0) {
      progress = zeroProgress
    } else if (Math.abs(money) === max) {
      progress = maxProgress
    } else {
      progress = Math.abs(money) * (maxProgress - zeroProgress) / max + zeroProgress
    }
    return (
      <Progressbar
        progress={progress}
        date={profitTime}
        money={money}
        style={{marginTop: 18}}
      />
    )
  }

  render () {
    const {info} = this.state
    return (
      <View style={GlobalStyle.screen}>
        <Header
          title={info.productName}
          headerRight={<ATButton title='产品详情' ghost style={{borderWidth: 0}} onPress={() => {
            this.props.navigation.navigate('ProductDetail', {
              productId: this.props.navigation.state.params.id
            })
          }} />}
        />
        <View style={{flex: 1}}>
          <ScrollView contentContainerStyle={{minHeight: '100%'}}>
            <View style={[GlobalStyle.flexBox, styles.top]}>
              <ATText>持仓金额(元)</ATText>
              <ATText color='#333' size={20}
                      style={{marginTop: 10}}>{Helper.formatNumberToLocal(info.totalProfit)}</ATText>
            </View>
            <ATFlexLine
              height={80}
              style={styles.list}
              data={[
                {top: '昨日收益(元)', bottom: Helper.formatNumberToLocal(info.yesProfit)},
                {top: '持有收益(元)', bottom: Helper.formatNumberToLocal(info.positionMoney)},
                {top: '昨日收益率', bottom: `${info.profitRate}%`}
              ]}
              renderItem={item => <View>
                <ATText size={16}>{item.top}</ATText>
                <ATText color='#666' size={18} style={{marginTop: 10}}>{item.bottom}</ATText>
              </View>}
            />
            <View style={[{backgroundColor: '#fff', marginTop: 10, paddingTop: 10, flex: 1}, styles.topBorder]}>
              <ATTabs
                tabBarUnderlineStyle={{backgroundColor: 'transparent'}}
                tabBarStyle={{marginHorizontal: 40, borderWidth: 1, borderColor: '#e4482b'}}
                tabBarActiveTextColor={'#fff'}
                tabBarInactiveTextColor={'#e4482b'}
                tabBarActiveTabStyle={{backgroundColor: '#e4482b'}}
              >
                <View tabLabel='收益明细' key='tab_profit'>
                  {
                    info.prodfitDetailList.length === 0 ? (
                      <ATText style={styles.defaultLine}>暂无记录</ATText>
                    ) : (
                      <ATList
                        style={{backgroundColor: 'transparent', marginTop: 10}}
                        divide={false}
                        data={info.prodfitDetailList}
                        renderItem={this.renderDetailItem}
                      />
                    )
                  }
                </View>
                <View tabLabel='交易记录' key='tab_record'>
                  <ATList
                    style={{backgroundColor: 'transparent', marginTop: 10}}
                    divide={false}
                    data={info.orderLogList}
                    renderItem={this.renderItem}
                  />
                </View>
              </ATTabs>
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}

const styles = {
  list: {
    borderBottomWidth: Metrics.borderWidth,
    borderBottomColor: Colors.border.normal
  },
  topBorder: {
    borderTopWidth: Metrics.borderWidth,
    borderTopColor: Colors.border.normal
  },
  top: {
    paddingVertical: 20,
    backgroundColor: '#fff'
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  card: {
    padding: 15,
    backgroundColor: '#fff',
    ...GlobalStyle.borderBottom
  },
  defaultLine: {
    textAlign: 'center',
    marginVertical: 50
  }
}

export default AccountProScreen
