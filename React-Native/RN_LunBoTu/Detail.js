import React , {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator
}from 'react-native';

export default class DetailScreen extends Component {
    static navigationOptions = {
        title : '详情'
    };
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            loading : true
        };
      }

    componentDidMount() {
      this.timer1 =  setInterval(() => {
            this.setState({loading:false})
        } ,5000)
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>
                    详情
                </Text>
                <ActivityIndicator color={'red'} size={"large"} animating={this.state.loading}/>
            </View>
        )
    }

    componentWillUnmount() {
        this.timer1 && clearInterval(this.timer1)
    }
}

const styles = StyleSheet.create({

    container : {
        flex:1
    },
    textStyle : {

    }
});