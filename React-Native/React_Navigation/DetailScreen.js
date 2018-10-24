import React , {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    FlatList,
    Alert,
    TouchableOpacity
} from 'react-native';
import NewsCell from './NewsCell';


export default class DetailScreen extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            title : '',
            decription:'',
            image:''
        }
    }

    static navigationOptions = {
        headerTitle :'聊天',
        rightButtonTitle: 'why',
        headerTintColor: 'red',
        // header :{
        //     //backButtonTitle : '返回',
        // },
    };

    //FlatList的key
    _keyExtractor = (item,index) => index;

    //子item的渲染
    _renderItem = (item) => {
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={this._itemClick.bind(this,item,index)}>
                <View>
                    <Text>
                        {item.title}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
    //点击事件
    _itemClick(item , index) {

    }
    //列表分隔线
    _itemDivide = () => {
        return (
            <View style={{height: 1, backgroundColor: 'dimgray'}}></View>
        )
    }

    _fetchData = () => {
        fetch('https://news-at.zhihu.com/api/4/news/before/20131119')
            .then((response) => response.json())
            .then((jsondata) => {
                Alert.alert('12345'),
                console.log(jsondata),
                this.setState({
                    title : jsondata.title,
                })
            })
            .catch((error) => {
                console.log(123)
                console.log(error)
            })
    }

    componentWillMount() {
        this._fetchData();
    }


    render(){
        //获取上级页面传来的参数
        const {params} = this.props.navigation.state;
        return(
            <View>
            <View style={styles.container}>
                <Text>
                    详情页面 with {params.user}
                </Text>
                <Button title= '返回上级页面' onPress={() => {this.props.navigation.goBack()}}/>
            </View>
            <View>
                <FlatList
                    style={{margin: 20}}
                    data={this.state.title}
                    renderItem={this._renderItem}
                    ItemSeparatorComponent={this._itemDivide()}
                />
            </View>

            </View>

        )
    }
}

var url = ''


const styles = StyleSheet.create({
    container : {
        backgroundColor:'green'
    },
});