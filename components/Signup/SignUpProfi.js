import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Image,
	Alert,
	TouchableHighlight
} from 'react-native';

export default class SignUpProfi extends Component {

	static navigationOptions = {
		title: 'Signup'
	};

	constructor(props) {
		super(props);
		state = {
			username: '',
			service: '',
			email: '',
			password: ''
		};
	}

	onClickListener = (viewId) => {
		Alert.alert('Alert', 'Button pressed' + viewId);
	};

	render() {
		return (
			<View style={styles.container}>

				<View style={styles.InputContainer}>
					{/* <Image></Image> */}
					<TextInput
						style={styles.inputs}
						placeholder="Username"
						underlineColorAndroid="transparent"
						onChangeText={(username => this.setState({ username }))}
					/>
				</View>

				<View style={styles.InputContainer}>
					{/* <Image></Image> */}
					<TextInput
						style={styles.inputs}
						placeholder="Service you offer"
						underlineColorAndroid="transparent"
						onChangeText={(service => this.setState({ service }))}
					/>
				</View>

				<View style={styles.InputContainer}>
					<Image
						style={styles.inputIcon}
						source={{ uri: 'https://png.icons8.com/message/ultraviolet/50/3498db' }}
					/>
					<TextInput
						style={styles.inputs}
						placeholder="Email"
						keyboardType="email-address"
						underlineColorAndroid="transparent"
						onChangeText={(email => this.setState({ email }))}
					/>
				</View>

				<View style={styles.InputContainer}>
					<Image
						style={styles.inputIcon}
						source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }}
					/>
					<TextInput
						style={styles.inputs}
						placeholder="Password"
						secureTextEntry={true}
						underlineColorAndroid="transparent"
						onChangeText={(password => this.setState({ password }))}
					/>
				</View>

				<TouchableHighlight
					style={[styles.buttonContainer]}
					onPress={() => this.onClickListener('restore_password')}
				>
					<Text style={styles.signupSmallLink}>Forgot your password?</Text>
				</TouchableHighlight>

				<TouchableHighlight
					style={[styles.buttonContainer, styles.loginButton]}
					onPress={() => this.onClickListener('Signup')}
				>
					<Text style={styles.loginText}>Signup</Text>
				</TouchableHighlight>

				<View>
					<Text>Already registered?</Text>
					<Text style={styles.signupSmallLink}> Login</Text>
				</View>

			</View >
		);
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'green'
	},
	InputContainer: {
		borderBottomColor: '#F5FCFF',
		backgroundColor: '#FFFFFF',
		borderRadius: 30,
		borderBottomWidth: 1,
		width: 250,
		height: 45,
		margin: 20,
		alignItems: 'center',
		flexDirection: 'row'
	},
	inputs: {
		flex: 1,
		height: 45,
		marginLeft: 16,
		borderBottomColor: '#FFFFFF'
	},
	inputIcon: {
		width: 30,
		height: 30,
		marginLeft: 15,
		justifyContent: 'center'
	},
	buttonContainer: {
		width: 250,
		height: 45,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 20,
		borderRadius: 30
	},
	loginButton: {
		backgroundColor: '#00b5ec'
	},
	loginText: {
		color: 'white'
	},
	signupSmallLink: {
		fontSize: 11,
		fontWeight: '500'
	}
});