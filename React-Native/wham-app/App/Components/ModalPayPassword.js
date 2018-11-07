import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, ActivityIndicator } from 'react-native'
import { isIphoneX } from 'react-native-iphone-x-helper'
import { ATIconButton, ATTouchable, ATModalBox } from 'aloestec-rn-components'
import Iconfont from './Iconfont'
import { Metrics, Colors, GlobalStyle } from '../Themes'

class ModalPayPassword extends Component {
  static defaultProps = {
    state: '',
    stateTitle: '请稍等片刻',
    title: '请输入支付密码',
    errorTip: '',
    onComplete: () => {},
    onHide: () => {},
    onForgetPassword: () => {}
  }

  static propTypes = {
    state: PropTypes.string.isRequired,
    onComplete: PropTypes.func.isRequired,
    onHide: PropTypes.func,
    onForgetPassword: PropTypes.func,
    stateTitle: PropTypes.string,
    title: PropTypes.string,
    errorTip: PropTypes.string,
  }

  state = {
    visible: false,
    backdropHide: false,
    backButtonHide: true,
    value: '',
  }

  numConfig = [
    {name: '1', value: '1'},
    {name: '2', value: '2'},
    {name: '3', value: '3'},
    {name: '4', value: '4'},
    {name: '5', value: '5'},
    {name: '6', value: '6'},
    {name: '7', value: '7'},
    {name: '8', value: '8'},
    {name: '9', value: '9'},
    {name: '', value: null},
    {name: '0', value: '0'},
    {name: 'x', value: 'del', icon: <Iconfont name='delete' size={24} color='#777' />},
  ]

  hide = () => {
    this.props.onClose()
  }

  onPress = (v) => {
    const {value} = this.state
    let re = ''
    if (v !== 'del') {
      if (value.length === 6) {
        return
      }
      re = `${value}${v}`
    } else {
      re = value.length > 0 ? value.substring(0, value.length - 1) : ''
    }
    this.setState({
      value: re
    })
    if (re.length === 6) {
      this.onComplete(re)
    }
  }

  onComplete = (value) => {
    this.props.onComplete(value)
  }

  backButton = () => {
    const {state} = this.props
    if (state !== 'loading') {
      this.hide()
    }
  }

  reset = () => {
    this.setState({
      value: ''
    })
  }

  render () {
    const {value} = this.state
    const {state, stateTitle, title, errorTip, onForgetPassword} = this.props
    const length = value.length || 0
    const inputCom = []
    const numCom = []
    let resultCom = null
    if (state === 'loading') {
      resultCom = <ActivityIndicator size='large' color={Colors.primary} />
    } else if (state === 'success') {
      resultCom = <Iconfont name='tip-success' size={60} color={Colors.font.success} />
    } else if (state === 'fail') {
      resultCom = <Iconfont name='tip-error' size={60} color={Colors.font.danger} />
    }
    for (let i = 0; i < 6; i++) {
      const v = i < length ? <Iconfont name='asterisk' size={18} /> : null
      inputCom.push(
        <View style={styles.inputNumBox} key={i}>
          {v}
        </View>
      )
    }
    this.numConfig.forEach(v => {
      const isBlack = v.value === 'del' || v.value === null
      numCom.push(
        <ATTouchable
          throttle={false}
          underlayColor={Colors.underlayColor.dark}
          disabled={v.value === null}
          key={v.value}
          style={[styles.number, isBlack ? styles.numberBlack : {}]}
          onPress={() => {
            this.onPress(v.value)
          }}
        >
          <Text style={styles.numberText}>{v.icon ? v.icon : v.name}</Text>
        </ATTouchable>
      )
    })
    let resultBox = state ? <View style={styles.resultBox}>
      {resultCom}
      <Text style={styles.resultTitle}>{stateTitle}</Text>
    </View> : null
    return (
      <View style={styles.box}>
        <View style={styles.header}>
          <View style={styles.backBtn}>
            <ATIconButton
              ghost
              style={{
                height: 44,
                width: 44,
                borderWidth: 0
              }}
              icon={
                <Iconfont name='left' size={20} color='#333' />
              }
              onPress={this.backButton}
            />
          </View>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
        <View style={styles.inputBox}>
          {inputCom}
        </View>
        <View style={styles.tipBox}>
          <Text style={{color: '#ff6372'}}>{errorTip}</Text>
          <ATTouchable
            onPress={onForgetPassword}
          >
            <Text style={{color: '#327ffb'}}>忘记密码？</Text>
          </ATTouchable>
        </View>
        <View style={styles.numberBox}>
          {numCom}
        </View>
        {resultBox}
      </View>
    )
  }
}

export default class PayPassword extends Component {
  static propTypes ={
    state: PropTypes.string.isRequired,
    onComplete: PropTypes.func.isRequired,
    onHide: PropTypes.func,
    onForgetPassword: PropTypes.func,
    stateTitle: PropTypes.string,
    title: PropTypes.string,
    errorTip: PropTypes.string
  }

  close = () => {
    this.props.onHide && this.props.onHide()
    this.modal.modalClose()
  }

  open = () => {
    this.modal.open()
  }

  reset = () => {
    this.password.reset()
  }

  render () {
    const {...eProps} = this.props
    return (
      <ATModalBox
        style={{}}
        animation
        coverScreen={true}
        backButtonClose
        animationDuration={200}
        position='bottom'
        autoOpen={false}
        onClose={this.close}
        ref={v => this.modal = v}
        render={() => <ModalPayPassword ref={v => this.password = v} onClose={this.close} {...eProps} />}
      />
    )
  }
}

const styles = {
  header: {
    position: 'relative',
    height: 44,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: Metrics.borderWidth,
    borderBottomColor: Colors.border.light,
  },
  headerTitle: {
    fontSize: 18
  },
  backBtn: {
    position: 'absolute',
    left: 0,
    top: 0
  },
  box: {
    backgroundColor: '#fafafa',
    paddingVertical: 0,
    width: '100%',
    paddingBottom: isIphoneX() ? 20 : 0,
    position: 'relative'
  },
  resultBox: {
    position: 'absolute',
    top: 44,
    bottom: 0,
    width: '100%',
    backgroundColor: '#fafafa',
    ...GlobalStyle.flexBox
  },
  resultTitle: {
    fontSize: 18,
    marginTop: 20
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  inputNum: {
    fontSize: 30
  },
  inputNumBox: {
    flex: 1,
    height: 50,
    borderWidth: Metrics.borderWidth,
    borderColor: Colors.border.light,
    ...GlobalStyle.flexBox
  },
  inputBox: {
    flexDirection: 'row',
    margin: Metrics.doubleBaseMargin,
    borderWidth: Metrics.borderWidth,
    borderColor: Colors.border.normal,
    borderRadius: Metrics.borderRadius,
    overflow: 'hidden'
  },
  tipBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: Metrics.doubleBaseMargin,
    marginTop: 0
  },
  numberBox: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  number: {
    width: '33.33%',
    height: 60,
    borderWidth: Metrics.borderWidth,
    borderColor: Colors.border.light,
    ...GlobalStyle.flexBox
  },
  numberText: {
    fontSize: 30
  },
  numberBlack: {
    backgroundColor: '#f3f3f3'
  }
}
