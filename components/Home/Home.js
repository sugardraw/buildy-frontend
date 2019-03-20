
import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet
} from 'react-native';

// import FormAccess from '../FormAccess';
import RadioGroup from 'react-native-radio-buttons-group';
export default class Vertical extends Component {
	state = {
		buttons: [
			{
				disabled: false,
				label: 'I am a user',
			},
			{
				disabled: false,
				label: 'I am a company'
			},
		],
	};

	// update state
	onPress = data => this.setState({ buttons });

	render() {
		let selectedCategory = this.state.buttons.find(e => e.selected == true);
		selectedCategory = selectedCategory ? selectedCategory.value : null;
		return (
			<View style={styles.container}>
				<Text style={{ fontSize: 18, marginBottom: 50 }}>
					<Text>To creacte an account, please select a category</Text>
				</Text>
				<RadioGroup radioButtons={this.state.buttons} onPress={this.onPress} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
