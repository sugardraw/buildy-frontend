import React from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import UploadAvatar from './UploadAvatar';

import { api } from '../../api/api';
import axios from 'axios';
import JWT from 'expo-jwt';
const config = require('../../config/config.js');
import deviceStorage from '../../services/deviceStorage';

export default class EditUserProfile extends React.Component {
	static navigationOptions = {
		headerStyle     : { backgroundColor: '#white' },
		headerTintColor : '#85c4ea'
	};

	constructor(props) {
		super(props);
		this.state = {
			avatar     : '',
			first_name : '',
			last_name  : '',
			email      : '',
			city       : '',
			street     : '',
			zip        : ''
		};
		this.id = null;
	}

	componentDidMount = async () => {
		const token = await AsyncStorage.getItem('id_token');
		const decodedJwt = JWT.decode(token, config.SECRET_TOKEN);
		const id = decodedJwt.sub;
		this.id = id;

		/* 	axios
			.get(api + '/api/user/showDetails?id=' + id)
			.then((response) => {
				this.setState({
					user : response.data
				});
			})
			.catch((error) => {
				console.log(error);
			}); */
	};
	onChangeValue = (key, val) => {
		this.setState({ [key]: val });
	};
	/* 	onChangeValue = (i, value) => {
		const newUser = this.state.user;
		newUser[value] = i;
		this.setState({
			user : newUser
		});
		console.log('thats it', i, value);
	}; */

	submit = () => {
		const user = this.state;
		console.log('thats me', user);
		const id = this.id;
		axios
			.post(api + `/api/user/update?id=${id}`, user)
			.then((response) => {
				this.props.navigation.navigate('UserProfile', {
					userScreen : 0
				});
			})
			.catch((err) =>
				this.setState({
					error : err
				})
			);
	};

	_uploadImageAsyncTest = async (uri) => {
		const uriParts = uri.split('.');
		const fileType = uriParts[uriParts.length - 1];
		const takeAvatar = new takeAvatar();
		takeAvatar.append('uploadAvatar', {
			user         : this.id,
			editedAvatar : {
				uri,
				name : 'updating-avatar' + uid(),
				type : `image/${filetype}`
			},
			avatar       : this.state.avatar
		});
		return await fetch(api + '/api/user/update', {
			method : 'POST',
			body   : JSON.stringify(formData)
		})
			.then((response) => console.log('returned something'))
			.catch((err) => console.log(err))
			.done();
	};

	render() {
		return (
			<KeyboardAwareScrollView ref="scrollView" contentContainerStyle={styles.scrollstyle}>
				<View style={styles.bodyContentProfile}>
					{/* 	{this.state.user.length > 0 ? (
						this.state.user.map((user, i) => ( */}
					<View
						style={{
							flexDirection  : 'column',
							justifyContent : 'center',
							alignItems     : 'center'
						}}
						/* 	key={i} */
					>
						<View>
							<UploadAvatar
								payloadKey="file"
								endpoint={api + '/api/user/save_avatar'}
								callbackUrl="https://cdn.pixabay.com/photo/2017/08/16/00/29/add-person-2646097_960_720.png"
							/>
						</View>

						<View style={styles.paragraphText}>
							<TextInput
								placeholder="first name"
								style={styles.inputField}
								underlineColorAndroid="transparent"
								value={this.state.first_name}
								onChangeText={(value) => this.onChangeValue('first_name', value)}
							/>
							<TextInput
								style={styles.inputField}
								placeholder="last name"
								underlineColorAndroid="transparent"
								value={this.state.last_name}
								onChangeText={(value) => this.onChangeValue('last_name', value)}
							/>
							<TextInput
								style={styles.inputField}
								placeholder="email"
								underlineColorAndroid="transparent"
								value={this.state.email}
								onChangeText={(value) => this.onChangeValue('email', value)}
							/>
							<TextInput
								style={styles.inputField}
								placeholder="city"
								underlineColorAndroid="transparent"
								value={this.state.city}
								onChangeText={(value) => this.onChangeValue('city', value)}
							/>
							<TextInput
								style={styles.inputField}
								underlineColorAndroid="transparent"
								placeholder="street"
								value={this.state.street}
								onChangeText={(value) => this.onChangeValue('street', value)}
							/>
							<TextInput
								style={styles.inputField}
								underlineColorAndroid="transparent"
								placeholder="zip"
								value={this.state.zip}
								onChangeText={(value) => this.onChangeValue('zip', value)}
							/>
						</View>
					</View>
					{/* 		))
					) : null} */}

					<TouchableOpacity onPress={this.submit} style={styles.button}>
						<Text style={styles.text}>SAVE</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAwareScrollView>
		);
	}
}

const styles = StyleSheet.create({
	bodyContentProfile : {
		margin     : 20,
		padding    : 20,
		alignItems : 'center'
	},
	scrollStyle        : {
		flexGrow : 1
	},
	button             : {
		width           : '100%',
		height          : 50,
		alignItems      : 'center',
		justifyContent  : 'center',
		position        : 'relative',
		margin          : 5,
		borderRadius    : 5,
		marginTop       : 30,
		bottom          : 10,
		backgroundColor : '#85c4ea',
		marginBottom    : 10
	},
	value              : {
		color : 'white'
	},
	inputField         : {
		width           : 200,
		fontSize        : 14,
		fontWeight      : '800',
		margin          : 5,
		padding         : 10,
		backgroundColor : 'white'
	}
});
