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

        let image = this.props.images;
        console.log(image);
        return(
            <View>
               <TouchableHighlight onPress={this.props.onSelect}>
                   <View style={[styles.row,{flexDirection : 'row'}]}>
                       <View style={styles.imageView}>
                           <Image style={[{margin:0},styles.imageView]} source={{uri:this.props.images}}/>
                       </View>
                       <View style={{margin: 2}}>
                           <Text style={[styles.text , {backgroundColor:'red'}]}>
                               {this.props.title}
                           </Text>
                       </View>
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
      backgroundColor : 'white'
   } ,
    text : {
       flex: 1,
       margin: 2,
        height: 10
    },
    imageView : {
       margin: 0,
       height : 50,
       width: 50,
    }
});