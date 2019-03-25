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
								<TextInput
									style={styles.textInputStyle}
									onChangeText={(text) => onChangeValue('firstName', text)}
									placeholder="Name"
									value={values.firstName}
									underlineColorAndroid="transparent"
								/>
								<TextInput
									style={styles.textInputStyle}
									onChangeText={(text) => onChangeValue('lastName', text)}
									placeholder="Last name"
									value={values.lastName}
								/>
								<TextInput
									style={styles.textInputStyle}
									onChangeText={(text) => onChangeValue('email', text)}
									placeholder="Email"
									value={values.email}
									autoCapitalize="none"
								/>
								<TextInput
									style={styles.textInputStyle}
									secureTextEntry
									onChangeText={(text) => onChangeValue('password', text)}
									placeholder="Password"
									value={values.password}
								/>
								<Text>Already registered?</Text>
								<TouchableOpacity>
									<Text style={styles.signupSmallLink}> Login</Text>
								</TouchableOpacity>
							</View>
						)}
					</Wizard.Step>
					<Wizard.Step>
						{({ onChangeValue, values }) => (
							<View>
								<TextInput
									style={styles.textInputStyle}
									onChangeText={(text) => onChangeValue('address', text)}
									placeholder="Address"
									value={values.address}
								/>
								<TextInput
									style={styles.textInputStyle}
									onChangeText={(text) => onChangeValue('city', text)}
									placeholder="City"
									value={values.city}
								/>
								<TextInput
									style={styles.textInputStyle}
									onChangeText={(text) => onChangeValue('zipCode', text)}
									placeholder="Zip Code"
									value={values.zipCode}
								/>
								<TouchableHighlight
									style={[ styles.buttonContainer, styles.loginButton ]}
									onPress={() => this.onClickListener('Signup')}
								>
									<Text style={styles.loginText}>Signup</Text>
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
		flex           : 1,
		alignItems     : 'center',
		justifyContent : 'center'
	},
	textInputStyle  : {
		padding     : 10,
		borderColor : 'black',
		borderWidth : 1,
		width       : 200
	},
	buttonContainer : {
		width           : 250,
		height          : 45,
		flexDirection   : 'row',
		justifyContent  : 'center',
		alignItems      : 'center',
		marginBottom    : 20,
		borderRadius    : 30,
		backgroundColor : '#00b5ec'
	},
	signupSmallLink : {
		fontSize   : 11,
		fontWeight : '500'
	}
});
