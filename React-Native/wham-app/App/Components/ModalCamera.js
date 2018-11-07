import React, { Component } from 'react'
import { View, Image, Text } from 'react-native'
import PropTypes from 'prop-types'
import { ATModal, ATTouchable } from 'aloestec-rn-components'
import { Images, Colors, GlobalStyle } from '../Themes'
import { RNCamera } from 'aloestec-rn-camera'
import { Iconfont } from '../Components'
import Helper from '../Lib/Helper'

class ModalCamera extends Component {
  state = {
    opacity: 0,
    visible: false,
    backdropHide: true,
    backButtonHide: true,
    data: {},
    isFront: true
  }

  hide = () => {
    this.props.onClose()
  }

  takePicture = async () => {
    if (this.camera) {
      const data = await this.camera.takePictureAsync({
        width: 720,
        quality: 0.5,
        base64: false,
        skipProcessing: true,
        fixOrientation: true,
        exif: true
      })
      this.setState({
        data
      })
    }
  }

  cancel = () => {
    this.setState({
      data: {}
    })
  }

  confirm = () => {
    this.props.onConfirm(Object.assign(this.state.data, {isFront: this.state.isFront}))
    this.hide()
  }

  changeConstants = () => {
    this.setState({
      isFront: !this.state.isFront
    })
  }

  render () {
    return (
      <View style={styles.box}>
        {this.state.data.uri ? (
          <View style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0
          }}>
            <Image style={{
              width: '100%',
              height: '100%',
              transform: [{scaleX: this.state.isFront ? -1 : 1}]
            }} source={{uri: this.state.data.uri}} />
            <View style={{
              position: 'absolute',
              bottom: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              paddingHorizontal: 40
            }}>
              <Btn icon='camera-back' onPress={this.cancel} iconColor={Colors.font.content} />
              <Btn icon='confirm' onPress={this.confirm} iconColor={Colors.font.success} />
            </View>
          </View>
        ) : (
          <RNCamera
            ref={cam => {
              this.camera = cam
            }}
            exif={false}
            forceUpOrientation={false}
            fixOrientation
            style={{
              flex: 1,
              height: Helper.appHeight
            }}
            type={this.state.isFront ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back}
          >
            <Image source={Images.cameraFace} resizeMode='cover' style={{
              width: '100%'
            }} />
            <View style={{
              ...GlobalStyle.flexBox,
              position: 'absolute',
              top: 20,
              width: '100%'
            }}>
              <Text style={{color: Colors.font.success}}>请对正脸部区域并拍摄</Text>
            </View>
            <View style={{
              position: 'absolute',
              bottom: 20,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center'
            }}>
              <Btn icon='camera-close'
                   transparent
                   onPress={this.hide}
                   iconColor='#fff'
                   iconSize={20}
                   style={{
                     position: 'absolute',
                     left: 20
                   }}
              />
              <Btn icon='camera' onPress={this.takePicture} />
              <Btn icon='camera-switch'
                   transparent
                   onPress={this.changeConstants}
                   iconColor='#fff'
                   iconSize={36}
                   style={{
                     position: 'absolute',
                     right: 20
                   }}
              />
            </View>
          </RNCamera>
        )}
      </View>
    )
  }
}

class Btn extends Component {
  render () {
    return (
      <ATTouchable onPress={this.props.onPress} style={this.props.style}>
        <View style={{
          backgroundColor: this.props.transparent ? 'transparent' : '#fff',
          height: 80,
          width: 80,
          borderRadius: 100,
          ...GlobalStyle.flexBox
        }}>
          <Iconfont name={this.props.icon} size={this.props.iconSize || 40}
                    color={this.props.iconColor || Colors.font.title} />
        </View>
      </ATTouchable>
    )
  }
}

export default class Camera extends Component {
  static propTypes = {
    disabled: PropTypes.bool
  }

  static defaultProps = {
    disabled: false
  }

  close = () => {
    this.modal.close()
  }

  render () {
    const {children, disabled, style, ...eProps} = this.props
    return (
      <ATTouchable style={style} disabled={disabled} onPress={() => {
        this.modal = ATModal.modal({
          animation: true,
          render: () => <ModalCamera onClose={this.close} {...eProps} />
        })
      }}>
        {children}
      </ATTouchable>
    )
  }
}

const styles = {
  box: {
    backgroundColor: '#777',
    padding: 0,
    margin: 0,
    width: Helper.APP_WIDTH,
    height: Helper.APP_HEIGHT
  }
}
