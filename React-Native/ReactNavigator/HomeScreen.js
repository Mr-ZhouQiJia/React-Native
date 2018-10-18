import React , {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default class extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text>
                    首页
                </Text>
            </View>
        )
    };
}

const styles = StyleSheet.create({
    container : {
      backgroundColor:'red',
        flex:1,

    },
});