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
          <Text style={styles.required}></Text>

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
<<<<<<< HEAD
            title="Add pictures to your request"
            onPress={this.takeAPicture}
          />
=======
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
>>>>>>> 5f52bb67977a737482710faeb02bd122e5736d65

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
