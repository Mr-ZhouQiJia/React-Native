/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

/*
第一部分

导入ReactNative包,导入ReactNative组件
AppRegistry: JS运行所有ReactNative应用的入口
StyleSheet: ReactNative中使用的样式表,类似CSS样式表

 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

/*
第二部分

创建ReactNative组件
 */

export default class myappTest extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <Text Style={styles.welcome}>
            ssssssqwsqwqweq
        </Text>



      </View>
    );
  }
}

/*

第三部分:

styleSheet.create 创建样式实例
在应用中只会被创建一次,不用每次在渲染周期中重新创建

 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

/*
第四部分

注册入口组件

AppRegistry : 负责注册运行ReactNative应用程序的Javascript入口
registerComponent注册应用程序的入口组件,告知ReactNative哪一个组件被注册为应用的根容器

 */


AppRegistry.registerComponent('myappTest', () => myappTest);
