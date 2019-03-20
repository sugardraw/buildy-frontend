
import React, { Component } from 'react';
import {
    Text,
    View
} from 'react-native';

export default class StepOne extends Component {

    nextPreprocess() {
        this.props.saveState(0, { key: 'value' })
        this.props.nextFn()
    }

    previousPreprocess() {
        this.props.prevFn()
    }

    render() {
        if (this.props.currentStep !== 1) {
            return null;
        }
        return (
            <View>
                <Text>Hallo step one</Text>
            </View>
        )
    }


}

