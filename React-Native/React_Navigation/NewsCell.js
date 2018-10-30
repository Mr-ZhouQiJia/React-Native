import React , {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight
}from 'react-native';

var dimensions = require('Dimensions');
var width = dimensions.get('window').width;
var height = dimensions.get('window').height;

export default class NewsCell extends Component {

    render(){

        let image = this.props.images;
        console.log(image);
        return(
            <View >
               <TouchableHighlight onPress={this.props.onSelect}>
                   <View style={styles.row}>
                       <View style={styles.imageView}>
                           <Image style={[{margin:0},styles.imageView]} source={{uri:this.props.images}}/>
                       </View>
                       <View style={[{margin: 1},{flexDirection:'column'}]}>
                           <View>
                                <Text numberOfLines= {5} style={[styles.text,{flexWrap: 'wrap'} , {backgroundColor:'red' , fontSize: 17}]}>
                                    {this.props.title}
                                </Text>
                           </View>
                           <View style={[styles.text,{marginBottom : 1 , height : 50}]}>
                                <Text style={[ {color:'blue', fontSize : 17 , backgroundColor: 'gray'}  ]}>
                                    {this.props.id}
                                </Text>
                           </View>
                       </View>
                   </View>
               </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
   row : {
      //height: 160,
       flex:1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      padding: 10,
      backgroundColor : 'white'
    } ,
    rightArea:{
     // height: 160,
      width: this.width - 160,
    },
    text : {
       flex: 1,
       margin: 2,
       height: 50,
        width: width - 120,
       marginRight: 5,
        textAlign: 'center'

    },
    imageView : {
       margin: 0,
       height : 100,
       width: 100,
    }
});