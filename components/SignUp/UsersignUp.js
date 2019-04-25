import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, ScrollView } from 'react-native';
import Wizard from './Wizard';

import { api } from '../../api/api';
import axios from 'axios';
import UploadAvatar from '../Profile/UploadAvatar';
import deviceStorage from '../../services/deviceStorage';

export default class UsersignUp extends Component {
	static navigationOptions = {
		headerTransparent : true,
		headerTintColor   : '#00b5ec'
	};
	constructor(props) {
		super(props);
		this.state = {};
	}

	collectData = (name, value) => {
		this.setState({ [name]: value });
	};

	getUri = (uri) => {
		console.log(uri);
		this.setState({ avatar: uri });
	};

	submitSignUp = () => {
		const options = {
			headers : {
				Accept         : 'application/json',
				'Content-Type' : 'multipart/form-data'
			}
		};
		axios
			.post(api + '/api/user/save', this.state)
			.then((response) => {
				deviceStorage.saveItem('id_token', response.data.token);
				deviceStorage.saveItem('avatar', this.state.avatar);
				this.props.navigation.navigate('SignupAnimation', {
					id_token : response.data.token,
					avatar   : this.state.avatar
				});
			})
			.catch((error) =>
				this.setState({
					error : error
				})
			);
	};

	render() {
		return (
			<View style={styles.container}>
				<ScrollView contentComponentStyle={{ flex: 1 }}>
					<Wizard
						initialValues={{
							avatar     : this.state.avatar,
							first_name : '',
							last_name  : '',
							email      : '',
							password   : '',
							street     : '',
							city       : '',
							zip        : ''
						}}
						collectData={this.collectData}
					>
						<Wizard.Step>
							{({ onChangeValue, values }) => (
								<View style={styles.container}>
									<View style={{ marginTop: 30 }}>
										<UploadAvatar
											getUri={this.getUri}
											payloadKey="avatar"
											endpoint={api + '/api/user/save'}
											callbackUrl="https://cdn.pixabay.com/photo/2017/08/16/00/29/add-person-2646097_960_720.png"
										/>
									</View>
									<View style={styles.inputContainer}>
										<TextInput
											name="first_name"
											style={styles.inputs}
											onChangeText={(text) => onChangeValue('first_name', text)}
											placeholder="Name"
											value={values.first_name}
											underlineColorAndroid="transparent"
										/>
									</View>
									<View style={styles.inputContainer}>
										<TextInput
											name="last_name"
											style={styles.inputs}
											onChangeText={(text) => onChangeValue('last_name', text)}
											placeholder="Last Name"
											value={values.last_name}
											underlineColorAndroid="transparent"
										/>
									</View>
									<View style={styles.inputContainer}>
										<TextInput
											name="email"
											style={styles.inputs}
											onChangeText={(text) => onChangeValue('email', text)}
											placeholder="Email"
											value={values.email}
											autoCapitalize="none"
										/>
									</View>
									<View>
										<Text style={[ styles.small, { paddingTop: 10, paddingBottom: 2 } ]}>
											We'll never share your email with anyone else.
										</Text>
									</View>
									<View style={styles.inputContainer}>
										<TextInput
											name="password"
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
							{({ onChangeValue, values, signUp }) => (
								<View>
									<View style={[ styles.inputContainer, { marginTop: 100 } ]}>
										<TextInput
											name="city"
											style={styles.inputs}
											onChangeText={(text) => onChangeValue('city', text)}
											placeholder="City"
											value={values.city}
										/>
									</View>
									<View style={styles.inputContainer}>
										<TextInput
											name="street"
											style={styles.inputs}
											onChangeText={(text) => onChangeValue('street', text)}
											placeholder="Street"
											value={values.street}
										/>
									</View>
									<View style={styles.inputContainer}>
										<TextInput
											name="zip"
											style={styles.inputs}
											onChangeText={(text) => onChangeValue('zip', text)}
											placeholder="Zip Code"
											value={values.zip}
										/>
									</View>

									<TouchableHighlight
										style={[ styles.buttonContainer, styles.signupButton ]}
										onPress={(values) => this.submitSignUp(values)}
									>
										<Text style={styles.signupText}>Sign up</Text>
									</TouchableHighlight>
								</View>
							)}
						</Wizard.Step>
					</Wizard>
				</ScrollView>
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
	small           : {
		fontSize : 12
	},
	inputContainer  : {
		marginTop         : 20,
		borderBottomColor : '#F5FCFF',
		backgroundColor   : '#FFFFFF',
		borderRadius      : 5,
		borderBottomWidth : 1,
		width             : 250,
		height            : 50,
		marginBottom      : 20
	},
	inputs          : {
		height            : 50,
		marginLeft        : 16,
		borderBottomColor : '#FFFFFF',
		flex              : 1
	},

	inputIcon       : {
		width      : 30,
		height     : 30,
		marginLeft : 15,
		alignSelf  : 'flex-start'
	},
	buttonContainer : {
		justifyContent : 'center',
		alignItems     : 'center',
		marginBottom   : 20,
		width          : 250,
		margin         : 4,
		padding        : 5,
		borderRadius   : 5,
		borderWidth    : 1,
		borderColor    : '#85c4ea',
		maxHeight      : 100,
		alignSelf      : 'center'
	},
	signupButton    : {
		height          : 40,
		backgroundColor : '#00b5ec'
	},
	signupText      : {
		color : 'white'
	}
});
