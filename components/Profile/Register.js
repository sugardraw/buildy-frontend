
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Image, Alert } from 'react-native';

export default class LoginView extends Component {
    static navigationOptions = {
        title: 'Register',
        headerStyle: { backgroundColor: '#173746' },
        headerTintColor: 'white',
        headerTitleStyle: { color: 'white' }
    };

    render() {
        return (
            <View style={styles.container}>

                <TouchableHighlight
                    style={styles.buttonContainer}
                    onPress={() => this.props.navigation.navigate('UsersignUp')}
                >
                    <Text>Register as User</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.buttonContainer}
                    onPress={() => this.props.navigation.navigate('SignUp')}
                >
                    <Text>Register as profi</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30
    }
});
