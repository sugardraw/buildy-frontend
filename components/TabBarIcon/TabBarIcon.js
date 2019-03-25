/* import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class Header extends Component {
	render() {
		return (
			<View>
				<Text>HEADER</Text>
			</View>
		);
	}
} */

import React from 'react';
import { Icon } from 'expo';

import Colors from '../../constants/Colors';

export default class TabBarIcon extends React.Component {
	render() {
		return (
			<Icon.Ionicons
				name={this.props.name}
				size={26}
				style={{ marginBottom: -3 }}
				color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
			/>
		);
	}
}
