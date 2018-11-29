/**
 * @providesModule ZX_TextInput
 */



import React , {Component} from 'react';
import {
    Text,
    View,
    Image,
    FlatList,
    Dimensions,
    Alert,
    TouchableOpacity
} from 'react-native';
import {
    createBottomTabNavigator,
    createStackNavigator
} from 'react-navigation';
import MineStack from './MineView'
import DetailScreen from "./DetailVC";
import MyTextInput from './component/ZX_TextInput';
//标题图片
class TitleImage extends Component{
    render(){
        return(
            <Image source={require('./相机.png')} style={{width:30 , height:30}}/>
        )
    }

}

var dataSource = ['ActivityIndicator','Button','TextInput'];
var width = Dimensions.get('window').width;

class HomeScreen extends React.Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {

        };
      }

    static navigationOptions = {
        headerTitle : <TitleImage/>

    };

    //cell
    _renderItem = (item) => {
        const {navigate} = this.props.navigation;
        console.log(item);
        return <TouchableOpacity onPress={()=>this.myNavigate(item)}>
            <Text style={{height: 50,width: width,backgroundColor : '#FAFAD2' , fontSize : 20 ,paddingTop: 13}}
                     >
            {item.item}
            </Text>
        </TouchableOpacity>
    };

    //跳转
    myNavigate = (item) => {

            this.props.navigation.navigate('ZX_TextInput',{params:'123'})


    }

    //下划线
    _seperator = () => {
        return <View style={{height : 1 , width : width ,backgroundColor: 'gray'} } ></View>
    };
    //keyExtractor
    _keyExtractor = (item,index) => {
        return index
    };
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' , backgroundColor: '#F0F8FF'}}>
                <Text>Home!</Text>
                <FlatList
                    data={dataSource}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                    ItemSeparatorComponent={this._seperator}

                />

            </View>

        );
    }
}

class SettingsScreen extends React.Component {
    static navigationOptions = {
        headerTitle : <TitleImage/>

    };
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Settings!</Text>
            </View>
        );
    }
}

const stack = createStackNavigator({
    Home  : HomeScreen,
    MyDetail : DetailScreen,
    setting : SettingsScreen,
    ZX_TextInput : MyTextInput,
},{

});

export default createBottomTabNavigator({
    Home: { screen: stack },
    Settings: { screen: SettingsScreen },
    Mine : {screen : MineStack}
});