import React , {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight
}from 'react-native';

export default class NewsCell extends Component {
    render(){
        return(
            <View>
               <TouchableHighlight onPress={this.props.onSelect}>
                   <View style={styles.row}>
                       <Text style={styles.text}>
                           {this.props.rowData}
                       </Text>
                   </View>
               </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
   row : {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      padding: 10,
      backgroundColor : 'red'
   } ,
    text : {
       flex: 1
    }
});