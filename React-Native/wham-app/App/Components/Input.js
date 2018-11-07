import React, { Component } from 'react'
import { View, TextInput, Text, Platform } from 'react-native'
import { Metrics } from '../Themes'

export default class ComInput extends Component {
  shouldComponentUpdate (nextProps) {
    // return Platform.OS !== 'ios' || this.props.value === nextProps.value
    return Platform.OS !== 'ios' || (this.props.value === nextProps.value &&
      (nextProps.defaultValue === undefined || nextProps.defaultValue === '' )) ||
      (this.props.defaultValue === nextProps.defaultValue && (nextProps.value === undefined || nextProps.value === '' ))

  }

  render () {
    const {label, labelStyle, right, style, textInputStyle, ...props} = this.props
    return <View style={[{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingHorizontal: Metrics.doubleBaseMargin,
      height: 50
    }, style]}
    >
      {label ? (
        <Text style={[{color: '#333'}, labelStyle]}>{label}</Text>
      ) : null}
      <TextInput
        underlineColorAndroid='transparent'
        style={[{
          height: 50,
          flex: 1,
          marginLeft: Metrics.doubleBaseMargin,
          textAlign: 'right'
        }, textInputStyle]}
        {...props}
      />
      {right || null}
    </View>
  }
}
