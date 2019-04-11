import React, { Component } from 'react';
import axios from 'axios';

import MultiSelect from 'react-native-multiple-select';
import { StyleSheet, Text, View, TextInput, Picker, TouchableHighlight } from 'react-native';

import Wizard from './Wizard';

export default class SignUp extends Component {
	static navigationOptions = {
		title: 'Professional Sign Up',
		headerStyle: { backgroundColor: '#173746' },
		headerTintColor: 'white',
		headerTitleStyle: { color: 'white' }
	};
	constructor(props) {
		super(props);
		state = {
			signedUp: false,
		};
	}

	signUp = (values) => {
		const config = {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		};
		console.log('thats mine', values);
		return axios
			.post('http://10.0.1.130:3001/api/professional/save', values, config)
			.then((response) => {
				this.setState({
					signedUp: true
				});
				return response;
			})
			.catch((error) => {
				console.log(error);
			});
	};

	render() {
		const service = [
			{
				name: 'building'
			},
			{
				name: 'paint'
			},
			{
				name: 'selling'
			}
		];

		return (
			<View style={styles.container}>
				<Wizard
					initialValues={{
						name: '',
						email: '',
						password: '',
						services: [],
						address: {
							city: '',
							street: '',
							zip: ''
						},
						projectImages: [],
						avatar: ''
					}}
				>
					<Wizard.Step>
						{({ onChangeValue, values }) => (
							<View>
								<View style={styles.inputContainer}>
									<TextInput
										style={styles.inputs}
										onChangeText={(text) => onChangeValue('name', text)}
										placeholder="Company Name"
										value={values.name}
										underlineColorAndroid="transparent"
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
								<View>
									<Text style={styles.small}
									>We'll never share your email with anyone else.</Text>
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
								<View>
									<MultiSelect
										onSelectedItemsChange={(text) => onChangeValue('services', text)}
										value={values.services}
										underlineColorAndroid="transparent"
										items={service}
										uniqueKey="name"
										hideTags
										ref={(component) => {
											this.multiSelect = component;
										}}
										showDropDowns={true}
										readOnlyHeadings={true}
										displayKey="name"
										selectText="Pick service"
										searchInputPlaceholderText="Search Services..."
										onChangeInput={(text) => console.log(text)}
									/>
									<View>
										{this.multiSelect && this.multiSelect.getSelectedItemsExt(values.services)}
									</View>
									{/* <Picker
										mode="dropdown"
										placeholder="Services"
										style={styles.inputs}
										selectedValue={values.services}
										onValueChange={(value) => onChangeValue('services', value)}
									>
										<Picker.Item label="build" value="build" />
										<Picker.Item label="paint" value="paint" />
										<Picker.Item label="renovate" value="renovate" />
										<Picker.Item label="buying" value="buying" />
									</Picker> */}
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
						{({ onChangeValue, values, signUp }) => (
							<View>
								<View style={styles.inputContainer}>
									<TextInput
										style={styles.inputs}
										/* onChangeText={(text) => onChangeValue('city', text)}
										value={values.city} */
										placeholder="City"
										value={values.address}
										onChangeText={(text) => {
											const newCity = Object.assign({}, values.address, { city: text });
											this.setState({ address: newCity });
										}}
									/>
								</View>
								<View style={styles.inputContainer}>
									<TextInput
										style={styles.inputs}
										onChangeText={(text) => onChangeValue('street', text)}
										placeholder="Street and number"
										value={values.street}
									/>
								</View>
								<View style={styles.inputContainer}>
									<TextInput
										style={styles.inputs}
										onChangeText={(text) => onChangeValue('zip', text)}
										placeholder="Zip Code"
										value={values.zip}
									/>
								</View>

								<TouchableHighlight
									style={[styles.buttonContainer, styles.signupButton]}
									onPress={() => this.signUp(values)}
								>
									<Text style={styles.signupText}>Sign up</Text>
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
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#DCDCDC'
	},
	inputContainer: {
		borderBottomColor: '#F5FCFF',
		backgroundColor: '#FFFFFF',
		borderRadius: 30,
		borderBottomWidth: 1,
		width: 250,
		height: 45,
		marginBottom: 20,
		flexDirection: 'row',
		alignItems: 'center'
	},
	small: {
		fontSize: 9,
	},
	inputs: {
		height: 45,
		marginLeft: 16,
		borderBottomColor: '#FFFFFF',
		flex: 1
	},
	inputIcon: {
		width: 30,
		height: 30,
		marginLeft: 15,
		justifyContent: 'center'
	},
	buttonContainer: {
		height: 45,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 20,
		width: 250,
		borderRadius: 30
	},
	signupButton: {
		backgroundColor: '#00b5ec'
	},
	signupText: {
		color: 'white'
	}
});
