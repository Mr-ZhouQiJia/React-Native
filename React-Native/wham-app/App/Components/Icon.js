import React from 'react'
import Iconfont from './Iconfont'
import Colors from '../Themes/Colors'

export default {
  Warning : <Iconfont size={30} name='tip-warning' color={Colors.warning} />,
  Success : <Iconfont size={30} name='tip-success' color={Colors.success} />,
  Error : <Iconfont size={30} name='tip-error' color={Colors.danger} />
}
