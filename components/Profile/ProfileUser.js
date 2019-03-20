import React, { Component } from 'react';
import {
	StyleSheet,
	Image,
	Text,
	View,
	TouchableOpacity
} from 'react-native';
export default class ProfileUser extends Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.headerprofile}>
					<View style={styles.headerContent}>
						{/* how Upload The Image? */}
						<Image
							style={styles.avatar}
							source={require('../Header/avataaars.png')}
						/>
					</View>
				</View>

				<View style={styles.bodyProfile}>
					<View style={styles.bodyContentProfile}>
						<Text style={styles.username}>Username</Text>
						{/* <Text style={styles.shortDescription}>Short description Company</Text> */}
						<Text style={styles.longDescription}>wich service user need</Text>
						<Text style={styles.longDescription}>Description userś needs: Lorem ipsum dolor sit amet, voluptate velit esse cillum dolore eu fugiat nulla pariatur.</Text>
						{/* <TouchableOpacity style={styles.buttonContainer}>
							<Text>Send request</Text>
						</TouchableOpacity> */}

						{/* <View>
								<TouchableOpacity style={styles.buttonContainer}>
									<Text>Modify Profile</Text>
								</TouchableOpacity>

								<TouchableOpacity style={styles.buttonContainer}>
									<Text>Delete Profile</Text>
								</TouchableOpacity>

								<TouchableOpacity style={styles.buttonContainer}>
									<Text>Save Profile</Text>
								</TouchableOpacity>
						</View> */}
					</View>
				</View>
			</View >
		);
	}
}

const styles = StyleSheet.create({
	// container: {
	// 	flex: 1,
	// 	alignItems: 'center',
	// 	justifyContent: 'center'
	// },
	headerprofile: {
		backgroundColor: 'yellow',
		// marginTop: 100,
		// paddingTop: 10,
		// height: 200
	},
	headerContent: {
		padding: 30,
		alignItems: 'center'
	},
	avatar: {
		width: 100,
		height: 100,
		marginBottom: 10,
		borderWidth: 3,
		borderRadius: 50,
		borderColor: 'black'
	},
	bodyProfile: {
		alignSelf: 'center',
		marginTop: 200,
		alignItems: 'center',
		flexDirection: 'row',
		position: 'absolute',
		backgroundColor: "#ffffff"
	},
	bodyContentProfile: {
		margin: 10,
		alignItems: 'center'
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
	},
	buttonContainer: {
		margin: 5,
		height: 30,
		padding: 5,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 20,
		borderRadius: 30,
		backgroundColor: "green",
	}
});
