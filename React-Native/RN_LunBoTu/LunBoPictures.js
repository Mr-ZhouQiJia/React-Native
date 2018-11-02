import React , {Component} from 'react';
import {
    View,
    Text,
    Image,
    Button,
    StyleSheet,
    Dimensions
} from 'react-native';
import Swiper from 'react-native-swiper';


// 1.引入第三方组件
var Swipper = require('react-native-swiper');

// 2. 图片数据源
var images = ['http://pic1.win4000.com/wallpaper/0/5789d87be269b.jpg',
               'http://imgsrc.baidu.com/imgad/pic/item/7acb0a46f21fbe09334115c061600c338644adc3.jpg',
               'http://imgsrc.baidu.com/imgad/pic/item/8b82b9014a90f6037cb445933312b31bb151edda.jpg',
                'http://pic20.photophoto.cn/20110902/0034034471873095_b.jpg',
                'http://imgsrc.baidu.com/imgad/pic/item/024f78f0f736afc3d2fe4941b919ebc4b7451227.jpg'];

// 3.
var image = [''];

export default class LunBoApp extends Component {

    renderImage(){
        var imageArr = [];
        for (var i = 0 ; i < images.length ; i++){
            imageArr.push(
              <Image
                key = {i}
                style={[{flex:1 },{height:300}]}
                source={{uri :images[i]}}
              />
            );
        }
        console.log(imageArr);
        return imageArr;
    };
    
    render(){
        return(


                    <Swiper
                        style={styles.swipeStyle}
                        autoPlay = {true}
                        height={300}
                        width={Dimensions.get('window').width}
                    >
                        {this.renderImage()}


                    </Swiper>




        )
    }

    
}

const styles = StyleSheet.create({
    container : {
       // flex: 1,
       // justifyContent: 'center',
        marginTop: 80,
        backgroundColor: '#8470FF',
        alignItems: 'center',
        padding: 10
    },

    textStyle : {
        //height : 30,
       // width : 100,
        fontSize : 17,
        color: 'black',
        justifyContent: 'center',
        padding: 5,
        borderRadius : 10,
        borderWidth: 1
    },
    swipeStyle : {

    },
    img : {
        width : 300,
        height: 100
    }

});
















