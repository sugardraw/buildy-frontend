import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, TouchableHighlight } from 'react-native';

import Wizard from './Wizard';
import ButtonSignup from './ButtonSignup';

export default class SignUp extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Wizard
					initiaValues={{
						firstName : '',
						lastName  : '',
						email     : '',
						password  : '',
						address   : '',
						city      : '',
						zipCode   : ''
					}}
				>
					<Wizard.Step>
						{({ onChangeValue, values }) => (
							<View>
								<ButtonSignup />
								<View style={styles.inputContainer}>
									<TextInput
										style={styles.inputs}
										onChangeText={(text) => onChangeValue('firstName', text)}
										placeholder="Name"
										value={values.firstName}
										underlineColorAndroid="transparent"
									/>
								</View>
								<View style={styles.inputContainer}>
									<TextInput
										style={styles.textInputStyle}
										onChangeText={(text) => onChangeValue('lastName', text)}
										placeholder="Last name"
										value={values.lastName}
									/>
								</View>
								<View style={styles.inputContainer}>
									<TextInput
										style={styles.inputs}
										onChangeText={(text) => onChangeValue('email', text)}
										placeholder="Email"
										value={values.email}
										autoCapitalize="none"
									/>
								</View>
								<View style={styles.inputContainer}>
									<TextInput
										style={styles.inputs}
										secureTextEntry
										onChangeText={(text) => onChangeValue('password', text)}
										placeholder="Password"
										value={values.password}
									/>
								</View>

								<TouchableHighlight
									style={styles.buttonContainer}
									onPress={() => this.props.navigation.navigate('Login')}
								>
									<Text>Already registered? Login</Text>
								</TouchableHighlight>
							</View>
						)}
					</Wizard.Step>
					<Wizard.Step>
						{({ onChangeValue, values }) => (
							<View>
								<View style={styles.inputContainer}>
									<TextInput
										style={styles.inputs}
										onChangeText={(text) => onChangeValue('address', text)}
										placeholder="Address"
										value={values.address}
									/>
								</View>
								<View style={styles.inputContainer}>
									<TextInput
										style={styles.inputs}
										onChangeText={(text) => onChangeValue('city', text)}
										placeholder="City"
										value={values.city}
									/>
								</View>
								<View style={styles.inputContainer}>
									<TextInput
										style={styles.inputs}
										onChangeText={(text) => onChangeValue('zipCode', text)}
										placeholder="Zip Code"
										value={values.zipCode}
									/>
								</View>

								<TouchableHighlight
									style={[ styles.buttonContainer, styles.signupButton ]}
									onPress={() => this.onClickListener('Signup')}
								>
									<Text style={styles.signupText}>Signup</Text>
								</TouchableHighlight>
							</View>
						)}
					</Wizard.Step>
				</Wizard>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container       : {
		flex            : 1,
		justifyContent  : 'center',
		alignItems      : 'center',
		backgroundColor : '#DCDCDC'
	},
	inputContainer  : {
		borderBottomColor : '#F5FCFF',
		backgroundColor   : '#FFFFFF',
		borderRadius      : 30,
		borderBottomWidth : 1,
		width             : 250,
		height            : 45,
		marginBottom      : 20,
		flexDirection     : 'row',
		alignItems        : 'center'
	},
	inputs          : {
		height            : 45,
		marginLeft        : 16,
		borderBottomColor : '#FFFFFF',
		flex              : 1
	},
	inputIcon       : {
		width          : 30,
		height         : 30,
		marginLeft     : 15,
		justifyContent : 'center'
	},
	buttonContainer : {
		height         : 45,
		flexDirection  : 'row',
		justifyContent : 'center',
		alignItems     : 'center',
		marginBottom   : 20,
		width          : 250,
		borderRadius   : 30
	},
	signupButton    : {
		backgroundColor : '#00b5ec'
	},
	signupText      : {
		color : 'white'
	}
});
