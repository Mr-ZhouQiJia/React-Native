import React, { Component } from 'react';
import {StackNavigator , TabBarTop,TabNavigator} from  "react-navigation"
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import Lesson02_Navigator from "./index.ios";

//定义第一个页面
//FirstPage : 一个按钮,点击进入下一级页面
var FirstPage = React.createClass({
   // 按钮onPress事件处理方法
   pressPush : function () {
       //推出下一级页面
   },
   render:function () {
       return (
           <View style={[styles.flex, {backgroundColor: "yellow"}]}>
               <TouchableOpacity style={styles.btn} onPress={this.pressPush}>
                   <Text>点击推出下一级页面</Text>
               </TouchableOpacity>

           </View>
       );
   }
});

//定义第二个页面
//SecondPage : 一个button,点击返回上一页面
var SecondPage = React.createClass({
   pressPop: function () {
       //返回上一页面
   },

   render:function () {
       return(
           <View style={[styles.flex, {backgroundColor:"cyan"}]}>
               <TouchableOpacity style={styles.btn} onPress={this.pressPop}>
                   <Text>
                       点击返回上一页面
                   </Text>
               </TouchableOpacity>

           </View>

       );
   }

});



var LessonNavigator = React.createClass({
   render : function () {

       //自定义对象
       var rootRoute = {
           component : FirstPage
       };

       return (
           <Navigator
                /*
                第一步:
                initialRoute: 指定默认的页面,也就是启动app之后会看到界面的第一屏
                对象的属性是自定义的,这个对象的内容会在renderScense方法中处理.

                备注: 必须包含的属性, 即component,表示需要渲染的页面组件
                */
               initialRoute = {rootRoute}
               /**
                * 第二步:
                * configureScene
                * 场景渲染的配置
                *
                */

               configureScene = {(route) => {
                   return Navigator.SceneConfigs.PushFromRight;
               }}

                /**
                  * 第三步
                  * renderScene
                  *
                  * 渲染场景
                  *
                  * 参数: route(第一步创建并设置给导航器的路由对象),navigator(导航器对象)
                  * 实现: 给需要显示的组件设置属性.
                  */
               renderScene={(route,navigator) => {
                   //从route对象中获取页面组件
                   var  Component = route.component;
                   return (
                        <Component
                            navigator={navigator}
                            route={route}/>
                   );
               }}
           />
   );
   }
});


var styles = StyleSheet.create({
    flex : {
      flex:1,
      justifyContent: "center",
      alignItems: "center"
    },

    btn: {
        width: 150,
        height: 30,
        borderColor:"#0089FF",
        borderWidth:1,
        borderRadius:3,
        justifyContent:"center",
        alignItems:"center"
    }

});

module.exports = Lesson02_Navigator;












