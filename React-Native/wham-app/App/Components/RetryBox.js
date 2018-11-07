import React, { Component } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { ATButton } from "aloestec-rn-components"
import { Images } from '../Themes'


export default function RetryBox(props) {
  const { onPress, style, imageStyle, buttonStyle } = props
  return (
    <View style={[styles.warpper, style]}>
      <Image source={Images.network} style={[styles.img, imageStyle]}></Image>
      <ATButton
        ghost
        title="点击重试"
        onPress={onPress}
        style={[{ width: 120 }, buttonStyle]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  warpper: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  img: {
    width: 200, 
    height: 200, 
    marginTop: -40,
    marginRight: 15
  }
})
