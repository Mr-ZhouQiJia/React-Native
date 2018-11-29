import React , {Component} from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    ScrollView
} from 'react-native';

class MyTextInput extends Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
      }

      static navigationOptions = {
        title : '注册'
      };

    render() {
        return(
            <ScrollView>
                <TextInput
                    style={styles.textInput}
                    placeholder= '123'
                />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    textInput : {
        height : 140,
        paddingLeft: 80,
        paddingRight: 80,
        backgroundColor: 'red'

    }
});

export default MyTextInput;