import React, { Component } from 'react'
import { View, ActivityIndicator, Text } from 'react-native'
import { Colors, Metrics } from '../Themes'

export default class Loading extends Component {
  render () {
    const {
      size,
      color,
      style,
      title,
      ...props
    } = this.props
    const titleBox = title === null ? null : (<Text style={styles.title}>{title || '正在加载中'}</Text>)
    return (
      <View {...props} style={[styles.loading, style]}>
        <ActivityIndicator size={size || 'large'} color={color || Colors.primary}/>
        {titleBox}
      </View>
    )
  }
}

const styles = {
  loading: {
    margin: Metrics.doubleBaseMargin,
    justifyContent: 'center'
  },
  title: {
    textAlign: 'center',
    marginVertical: 0,
    marginTop: Metrics.doubleBaseMargin,
    color: Colors.primary
  }
}
