/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

//实现导航功能,页面切换
var Lesson02_Navigator = require("./react-navigator");

AppRegistry.registerComponent('Lesson02_Navigator', () => Lesson02_Navigator);
