import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class AboutUs extends Component {
	static navigationOptions = {
		title            : 'Home',
		headerStyle      : { backgroundColor: '#173746' },
		headerTintColor  : 'white',
		headerTitleStyle : { color: 'white' }
	};
	render() {
		return (
			<View>
				<Text>Home after login</Text>
			</View>
		);
	}
}
