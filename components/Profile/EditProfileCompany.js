import React from 'react';
import { Button, View, Text, Image, TextInput, StyleSheet } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import UploadAvatar from './UploadAvatar';
import PortfolioGallery from '../CompanyPortfolio/PortfolioGallery';

import { api } from "../../api/api";
import axios from 'axios';

export default class EditProfileCompany extends React.Component {
	static navigationOptions = {
		title: "About Us",
		headerStyle: { backgroundColor: "#173746" },
		headerTintColor: "white",
		headerTitleStyle: { color: "white" }
	};

	constructor(props) {
		super(props);
		this.state = {
			name: "",
			shortDescription: "",
			// address: {
			// 	street: "",
			// 	zip: "",
			// 	city: ""
			// }
		}
	}

	sendToDb = () => {
		const id = "5c9b7f5e75443d1568260ccd"
		axios.post(api + `/api/professional/update?id=${id}`, this.state)
			.then(response => this.setState({
				response: response
			}))
			.catch(err => this.setState({
				error: err
			}))
	}

	render() {
		console.log(this.state.response, this.state.error)
		return (
			<KeyboardAwareScrollView
				ref="scrollView"
				contentContainerStyle={styles.scrollstyle}
			>
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<Text>EDIT COMPANY PROFILE</Text>
					<UploadAvatar
						payloadKey="file"
						endpoint={api + "/api/professional/save_avatar"}
						callbackUrl="https://justice.org.au/wp-content/uploads/2017/08/avatar-icon.png"
					/>
					<View style={styles.bodyContentProfile}>
						<TextInput
							style={styles.name}
							placeholder="name"
							underlineColorAndroid="transparent"
							value={this.state.name}
							onChangeText={editedText =>
								this.setState({ name: editedText })}
						/>
						<TextInput
							style={styles.shortDescription}
							placeholder="Describe your services"
							underlineColorAndroid="transparent"
							value={this.state.shortDescription}
							onChangeText={editedText =>
								this.setState({ shortDescription: editedText })}
						/>
						{/* <TextInput
							style={styles.name}
							placeholder="Street"
							underlineColorAndroid="transparent"
							value={this.state.address.street}
							onChangeText={newText =>
								this.setState({ street: newText })}
						/> */}
					</View>
					<PortfolioGallery />
					<Button
						title="Save"
						onPress={this.sendToDb}
					/>
				</View>
			</KeyboardAwareScrollView>
		);
	}
}

const styles = StyleSheet.create({
	bodyContentProfile: {
		margin: 10,
		alignItems: 'center',
		backgroundColor: 'white'
	},
	scrollStyle: {
		flexGrow: 1
	},
	username: {
		fontSize: 15,
		fontWeight: '800',
		margin: 10,
		backgroundColor: 'white'
	},
	shortDescription: {
		fontSize: 13,
		margin: 5,
		backgroundColor: 'white'
	}
});
