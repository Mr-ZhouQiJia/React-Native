import React , {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
}from 'react-native';

export default class DetailScreen extends Component{

    render(){
        return(
            <View>
                <Text style={styles.text}>
                    123
                </Text>
            </View>
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