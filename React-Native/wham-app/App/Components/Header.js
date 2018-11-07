import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import { ATHeader } from 'aloestec-rn-components'
import GlobalStyle from '../Themes/GlobalStyle'

class Header extends Component {
  render () {
    const {title, style, ...eProps} = this.props
    return <ATHeader
      title={title}
      fixStatusBar
      contentType='dark'
      style={[GlobalStyle.header, style]}
      onBack={() => {
        this.props.navigation.goBack(null)
      }}
      {...eProps}
    />
  }
}

export default withNavigation(Header)
