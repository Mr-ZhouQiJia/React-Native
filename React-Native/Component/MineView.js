import React , {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView
}from 'react-native';
import {
    createStackNavigator
}from 'react-navigation';
import DetailScreen from "./DetailVC";

class MineScreen extends Component{

    static navigationOptions = {
        title : '我的得的'
    }

    render(){
        return(
            <ScrollView>
            <View>
                <Text style={styles.text}>
                    123
                </Text>
            </View>
            </ScrollView>
        )
    }


}

const MineStack = createStackNavigator({
    Main : {screen : MineScreen},
    Detail : {screen: DetailScreen}
},{

});

const styles = StyleSheet.create({
    container :{

    } ,
    text : {
        backgroundColor : 'red',
    }
});

export default   MineStack;