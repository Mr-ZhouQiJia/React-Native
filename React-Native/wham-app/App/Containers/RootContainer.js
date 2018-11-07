import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import Orientation from 'react-native-orientation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import Helper from '../Lib/Helper'
import AppUpgrade from '../Components/AppUpgrade'
// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {
  constructor (props) {
    super(props)
    this.appUpgrade = null
    this.setAppUpgradeFunc = this.setAppUpgrade.bind(this)
  }

  setAppUpgrade (el) {
    this.appUpgrade = el
  }

  componentDidMount () {
    // this.appUpgrade && this.appUpgrade.checkVersion(false)
    Orientation.lockToPortrait()
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
    Helper.eventManage.on('app/checkVersion', (isAlert = false) => {
      this.appUpgrade.checkVersion(isAlert)
    })
  }

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar
          barStyle='dark-content'
          backgroundColor='#00000000'
          translucent
        />
        <ReduxNavigation />
        <AppUpgrade ref={this.setAppUpgradeFunc} />
      </View>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  dispatch,
  startup: () => dispatch(StartupActions.startup())
})

const mapStateToProps = (state) => {
  return {
    nav: state.nav
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
