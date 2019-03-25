import React from 'react';
import { View, TextInput, Text, StyleSheet, Button } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class RequestFormular extends React.Component {
	static navigationOptions = {
		title            : 'Request page',
		headerStyle      : { backgroundColor: '#173746' },
		headerTintColor  : 'white',
		headerTitleStyle : { color: 'white' }
	};
	constructor(props) {
		super(props);
		this.state = {
			title       : '',
			messageText : '',
			budget      : '',
			date        : '',
			height      : 10
		};
	}

	contactSomeone = () => {
		const { messageText } = this.state;
		if (messageText == '') {
			this.setState({ Error: 'Please write a message for your recipient' });
		}
	};

	render() {
		return (
			<KeyboardAwareScrollView ref="scrollView" contentContainerStyle={styles.scrollstyle}>
				<View style={styles.container}>
					<Text>Please give some info to the company</Text>
					<Text style={{ color: 'red' }}>{this.state.Error}</Text>

					<Text>Message</Text>
					<TextInput
						placeholder="Describe your ideas"
						multiline={true}
						underlineColorAndroid="transparent"
						value={this.state.messageText}
						onChangeText={(editedText) => this.setState({ messageText: editedText })}
						onContentSizeChange={(e) => this.setState({ height: e.nativeEvent.contentSize.height })}
						style={[
							styles.inputs,
							{
								height : Math.min(100, Math.max(20, this.state.height))
							}
						]} //height limitation between 20 to 120px (change dinamycally)
					/>

					<Text>Wich is your limit-budget?</Text>
					<TextInput style={styles.inputs} placeholder="5.000 Euro" underlineColorAndroid="transparent" />

					<Text>Wenn will you start?</Text>
					<TextInput style={styles.inputs} placeholder="03/05/2020" underlineColorAndroid="transparent" />

					<Button title="Take a picture" onPress={this.contactSomeone} />

					{/* dann kommt die kamera */}
				</View>
			</KeyboardAwareScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container          : {
		flex            : 1,
		backgroundColor : 'yellow',
		padding         : 30
	},
	// bodyProfile: {
	//     alignSelf: 'center',
	//     marginTop: 200,
	//     alignItems: 'center',
	//     flexDirection: 'row',
	//     position: 'absolute',
	//     backgroundColor: "#ffffff"
	// },
	scrollStyle        : {
		flexGrow : 1
	},
	bodyContentProfile : {
		flexGrow   : 1,
		margin     : 10,
		alignItems : 'center'
	},
	username           : {
		fontSize   : 15,
		fontWeight : '800',
		margin     : 10
	},
	shortDescription   : {
		fontSize : 13,
		margin   : 5
	},
	longDescription    : {
		fontSize : 11,
		margin   : 10,
		padding  : 10
	},
	inputs             : {
		borderBottomColor : 'black',
		borderBottomWidth : 2,
		backgroundColor   : 'white'
	}
});
