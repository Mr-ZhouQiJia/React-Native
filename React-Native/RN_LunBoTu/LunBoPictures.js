import React , {Component} from 'react';
import {
    View,
    Text,
    Image,
    Button,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Alert,
    Platform,
    ScrollView
} from 'react-native';
import Swiper from 'react-native-swiper';

import DetailScreen from './Detail';

import {
    StackNavigator,
    TabNavigator
} from 'react-navigation';

// 1.引入第三方组件
var Swipper = require('react-native-swiper');

// 2. 图片数据源
var images = ['http://pic1.win4000.com/wallpaper/0/5789d87be269b.jpg',
               'http://imgsrc.baidu.com/imgad/pic/item/7acb0a46f21fbe09334115c061600c338644adc3.jpg',
               'http://imgsrc.baidu.com/imgad/pic/item/8b82b9014a90f6037cb445933312b31bb151edda.jpg',
                'http://pic20.photophoto.cn/20110902/0034034471873095_b.jpg',
                'http://imgsrc.baidu.com/imgad/pic/item/024f78f0f736afc3d2fe4941b919ebc4b7451227.jpg'];



 class LunBoApp extends Component {
    static navigationOptions = {
        title : '轮播图'
    };

    renderImage(){
        var imageArr = [];
        const {navigate} = this.props.navigation;
        for (var i = 0 ; i < images.length ; i++){
            imageArr.push(
                <View key = {i} style={{height: 300}}>
                <TouchableOpacity  onPress={this.gotoDetail.bind(this) }>
                    <Image
                        style={[{flex:1 },{height:300}]}
                        source={{uri :images[i]}}
                    />
                </TouchableOpacity>
                </View>
            );
        }
        console.log(imageArr);
        return imageArr;
    };

    gotoDetail(){
        const {navigate} = this.props.navigation;
        Alert.alert('123','12qwqdx')
        navigate('DetailScreen')
    }

    render(){
        const {navigate} = this.props.navigation;
        return(
                <ScrollView style={styles.scrollStyle}>
                <View style={{height : 600}}>
                    <Swiper
                       // style={styles.swipeStyle}
                       // key = {this.state.banner.length}
                        autoplay = {true}
                        index = {2}
                        height={600}
                       // horizontal={false}
                        autoplayTimeout = {1}
                        width={Dimensions.get('window').width}
                    >
                        {this.renderImage()}

                    </Swiper>
                    <View style={styles.button}>
                    <Button  title={'dianji'} onPress={() => navigate('DetailScreen')}/>
                    </View>
                    <View>
                        <Text onPress={this.click.bind(this)}>
                            123
                        </Text>
                        <TouchableOpacity style={{width:200 , height:200}} onPress={this.click1.bind(this)}>
                        <Image style={{width:200 , height:200}} source={require('./123.jpg')}
                               onPress={this.click1.bind(this)}
                        />
                        </TouchableOpacity>
                    </View>
                </View>
                </ScrollView>

        )
    }

    click(){
        if (Platform.OS === "ios") {
            Alert.alert('iOS','123')
        }else {
            Alert.alert('android','321')
        }

    }

     click1(){
         Alert.alert('123','4567')
     }
}

const stackNavigator = StackNavigator(
    {
        LunBoApp : {screen: LunBoApp},
        DetailScreen : {screen : DetailScreen},

    },{
        navigationOptions : {
            headerBackTitle:null,
            headerTintColor:'#333333',
            showIcon:true,
            swipeEnabled:false,
            animationEnabled:false,
        }
    }
);


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
    },
    button: {
      marginTop: 10,
      marginLeft: 30,
      width: 100,
      height: 40
    },
    scrollStyle:{
        backgroundColor: '#F0FFFF'
    }
});


export default stackNavigator













