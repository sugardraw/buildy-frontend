
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import RadioGroup from 'react-native-radio-buttons-group';

export default class ButtonsSignup extends Component {
    state = {
        buttons: [
            {
                disabled: false,
                value: "user",
                label: 'I am a user',
            },
            {
                disabled: false,
                value: "company",
                label: 'I am a company'
            },
        ],
    };

    onPress = buttons => this.setState({ buttons });

    render() {
        let selectedCategory = this.state.buttons.find(e => e.selected == true);
        selectedCategory = selectedCategory ? selectedCategory.value : this.state.buttons[0].label;
        return (
            <View style={styles.container}>
                <Text>To creacte an account,</Text>
                <Text>please select a category</Text>
                <RadioGroup radioButtons={this.state.buttons} onPress={this.onPress} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18
    },
});
