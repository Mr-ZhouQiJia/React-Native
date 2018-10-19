import React , {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Image,
    ScrollView
} from 'react-native';

import {
    StackNavigator,
    TabNavigator,

} from 'react-navigation';

import MineScreen from './MineScreen';
import DetailScreen from './DetailScreen';
import TabBarItem from './TabBarItem';


  class HomeScreen extends Component{

    static navigatorOpations = {
        headerTitle : '首页', //设置标题
        // header :{
        //   backButtonTitle : '返回' //返回按钮 标题内容
        // },
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {navigate} = this.props.navigation;
        return(
                <View>
                    <Text>Hello,Navigation!</Text>
                    {/*
                navigate('DetailScreen',{user:'123'})
                第一个参数: 跳转到哪个页面,
                第二个参数: 传值
                */}
                    <Button title="点击跳转" onPress={() => navigate('DetailScreen',{user:'123'})}  />
                </View>


        )
    }

}

//
const MainScreenNavigator = TabNavigator({
    Home : {
        screen: HomeScreen,
        navigationOptions:({navigation}) => ({

            tabBarLabel:'首页',
            tabBarIcon:({focused,tintColor}) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={require('./首页.png')}
                    selectedImage={require('./首页(1).png')}
                />
            )
        }),
    },
        Mine:{
            screen:MineScreen,
            navigationOptions:({navigation}) => ({
                tabBarLabel:'我的',
                tabBarIcon:({focused,tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./我的 focus.png')}
                        selectedImage={require('./我的 focus(1).png')}
                    />
                )
            }),
        },
    },
    {
        mLayoutAnimationEnabled : false,
        position : 'top',
    }
);


const styles = StyleSheet.create({
   icon : {
        height : 22,
       width: 22,
       resizeMode : 'contain'
   } ,
});

const SimpleApp = StackNavigator({
   Home:{screen : MainScreenNavigator} ,
   DetailScreen:{screen : DetailScreen},
});

export default SimpleApp;