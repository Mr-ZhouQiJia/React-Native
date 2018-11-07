import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'
import { Platform, StyleSheet } from 'react-native'
import { ifIphoneX } from 'react-native-iphone-x-helper'

const isIos = Platform.OS === 'ios'
const ApplicationStyles = {
  container: {
    flex: 1,
    // backgroundColor: isIos ? Colors.background.main : Colors.background.android
    backgroundColor: Colors.background.android
  },
  containerCustomerHeader: {
    flex: 1,
    backgroundColor: Colors.background.android
  },
  scrollContainer: {
    // backgroundColor: isIos ? Colors.background.main : Colors.background.android,
    backgroundColor: Colors.background.android,
    minHeight: '100%'
  },
  flexBox: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardBox: {
    marginHorizontal: Metrics.doubleBaseMargin,
    backgroundColor: Colors.background.light,
    borderRadius: Metrics.borderRadius,
    borderWidth: Metrics.borderWidth,
    borderColor: Colors.border.light,
    overflow: 'hidden'
  },
  // shadowBox: (Platform.OS === 'ios') ? {
  //   shadowColor: '#000',
  //   shadowOffset: {w: 0, h: 2},
  //   shadowRadius: 8,
  //   shadowOpacity: 0.05,
  // } : {
  //   // elevation: 2,
  //   borderColor: '#ddd',
  //   borderWidth: Metrics.borderWidth,
  // },
  //
  shadowBox: {
    borderColor: '#ddd',
    borderWidth: Metrics.borderWidth,
    overflow: 'hidden',
  },
  formItem: {
    width:'100%',
    height: 50,
    paddingHorizontal: Metrics.doubleBaseMargin,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  borderLine: {
    borderColor: '#e5e5e5',
    borderWidth: StyleSheet.hairlineWidth,
  },
  borderTopLine: {
    borderTopColor: '#e5e5e5',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  borderBottomLine: {
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  formItemKey: {
    fontSize: 15,
    lineHeight: 15 * 1.4,
    fontWeight: 'bold',
    color: '#666'
  },
  formItemValue: {
    maxWidth: '80%',
    fontSize: 15,
    lineHeight: 15 * 1.4,
    fontWeight: '200',
    color: '#333'
  },
  infoBox: {
    fontSize: 14,
    lineHeight: 15 * 1.5,
    color: Colors.font.gray,
    margin: Metrics.doubleBaseMargin
  }
}

export default ApplicationStyles
