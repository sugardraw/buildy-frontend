<<<<<<< HEAD
import React from "react";
import {
  View,
  TextInput,
  Text,
  Picker,
  StyleSheet,
  Button,
  TouchableHighlight
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
/* import Camera from "../AdvancedCamera/AdvancedCamera"; */
import { DatePicker } from "native-base";
=======
import React from 'react';
import { View, TextInput, Text, Picker, StyleSheet, Button, TouchableHighlight } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
/* import Camera from "../AdvancedCamera/AdvancedCamera"; */
import { DatePicker } from 'native-base';
>>>>>>> 08944862566ba71d32c7467ad602ecb2dc724552

export default class RequestFormular extends React.Component {
	static navigationOptions = {
		headerTransparent : true,
		headerTintColor   : 'black',
		headerTitleStyle  : { color: 'black' }
	};
	constructor(props) {
		super(props);
		this.state = {
			title        : '',
			description  : '',
			budget       : '',
			date         : '',
			height       : 10,
			renderCamera : false
		};
	}

<<<<<<< HEAD
  takeAPicture = () => {
    const { messageText, title } = this.state;
    if (messageText == "" || title == "") {
      this.setState({
        Error: "Please write a title and a description for your request"
      });
    } else {
      this.props.navigation.navigate("Camera", {
        navigation: this.props.navigation,
        requestData: {
          title: this.state.title,
          description: this.state.description,
          budget: this.state.budget,
          date: this.state.date.toString().substr(4, 12)
        }
      });
    }
  };

  callPicker() {
    this.refs.datePicker.showDatePicker();
  }

  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={styles.container}>
          <Text>CONTACT FORM</Text>
          <Text style={styles.required} />

          <Text style={{ color: "red" }}>{this.state.Error}</Text>
          <Text>Title</Text>
          <Picker
            mode="dropdown"
            style={styles.inputs}
            selectedValue={this.state.title}
            onValueChange={editedText => this.setState({ title: editedText })}
          >
            <Picker.Item
              color="#d3d3d3"
              label="please select a service"
              value=""
            />
            <Picker.Item label="build" value="build" />
            <Picker.Item label="paint" value="paint" />
            <Picker.Item label="renovate" value="renovate" />
            <Picker.Item label="buying" value="buying" />
          </Picker>
          {/* 	<TextInput
						style={styles.inputs}
						placeholder="Paint dinning room"
						underlineColorAndroid="transparent"
						onChangeText={(editedText) => this.setState({ title: editedText })}
					/> */}
=======
	takeAPicture = () => {
		const { messageText, title } = this.state;
		if (messageText == '' || title == '') {
			this.setState({
				Error : 'Please write a title and a description for your request'
			});
		} else {
			this.props.navigation.navigate('Camera', {
				navigation  : this.props.navigation,
				requestData : {
					title       : this.state.title,
					description : this.state.description,
					budget      : this.state.budget,
					date        : this.state.date.toString().substr(4, 12)
				}
			});
		}
	};

	callPicker() {
		this.refs.datePicker.showDatePicker();
	}

	render() {
		return (
			<KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
				<View style={styles.container}>
					<Text>CONTACT FORM</Text>
					<Text style={styles.required} />
>>>>>>> 08944862566ba71d32c7467ad602ecb2dc724552

					<Text style={{ color: 'red' }}>{this.state.Error}</Text>
					<Text>Title</Text>
					<Picker
						mode="dropdown"
						style={styles.inputs}
						selectedValue={this.state.title}
						onValueChange={(editedText) => this.setState({ title: editedText })}
					>
						<Picker.Item color="#d3d3d3" label="please select a service" value="" />
						<Picker.Item label="build" value="build" />
						<Picker.Item label="paint" value="paint" />
						<Picker.Item label="renovate" value="renovate" />
						<Picker.Item label="buying" value="buying" />
					</Picker>
					{/* 	<TextInput
						style={styles.inputs}
						placeholder="Paint dinning room"
						underlineColorAndroid="transparent"
						onChangeText={(editedText) => this.setState({ title: editedText })}
					/> */}

          <Text>Wich is your budget?</Text>
          <TextInput
            style={styles.inputs}
            placeholder="5.000 Euro"
            underlineColorAndroid="transparent"
            onChangeText={editedText => this.setState({ budget: editedText })}
          />
          <View>
            {/* <Text>Wenn will you start?</Text> */}
            <Text>Start Date: {this.state.date.toString().substr(4, 12)}</Text>
            <DatePicker
              style={styles.inputs}
              ref="datePicker"
              defaultDate={new Date(2018, 4, 4)}
              minimumDate={new Date(1960, 1, 1)}
              maximumDate={new Date(2022, 12, 31)}
              locale={"en"}
              selected={this.state.date}
              value={this.state.date}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={true}
              showTimeSelect
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText="Please select a date"
              textStyle={{ color: "green" }}
              placeHolderTextStyle={{ color: "#d3d3d3" }}
              disabled={false}
              onDateChange={editedText => this.setState({ date: editedText })}
            />
            {/* <TextInput
						style={styles.inputs}
						placeholder="03/05/2020"
						underlineColorAndroid="transparent"
						onChangeText={(editedText) => this.setState({ date: editedText })}
					/> */}
<<<<<<< HEAD
          </View>

          <Button
            style={styles.buttonContainer}
            title="Add pictures to your request"
            onPress={this.takeAPicture}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
=======
					</View>

					<Button title="Add pictures to your request" onPress={this.takeAPicture} />

					<TouchableHighlight
						style={styles.buttonContainer}
						onPress={() => this.props.navigation.navigate('Login')}
					>
						<Text>Login</Text>
					</TouchableHighlight>

					<TouchableHighlight
						style={styles.buttonContainer}
						onPress={() => this.props.navigation.navigate('Register')}
					>
						<Text>Create an account</Text>
					</TouchableHighlight>
				</View>
			</KeyboardAwareScrollView>
		);
	}
>>>>>>> 08944862566ba71d32c7467ad602ecb2dc724552
}

const styles = StyleSheet.create({
	container       : {
		flex            : 1,
		justifyContent  : 'center',
		alignItems      : 'center',
		backgroundColor : '#ebebeb'
	},
	required        : {
		fontSize : 10,
		margin   : 2
	},
	textStyle       : {
		textAlign : 'left'
	},
	inputs          : {
		borderBottomColor : '#F5FCFF',
		backgroundColor   : '#FFFFFF',
		borderRadius      : 5,
		borderBottomWidth : 1,
		width             : 250,
		height            : 40,
		marginBottom      : 20,
		flexDirection     : 'row',
		alignItems        : 'center'
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
	}
});
