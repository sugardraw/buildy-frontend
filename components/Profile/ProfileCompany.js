import React from 'react';
import { Button, View, Text, Image, StyleSheet } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import UploadAvatar from './UploadAvatar';
import PortfolioGallery from '../CompanyPortfolio/PortfolioGallery';
import { api } from "../../api/api";


import api from "../../api/api"
export default class ProfileCompany extends React.Component {
	static navigationOptions = {
		title: 'About Us',
		headerStyle: { backgroundColor: '#173746' },
		headerTintColor: 'white',
		headerTitleStyle: { color: 'white' }
	};
	render() {
		return (
			<KeyboardAwareScrollView ref="scrollView" contentContainerStyle={styles.scrollstyle}>
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<Text>COMPANY PROFILE</Text>
					<UploadAvatar
						payloadKey="file"
						endpoint={api + '/api/user/save_avatar'}
						callbackUrl="https://justice.org.au/wp-content/uploads/2017/08/avatar-icon.png"
					/>
					<View style={styles.bodyContentProfile}>
						<Text style={styles.username}>Company name</Text>
						<Text style={styles.shortDescription}>Short description Company</Text>
						<Text style={styles.longDescription}>
							Description Company: Lorem ipsum dolor sit amet, voluptate velit esse cillum dolore eu
							fugiat nulla pariatur.
						</Text>
					</View>
					<PortfolioGallery />
					<View>
						<Button
							backgroundColor="#03A9F4"
							buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
							title="SEND A REQUEST"
							onPress={() => this.props.navigation.navigate('RequestFormular')}
						/>
					</View>
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
		margin: 10
	},
	shortDescription: {
		fontSize: 13,
		margin: 5
	},
	longDescription: {
		fontSize: 11,
		margin: 10,
		padding: 10
	}
});
