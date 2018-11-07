import { Dimensions, Platform, StyleSheet } from 'react-native'
import { isIphoneX } from 'react-native-iphone-x-helper'

const {width, height} = Dimensions.get('window')

// Used via Metrics.baseMargin
const metrics = {
  marginHorizontal: 10,
  marginVertical: 10,
  section: 25,
  baseMargin: 10,
  doubleBaseMargin: 20,
  smallMargin: 5,
  doubleSection: 50,
  horizontalLineHeight: 1,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: (Platform.OS === 'ios') ? 64 : 54,
  buttonRadius: 4,
  borderWidth: StyleSheet.hairlineWidth,
  borderRadius: 6,
  listItemHeight: 60,
  iconButtonWidth: 44,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 50
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200
  },
  toastPosition: isIphoneX() ? -40 : -20,
  toastPositionFooter: isIphoneX() ? -100 : -80,
}

export default metrics
