import React , {Component} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    Button
}from 'react-native';

//var Dimensions = require('Dimensions');
const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

export default class Cell extends Component{
    _onPress1() {
        console.log("123")
    }
    render(){
        return(
            <View>
            <View style={Styles.container}>
                <Text onPress={this._onPress1.bind(this)}>
                    123
                </Text>
            </View>
            <View>
                <Button title="点我" onPress={this._onPress1.bind(this)}  />
            </View>
            </View>

        )

    }
}

const Styles = StyleSheet.create({
    container : {
        margin: 10,
        backgroundColor: 'blue',
        height: 100,
        width : ScreenWidth / 2 - 20 ,
    }
});

