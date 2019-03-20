
import React, { Component } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Image
} from 'react-native';

import Wizard from '../Wizard';

export default class Profile extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Wizard initiaValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    // avatar:""
                }}>
                    <Wizard.Step>
                        {({ onChangeValue, values }) => (
                            <View>
                                <TextInput
                                    style={styles.textInputStyle}
                                    onChangeText={text => onChangeValue('firstName', text)}
                                    placeholder="Name"
                                    value={values.firstName}
                                />
                                <TextInput
                                    style={styles.textInputStyle}
                                    onChangeText={text => onChangeValue('lastName', text)}
                                    placeholder="Last name"
                                    value={values.lastName}
                                />
                                <TextInput
                                    style={styles.textInputStyle}
                                    onChangeText={text => onChangeValue('email', text)}
                                    placeholder="Email"
                                    value={values.email}
                                />
                                <TextInput
                                    style={styles.textInputStyle}
                                    onChangeText={text => onChangeValue('password', text)}
                                    placeholder="Password"
                                    value={values.password}
                                />
                                {/* ADD AVATAR */}
                            </View>
                        )}
                    </Wizard.Step>
                </Wizard>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInputStyle: {
        marginTop: 10,
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        width: 200
    }
});
