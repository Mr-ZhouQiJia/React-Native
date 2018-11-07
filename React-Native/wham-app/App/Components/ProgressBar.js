import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
} from 'react-native'

export default class ProgressBar extends Component {

  static defaultProps = {
    width: 200,
    easing: Easing.inOut(Easing.ease),
    easingDuration: 500
  }

  state = {
    progress: new Animated.Value(0)
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.progress >= 0 && this.props.progress != prevProps.progress) {
      this.update()
    }
  }

  render () {

    const {width, style} = this.props

    const fillWidth = this.state.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1 * width],
    })

    return (
      <View style={[styles.background, style]}>
        <Animated.View style={[styles.fill, {width: fillWidth}]} />
      </View>
    )
  }

  update = () => {
    Animated.timing(this.state.progress, {
      easing: this.props.easing,
      duration: this.props.easingDuration,
      toValue: this.props.progress
    }).start()
  }
}

const styles = StyleSheet.create({
  background: {
    height: 10,
    overflow: 'hidden',
    backgroundColor: '#cccccc',
    borderRadius: 5
  },
  fill: {
    backgroundColor: '#e95f67',
    height: 10
  }
})
