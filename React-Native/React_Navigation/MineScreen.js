import React , {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default class MineScreen extends Component{
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
    });