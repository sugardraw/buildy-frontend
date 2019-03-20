
import React, { Component, PropTypes } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    ScrollView,
    Alert
} from 'react-native';

export default class StepThree extends Component {

    nextPreprocess() {

        // Save step state for use in other steps of the wizard
        this.props.saveState(0, { key: 'value' })

        // Go to next step
        this.props.nextFn()


    }

    previousPreprocess() {


        // Go to previous step
        this.props.prevFn()


    }

    /* render MultiStep */
    render() {
        return (
            <View>
                <Text>Hallo step three</Text>
            </View>
        )
    }


}

