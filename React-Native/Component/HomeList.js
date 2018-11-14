import React , {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Image
} from 'react-native';
import {
    StackNavigator,
    TabNavigator,

}from 'react-navigation';
import DetailScreen from './DetailVC'


class HomeListScreen extends Component{

    static navigationOptions = {
        headerTitle : '首页'
    }
    render(){

        return(
            <ScrollView>
            <View style={styles.container}>
                <Text style={{marginTop: 100 , backgroundColor: 'red'}}>
                    Component
                </Text>
            </View>
            </ScrollView>
        )
    }

}



const MyTabNavigator = TabNavigator({
    Home : {
        screen : HomeListScreen,
        navigationOptions : ({navigation}) => ({
            headerTitle: '首页',
            tabarLabel : '首页',
            tabBarIcon : ({tintColor}) => (
                <Image source={require('./首页.png')} style={{width:30, height:30}}/>
            )
        })
    },
    Mine : {
        screen : DetailScreen,
        navigationOptions :  ({navigation}) => ({
            tabarLabel: '我的',
            tabBarIcon : ({tintColor}) => (
                <Image source={require('./我的.png')} style={{width:30 , height:30}}/>
            )
        })
    }

},{

});

const MyStackNavigator = StackNavigator({
    Main : {screen : MyTabNavigator},
    Detail : {screen : DetailScreen}
},{
    initialRouteName : 'Main',
    headerTintColor : 'red',
    gesturesEnabled : true
});

const styles = StyleSheet.create({
   container: {
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
   } ,
   view :{

   } ,
});

export default MyStackNavigator