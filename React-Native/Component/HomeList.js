import React , {Component} from 'react';
import {
    Text,
    View,
    Image
} from 'react-native';
import {
    createBottomTabNavigator,
    createStackNavigator
} from 'react-navigation';
import MineStack from './MineView'
import DetailScreen from "./DetailVC";

//标题图片
class TitleImage extends Component{
    render(){
        return(
            <Image source={require('./首页.png')} style={{width:30 , height:30}}/>
        )
    }

}
class HomeScreen extends React.Component {

    static navigationOptions = {
        headerTitle : <TitleImage/>

    };

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Home!</Text>
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
    Home : {
        screen : HomeScreen
    },
    Detail: {
        screen : DetailScreen
    }
},{

});

export default createBottomTabNavigator({
    Home: { screen: stack },
    Settings: { screen: SettingsScreen },
    Mine : {screen : MineStack}
});