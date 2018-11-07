import React, { Component } from 'react'
import { View, Image, Text } from 'react-native'
import {Images} from '../Themes'

export default class DefaultBox extends Component {
  render () {
    const {title, icon} = this.props
    return <View style={{height: '100%', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image source={Images[icon]}/>
      <Text style={{
        fontSize: 18,
        color: '#ccc',
        marginBottom: 20
      }}>{title}</Text>
    </View>
  }
}
