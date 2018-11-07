import React, { Component } from 'react'
import { BackHandler } from 'react-native'
import { addNavigationHelpers } from 'react-navigation'
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'
import { ATModal } from 'aloestec-rn-components'
import AppNavigation from './AppNavigation'
import Helper from '../Lib/Helper'

class ReduxNavigation extends Component {
  timer = null

  state = {
    canExit: false
  }

  onBackPress = () => {
    const {dispatch, nav} = this.props
    const activeRoute = nav.routes[nav.index]
    // if (activeRoute.routeName === 'Root' || activeRoute.routeName === 'Market') {
    if (activeRoute.routeName === 'Root') {
      this.timer = null
      if (!this.state.canExit) {
        this.setState({canExit: true})
        ATModal.toast({content: '再次点击退出都快金服～', duration: 1500})
        this.timer = setTimeout(() => {
          this.setState({canExit: false})
        }, 1500)
        return true
      } else {
        // BackHandler.exitApp()
        return false
      }
    }
    dispatch({type: 'Navigation/BACK'})
    return true
  }

  gotoLogin = () => {
    this.props.dispatch({
      type: 'Navigation/NAVIGATE',
      routeName: 'Login'
    })
  }

  componentWillMount () {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
    Helper.CODE_PUSH_STATUS = 0
  }

  componentDidMount () {
    Helper.eventManage.on('user/gotoLogin', this.gotoLogin)
  }

  componentWillUnmount () {
    Helper.eventManage.off('user/gotoLogin', this.gotoLogin)
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
  }

  render () {
    return <AppNavigation navigation={addNavigationHelpers({
      dispatch: this.props.dispatch,
      state: this.props.nav,
      addListener: createReduxBoundAddListener('root')
    })} />
  }
}

const mapStateToProps = state => ({nav: state.nav})
export default connect(mapStateToProps)(ReduxNavigation)
