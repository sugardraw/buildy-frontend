import React from "react";
import { View, TextInput, Text, StyleSheet, Button, TouchableHighlight } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
/* import Camera from "../AdvancedCamera/AdvancedCamera"; */

export default class RequestFormular extends React.Component {
  static navigationOptions = {
    title: "Request page",
    headerStyle: { backgroundColor: "#173746" },
    headerTintColor: "white",
    headerTitleStyle: { color: "white" }
  };
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      messageText: "",
      budget: "",
      date: "",
      height: 10,
      renderCamera: false
    };
  }

  takeAPicture = () => {
    const { messageText } = this.state;
    if (messageText == "") {
      this.setState({ Error: "Please write a message for your recipient" });
    } else {
      this.props.navigation.navigate("Camera");
    }
  };

  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={styles.container}>
          <Text>CONTACT FORM</Text>
          <Text style={styles.required}></Text>

          <Text style={{ color: "red" }}>{this.state.Error}</Text>

          <Text>Message
            <Text style={styles.required}>*required field</Text>
          </Text>
          <TextInput
            placeholder="Describe your ideas"
            multiline={true}
            underlineColorAndroid="transparent"
            value={this.state.messageText}
            onChangeText={editedText =>
              this.setState({ messageText: editedText })
            }
            onContentSizeChange={e =>
              this.setState({ height: e.nativeEvent.contentSize.height })
            }
            style={[
              styles.inputs,
              {
                height: Math.min(100, Math.max(20, this.state.height))
              }
            ]} //height limitation between 20 to 120px (change dinamycally)
          />

          <Text>Wich is your budget?</Text>
          <TextInput
            style={styles.inputs}
            placeholder="5.000 Euro"
            underlineColorAndroid="transparent"
          />

          <Text>Wenn will you start?</Text>
          <TextInput
            style={styles.inputs}
            placeholder="03/05/2020"
            underlineColorAndroid="transparent"
          />

          <Button
            title="Take a picture"
            onPress={this.takeAPicture}
          />

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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  required: {
    fontSize: 10,
    margin: 2,
  },
  inputs: {
    borderBottomColor: "black",
    borderBottomWidth: 2,
    padding: 8,
    backgroundColor: "white",
    width: 200
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
