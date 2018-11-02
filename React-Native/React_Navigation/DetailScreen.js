import React , {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    FlatList,
    Alert,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import NewsCell from './NewsCell';
import MineScreen from './MineScreen'

export default class DetailScreen extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            title : '',
            image:'',
            // dataSource : new FlatList.dataSource({
            //     rowHasChanged: ((row1,row2) => row1 !== row2)
            // }),
            dataArray: [],
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
    _renderItem = ({item,index}) => {
        let imageArr = item.value.images;
        const {navigate} = this.props.navigation
        return (

            <TouchableOpacity activeOpacity={0.5} onPress={() => {navigate('MineScreen')}}>
                <NewsCell
                    title = {item.value.title}
                    images = {imageArr[0]}
                    id = {item.value.id}
                />
            </TouchableOpacity>
        )
    };



    //点击事件

    _click(index,item) {
        console.log(index,'++++',item);
      //  Alert.alert('点我干嘛' + index  + '标题:' + item.title);
       const {navigate} = this.props.navigation;
        navigate('MineScreen',{'id':item.value });
    }

    // _itemClick(item , index) {
    //
    // }
    //列表分隔线


    _itemDivide = () => {
        return (
            <View style={{height: 1, backgroundColor: 'dimgray'}}></View>
        )
    };

    _fetchData = () => {
        fetch('https://news-at.zhihu.com/api/4/news/before/20181026')
            .then((response) => response.json())
            .then((jsondata) => {

                // jsondata是解析到的数据
                let data = jsondata.stories;
               // console.log(jsondata.stories),
                //    console.log(jsondata),

                let dataBlob = [];
                let i = 0;
                //遍历数组
                data.map(function (item) {
                    //添加数据
                    dataBlob.push({
                        key: i,
                        value: item,
                    })
                    i++;
                })

               // Alert.alert(dataBlob);
                this.setState({
                    //复制数据源
                    dataArray: dataBlob,
                    isLoading: false,
                })
                data = null;
                dataBlob = null;
            })
            .catch((error) => {
                console.log(123)
                console.log(error)
            })
            .done();
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
                    ref = 'flatList'
                    style={{margin: 5}}
                    data={this.state.dataArray}
                    renderItem={this._renderItem.bind(this)}
                    ItemSeparatorComponent={this._itemDivide}
                    keyExtractor={this._keyExtractor}
                    showsVerticalScrollIndicator={false}
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

    cell : {
        height: 180
    }

});