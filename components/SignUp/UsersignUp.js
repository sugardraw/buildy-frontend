import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, TouchableHighlight } from 'react-native';
import Wizard from './Wizard';

import { api } from "../../api/api";
import axios from 'axios';
import UploadAvatar from "../Profile/UploadAvatar";

export default class UsersignUp extends Component {
	static navigationOptions = {
		title: 'User Register',
		headerStyle: { backgroundColor: '#173746' },
		headerTintColor: 'white',
		headerTitleStyle: { color: 'white' }
	};
	constructor(props) {
		super(props);
		this.state = {
			avatar: {},
			first_name: "",
			last_name: "",
			email: "",
			password: "",
		};
	}

	submit = () => {
		axios
			.post(api + `api/user/save`, values, config)
			.then(response => this.setState({
				response: response
			}))
			.catch(error => this.setState({
				error: error
			}))
	}

	_uploadImageAsyncTest = async uri => {
		const uriParts = uri.split(".");
		const fileType = uriParts[uriParts.length - 1];

		const takeAvatar = new takeAvatar();

		takeAvatar.append("saveAvatar", {
			user: "",
			editedAvatar: {
				uri,
				name: "save-avatar" + uid(),
				type: `image/${filetype}`
			},
			avatar: this.state.avatar
		});

		return await fetch(api + "/api/user/save", {
			method: "POST",
			body: JSON.stringify(formData)
		})
			.then(response => console.log("returned something"))
			.catch(err => console.log(err))
			.done();
	};

	// signUp = (values) => {
	// 	const config = {
	// 		headers: {
	// 			Accept: 'application/json',
	// 			'Content-Type': 'application/json'
	// 		}
	// 	};
	// 	console.log('thats mine', values);
	// 	return axios
	// 		.post('http://10.0.1.130:3001/api/user/save', values, config)
	// 		.then((response) => {
	// 			this.setState({
	// 				signedUp: true
	// 			});
	// 			return response;
	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 		});
	// };

	render() {
		return (
			<View style={styles.container}>
				<Wizard
					initialValues={{
						avatar: {},
						first_name: "",
						last_name: "",
						email: "",
						password: "",
					}}
				>
					<Wizard.Step>
						{({ onChangeValue, values }) => (
							<View>
								<Text>user sign up</Text>
								<UploadAvatar
									payloadKey='file'
									endpoint={api + '/api/user/save_avatar'}
									callbackUrl='https://cdn.pixabay.com/photo/2017/08/16/00/29/add-person-2646097_960_720.png'
								/>
								<View style={styles.inputContainer}>
									<TextInput
										style={styles.inputs}
										onChangeText={(text) => onChangeValue('first_name', text)}
										placeholder="Name"
										value={values.first_name}
										underlineColorAndroid="transparent"
									/>
								</View>
								<View style={styles.inputContainer}>
									<TextInput
										style={styles.inputs}
										onChangeText={(text) => onChangeValue('last_name', text)}
										placeholder="Last Name"
										value={values.last_name}
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

                <TouchableHighlight
                  style={styles.buttonContainer}
                  onPress={() => this.props.navigation.navigate("Login")}
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
                    onChangeText={text => onChangeValue("city", text)}
                    placeholder="City"
                    value={values.city}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.inputs}
                    onChangeText={text => onChangeValue("street", text)}
                    placeholder="Street"
                    value={values.street}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.inputs}
                    onChangeText={text => onChangeValue("zip", text)}
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
