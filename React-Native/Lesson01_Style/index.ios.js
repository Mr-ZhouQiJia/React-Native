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
  View,
  Image,
  FlatList
} from 'react-native';

export default class Lesson01_Style extends Component {
  render() {
      //请注意{pic}外围有一层括号，我们需要用括号来把pic这个变量嵌入到 JSX 语句中。括号的意思是括号内部为一个 js 变量或表达式，需要执行后取值。因此我们可以把任意合法的 JavaScript 表达式通过括号嵌入到 JSX 语句中。
    let pic = {
        uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (

      <View style={ [{flexDirection: 'column'} ,{ justifyContent:'space-around'},{height : 300}, styles.container]}>
        {/*<Image source={pic} style={[{width: 193, height: 110},styles.pic]} />*/}
        {/*<FlatList*/}
            {/*data={[{key: 'a'},{key: 'b'},{key: 'c'},{key: 'd'},{key: 'e'},{key: 'f'},{key: 'g'},{key: 'h'},{key: 'i'},{key: 'j'}]}*/}
            {/*renderItem = {({item}) => <Text>{item.key}</Text>}*/}
        {/*/>*/}
        {/*<View style={myStyle.blueViewStyle}>*/}
            {/*<Text>蓝色</Text>*/}
        {/*</View>*/}
        {/*<View  style={myStyle.yellowViewColor}>*/}
            {/*<Text>黄色</Text>*/}
        {/*</View>*/}
          {/*/!*弹性（Flex）宽高*!/*/}

          {/*/!*在组件样式中使用flex可以使其在可利用的空间中动态地扩张或收缩。一般而言我们会使用flex:1来指定某个组件扩张以撑满所有剩余的空间。如果有多个并列的子组件使用了flex:1，则这些子组件会平分父容器中剩余的空间。如果这些并列的子组件的flex值不一样，则谁的值更大，谁占据剩余空间的比例就更大（即占据剩余空间的比等于并列组件间flex值的比）。*!/*/}


          {/*<View style={[{flex:1 },myStyle.blueViewStyle]}>*/}
              {/*<Text>蓝色</Text>*/}
          {/*</View>*/}
          {/*<View  style={[{flex:1}, myStyle.yellowViewColor]}>*/}
              {/*<Text>黄色</Text>*/}
          {/*</View>*/}

          <View style={myStyle.yellowViewColor}>

          </View>
          <View style={myStyle.blueViewStyle}>

          </View>
          <View style={myStyle.redViewColor}>

          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    marginTop: 100,
    //justifyContent: 'center',
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
  pic: {
      marginLeft:20,
      marginTop: 100,
  }
});

const myStyle = StyleSheet.create({
   blueViewStyle: {
      height : 50,
      width: 100,
      backgroundColor: 'blue',
   },
   yellowViewColor: {
       width: 100,
       height: 50,
       backgroundColor: 'yellow',
   } ,
    redViewColor: {
      width: 100,
      height: 50,
      backgroundColor: 'red',
    },
});

AppRegistry.registerComponent('Lesson01_Style', () => Lesson01_Style);
