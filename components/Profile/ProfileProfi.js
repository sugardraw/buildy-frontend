import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
export default class ProfileProfi extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerprofile}>
                    <View style={styles.headerContent}>
                        {/* how Upload The Image? */}
                        <Image
                            style={styles.avatar}
                            source={{ uri: 'data:image/png;base64,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' }}
                        />
                    </View>
                </View>

                <View style={styles.bodyProfile}>
                    <View style={styles.bodyContentProfile}>
                        <Text style={styles.username}>Company name</Text>
                        {/* <Text style={styles.shortDescription}>Short description Company</Text> */}
                        <Text style={styles.longDescription}>service offer, service offer, service offer</Text>
                        <Text style={styles.longDescription}>Description Company: Lorem ipsum dolor sit amet, voluptate velit esse cillum dolore eu fugiat nulla pariatur.</Text>

                        <Text>Hier img gallery component</Text>

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
