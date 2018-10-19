import React , {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button
} from 'react-native';

export default class DetailScreen extends React.Component{


    static navigationOptions = {
        title :'聊天',
        // header :{
        //     //backButtonTitle : '返回',
        // },
    };

    render(){
        //获取上级页面传来的参数
        const {params} = this.props.navigation.state;
        return(
            <View style={styles.container}>
                <Text>
                    详情页面 with {params.user}
                </Text>
                <Button title= '返回上级页面' onPress={() => {this.props.navigation.goBack()}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        backgroundColor:'green'
    },
});