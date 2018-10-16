import React , {Component} from 'react';
import {
    View,
    StyleSheet,
    Dimensions
}from 'react-native';

//var Dimensions = require('Dimensions');
const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

export default class Cell extends Component{
    render(){
        return(
            <View style={Styles.container}>

            </View>
        )
    }
}

const Styles = StyleSheet.create({
    container : {
        margin: 10,
        backgroundColor: 'red',
        height: 100,
        width : ScreenWidth / 2 - 20 ,
    }
});

