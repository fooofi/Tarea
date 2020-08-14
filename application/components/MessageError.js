import React, {Component} from 'react';
import {Text, View, StyleSheet} from "react-native";

export default class MessageError extends Component{
    render(){
        const {text} = this.props;
        return(
            <View style={styles.errorView}>
                <Text style={styles.errorText}>
                    {text}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    errorView:{
        justifyContent: 'center',
        flex: 1,
        marginTop: 10,
        marginBottom: 10
    },
    errorText:{
        backgroundColor: 'rgba(255, 0, 0, 0.6)',
        color: 'white',
        textAlign: 'center',
        padding: 20
    }
});