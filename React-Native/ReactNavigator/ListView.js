import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
} from 'react-native';
import Cell from "./Cell"

export default class ListViewCell extends Component {

    constructor(props) {
        super(props);

        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource : ds.cloneWithRows(["1", "2", "3", "4"])
        }

        this._renderRow = this._renderRow.bind(this);
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}
                contentContainerStyle={styles.container}/>
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
        flex: 1,
        flexDirection : "row",
        flexWrap : "wrap",
        justifyContent : "flex-start",
        backgroundColor: '#F5FCFF',
    },
});

AppRegistry.registerComponent('ListViewCell', () => ListViewCell);
