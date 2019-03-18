import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Image,
	Alert,
	TouchableHighlight
} from 'react-native';

export default class Login extends React.Component {

	static navigationOptions = {
		title: 'Login'
	};

	constructor(props) {
		super(props);
		state = {
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
				<Text>LOGIN</Text>
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
					style={[styles.buttonContainer, styles.loginButton]}
					onPress={() => this.onClickListener('login')}
				>
					<Text style={styles.loginText}>Login</Text>
				</TouchableHighlight>

				<TouchableHighlight
					style={[styles.buttonContainer]}
					onPress={() => this.onClickListener('restore_password')}
				>
					<Text style={styles.signupSmallLink}>Forgot your password?</Text>
				</TouchableHighlight>

				<TouchableHighlight
					style={[styles.buttonContainer]}
					onPress={() => this.onClickListener('register')}
				>
					<Text style={styles.signupSmallLink}>Register</Text>
				</TouchableHighlight>

			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		margin: 20,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'orange'
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