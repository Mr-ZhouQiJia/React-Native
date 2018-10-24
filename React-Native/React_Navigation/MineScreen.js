import React , {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import DetailScreen from './DetailScreen'

export default class MineScreen extends Component{

    static navigationOptions = {
        title : '我的',
        drawerLabel : '我的',
        leftButtonTitle: '你的',
        drawerIcon : ({tintColor }) => (
            <Image source={require('./我的.png')}
                   style={[styles.icon , {tintColor : tintColor}]}/>
        )
    };

    render(){
        return(
            <View style={styles.container}>
                <Text>
                    我的页面
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        backgroundColor:'red'
    },
    icon : {
        width : 24,
        height : 24,
    },
    });

