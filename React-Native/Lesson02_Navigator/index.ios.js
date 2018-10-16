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
  TouchableOpacity,
  Image,
  ActionSheetIOS,
  NavigatorIOS
} from 'react-native';
import MyScreen from "./MyScreen";

export default class Lesson02_Navigator extends Component {



   // 构造
     constructor(props) {
       // 初始状态
         super(props);
       this.state = {acount : 0};
     }

     onforward(){
         this.props.navigator.push({
             component: MyScreen,
             title : '我的',
             
         })
     }

    onPress = () => {
         this.setState({
             acount : this.state.acount + 1
         });
        ActionSheetIOS.showActionSheetWithOptions({
            options: ['取消','删除','重置','跳转'],
            cancelButtonIndex : 0,
            message: '测试ActionSheet弹出框',
            title: '底部提示',
        },
            (buttonIndex) => {
                if (buttonIndex === 2){
                    //根据按钮索引执行操作
                    this.state.acount = 0
                }else if (buttonIndex === 3){
                    this.onforward()
                }
            });
    };

    render(){
        return(



            <View style={styles.container}>
                {/*配置导航栏*/}
                <NavigatorIOS style = {styles.flex} initialRoute = {{ component: MyScreen, title: '标题', passProps:{}, }}/>
                <TouchableOpacity style={[{width : 80 , height:60 , backgroundColor:'red'} , {marginTop: 100}]} onPress={this.onPress}>
                    <Image
                        style={styles.button}
                        source={require('./1024pt@2x.png')}
                    />
                </TouchableOpacity>
                <View>
                    <Text style={{color : 'red'}}>
                        {this.state.acount !==0 ? this.state.acount : null}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex : 1,
      //justifyContent: 'center',
      paddingHorizontal: 10
    },
    button : {
        width:80,
        height: 60,
        alignItems:'center',
        backgroundColor: 'blue',
        //margin: 10
    },
});


//实现导航功能,页面切换
//var Lesson02_Navigator = require("./react-navigator");

AppRegistry.registerComponent('Lesson02_Navigator', () => Lesson02_Navigator);
