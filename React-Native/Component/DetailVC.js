import React , {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
    ScrollView
}from 'react-native';

export default class DetailScreen extends Component{

    static navigationOptions = ({navigation}) => {
        const {item} = navigation.getParam('myParams');
        console.log(item);
        return {
            headerTitle: item
        }
    };

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

const styles = StyleSheet.create({
   container :{

   } ,
    text : {
       backgroundColor : 'red',
    }
});