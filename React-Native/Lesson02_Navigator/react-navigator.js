import React , {Component} from "react";
//StackNavigator用于实现各个页面间的跳转,TabNavigator切换组件,实现同一页面上不同界面的切换
import {StackNavigator, TabNavigator, TabBarTop} from "react-navigation";
import HomeScreen from "./HomeScreen"; // 从HomeScreen页面导入HomeScreen组件,HomeScreen表示HomeScreen.js, ./ 表示当前页面,不可删除
import NewsScreen from "./NewsScreen";
import MyScreen from "./MyScreen";

export default class MainComponent extends Component{
    render(){
        return(
            <Navigator/>
        );
    }
}

const TabRouteConfigs = {  //表示各个页面路由配置,让导航器知道需要导航的路由对应的页面
    Home: { //路由名称
        screen: HomeScreen, //对应的路由页面
        navigationOptions: ({navigation}) => ({
            title : '首页',
        }),
    },

    News: {
        screen: NewsScreen,
        navigationOptions: ({navigation}) => ({ //指定路由页面的配置选项
            title : '新闻',
        }),
    },

    My: {
        screen: MyScreen,
        navigationOptions: ({navigation}) => ({
            title : '我的',
        }),
    },
};

const TabNavigationConfigs = {
    initialRouteName : 'Home', //初始化显示的Tab对应的页面的路由名称
    tabBarComponent : TabBarTop, //Tab选项卡组件,有TabBarBottom 和 TabBarTop两个值,在ios默认是bottom,在android默认是top
    tabBarPosition: 'top', //设置选项卡的位置,在顶部或者底部, 有'top'与'bottom'可选
    lazy: true, //是否懒加载页面
    tabBarOptions: {} //在属性TabBarBottom和TabbarTop中不同
};


const Tab = TabNavigator(TabRouteConfigs,TabNavigationConfigs);

const StackRouteConfig = {
    Tab: {
        screen : Tab,
    }
};

const StackNavigatorConfigs = { //表示导航器的配置,包括导航器的初始页面,各个页面之间导航的动画,页面的配置选项等等
    initialRouteName: 'Tab',
    navigationOptions: {
        title : 'Welcome to learn React Native!',
        headerStyle : {backgroundColor : 'yellow'},
        headerTitleStyle: {color : '#333333'},

    }

};

//StackNavigator导航组件,实现各个界面跳转
const Navigator = StackNavigator(StackRouteConfig, StackNavigatorConfigs);






























