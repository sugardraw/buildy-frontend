import React from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Button,
  TouchableHighlight
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
/* import Camera from "../AdvancedCamera/AdvancedCamera"; */

export default class RequestFormular extends React.Component {
  static navigationOptions = {
    headerTransparent: true,
    headerTintColor: "black",
    headerTitleStyle: { color: "black" }
  };
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      budget: "",
      date: "",
      height: 10,
      renderCamera: false
    };
  }

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
          date: this.state.date
        }
      });
    }
  };

  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={styles.container}>
          <Text>CONTACT FORM</Text>
          <Text style={styles.required} />

          <Text style={{ color: "red" }}>{this.state.Error}</Text>
          <Text>Give a title to your request</Text>
          <TextInput
            style={styles.inputs}
            placeholder="Paint dinning room"
            underlineColorAndroid="transparent"
            onChangeText={editedText => this.setState({ title: editedText })}
          />

          <Text>Description</Text>
          <TextInput
            placeholder="Describe your ideas"
            multiline={true}
            underlineColorAndroid="transparent"
            value={this.state.description}
            onChangeText={editedText =>
              this.setState({ description: editedText })
            }
            onContentSizeChange={e =>
              this.setState({ height: e.nativeEvent.contentSize.height + 20 })
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
            onChangeText={editedText => this.setState({ budget: editedText })}
          />

          <Text>Wenn will you start?</Text>
          <TextInput
            style={styles.inputs}
            placeholder="03/05/2020"
            underlineColorAndroid="transparent"
            onChangeText={editedText => this.setState({ date: editedText })}
          />

          <Button
            title="Add pictures to your request"
            onPress={this.takeAPicture}
          />

          <TouchableHighlight
            style={styles.buttonContainer}
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text>Login</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.buttonContainer}
            onPress={() => this.props.navigation.navigate("Register")}
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ebebeb"
  },
  required: {
    fontSize: 10,
    margin: 2
  },
  textStyle: {
    textAlign: "left"
  },
  inputs: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    borderBottomWidth: 1,
    width: 250,
    height: 40,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    margin: 4,
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#85c4ea",
    maxHeight: 100,
    alignSelf: "center"
  }
});
