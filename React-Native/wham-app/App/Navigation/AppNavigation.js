import React from 'react'
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation'
import { Easing, Animated, Text } from 'react-native'
import { Colors } from '../Themes'
import { Iconfont } from '../Components'
import MineScreen from '../Containers/MineScreen'
import HomeScreen from '../Containers/HomeScreen'
import ProductScreen from '../Containers/ProductScreen'
import WebScreen from '../Containers/WebScreen'
import LoginScreen from '../Containers/LoginScreen'
import MyAccountScreen from '../Containers/MyAccountScreen'
import MyInfoScreen from '../Containers/MyInfoScreen'
import SignupScreen from '../Containers/SignupScreen'
import EMailScreen from '../Containers/EMailScreen'
import AddressScreen from '../Containers/AddressScreen'
import RealNameScreen from '../Containers/RealNameScreen'
import AuthDetailScreen from '../Containers/AuthDetailScreen'
import SettingScreen from '../Containers/SettingScreen'
import ProfessionScreen from '../Containers/ProfessionScreen'
import EducationScreen from '../Containers/EducationScreen'
import SetPasswordScreen from '../Containers/SetPasswordScreen'
import ModifyPasswordScreen from '../Containers/ModifyPasswordScreen'
import ResetPasswordScreen from '../Containers/ResetPasswordScreen'
import ProductDetailScreen from '../Containers/ProductDetailScreen'
import ProductBuyScreen from '../Containers/ProductBuyScreen'
import BankCardScreen from '../Containers/BankCardScreen'
import PromiseScreen from '../Containers/PromiseScreen'
import AccountProScreen from '../Containers/AccountProScreen'

const PrimaryTabNav = TabNavigator(
  {
    Home: {screen: HomeScreen},
    Product: {screen: ProductScreen},
    Mine: {screen: MineScreen},
  },
  {
    navigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, tintColor}) => {
        const {routeName} = navigation.state
        const iconConf = {
          Home: 'home',
          Product: 'product',
          Mine: 'mine'
        }
        return <Iconfont size={30} name={iconConf[routeName]} color={focused ? Colors.primary : '#999'} />
      },
      tabBarLabel: ({focused, tintColor}) => {
        const {routeName} = navigation.state
        const labelConf = {
          Home: '首页',
          Product: '产品',
          Mine: '我的'
        }
        return <Text style={{
          color: focused ? Colors.primary : '#999',
          fontSize: 10,
          marginBottom: 4,
          textAlign: 'center',
          fontWeight: focused ? 'bold' : '200'
        }}>{labelConf[routeName]}</Text>
      }
    }),
    tabBarOptions: {
      activeTintColor: Colors.primary,
      inactiveTintColor: Colors.primary,
      style: {
        backgroundColor: Colors.tabBackground,
        borderTopColor: Colors.border.light
      }
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    lazy: false
  }
)

const StacksOverTabs = StackNavigator({
  Root: {
    screen: PrimaryTabNav
  },
  Web: {
    screen: WebScreen
  },
  Login: {
    screen: LoginScreen
  },
  MyAccount: {
    screen: MyAccountScreen
  },
  MyInfo: {
    screen: MyInfoScreen
  },
  Signup: {
    screen: SignupScreen
  },
  EMail: {
    screen: EMailScreen
  },
  Address: {
    screen: AddressScreen
  },
  RealName: {
    screen: RealNameScreen
  },
  AuthDetail: {
    screen: AuthDetailScreen
  },
  Setting: {
    screen: SettingScreen
  },
  Profession: {
    screen: ProfessionScreen
  },
  Education: {
    screen: EducationScreen
  },
  SetPassword: {
    screen: SetPasswordScreen
  },
  ModifyPassword: {
    screen: ModifyPasswordScreen
  },
  ResetPassword: {
    screen: ResetPasswordScreen
  },
  ProductDetail: {
    screen: ProductDetailScreen
  },
  ProductBuy: {
    screen: ProductBuyScreen
  },
  BankCard: {
    screen: BankCardScreen
  },
  Promise: {
    screen: PromiseScreen
  },
  AccountPro: {
    screen: AccountProScreen
  }
}, {
  headerMode: 'none',
  transitionConfig: () => ({
    transitionSpec: {
      duration: 300,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing
    },
    screenInterpolator: sceneProps => {
      const {layout, position, scene} = sceneProps
      const {index} = scene

      const width = layout.initWidth
      const translateX = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [width, 0, -width]
      })

      const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index],
        outputRange: [0, 1, 1]
      })

      return {opacity, transform: [{translateX}]}
    }
  })
})

export default StacksOverTabs
