import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    ActivityIndicator,

} from 'react-native';

import {
    StackNavigator,
} from 'react-navigation';

import Cell from "./Cell";

// //定义TabNavigator:
// const Tab = TabNavigator({
//         Home:{
//
//         }
//     })

    export default class ListViewCell extends Component {



    constructor(props) {
        super(props);

        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            isLoading: true,
            dataSource : ds.cloneWithRows(["1", "2", "3", "4","1"])
        }

        this._renderRow = this._renderRow.bind(this);
    }

    // componentDidMount(){
    //     return fetch('https://facebook.github.io/react-native/movies.json')
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //
    //             this.setState({
    //                 isLoading: false,
    //                 dataSource: responseJson.movies,
    //             }, function(){
    //
    //             });
    //
    //         })
    //         //别忘了 catch 住fetch可能抛出的异常，否则出错时你可能看不到任何提示。
    //         .catch((error) =>{
    //             console.error(error);
    //         });
    // }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}  //数据源
                renderRow={this._renderRow}   //规定一行的样式
                contentContainerStyle={styles.container}/> //设置ListView背景
                //renderItem={({item}) => <Text>{item.title},{item.releaseYear}</Text>}
        );
    }

    _renderRow(data) {
        return (
            <Cell />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        flex: 1,
        flexDirection : "row",
        flexWrap : "wrap",
        justifyContent : "flex-start",
        backgroundColor: '#F5FCFF',
    },
});

AppRegistry.registerComponent('ListViewCell', () => ListViewCell);
