import React from 'react'
import { View } from 'react-native'
import { isIphoneX } from 'react-native-iphone-x-helper'
import { Metrics } from '../Themes'

export default function Footer ({children, style, ...eProps}) {
  return <View style={{
    paddingTop: 20,
    paddingBottom: isIphoneX() ? 40 : Metrics.doubleBaseMargin,
    ...style
  }} {...eProps}>
    {children}
  </View>
}
