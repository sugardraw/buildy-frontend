import React from "react";
import axios from "axios";
import {
  Image,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Text,
  Button,
  ScrollView,
  Linking
} from "react-native";
import { FileSystem, MailComposer } from "expo";
import { Card } from "react-native-elements";
const Expo = require("expo");
import { MaterialIcons } from "@expo/vector-icons";

import { api } from "../../api/api";

class Anchor extends React.Component {
  _handlePress = () => {
    console.log("Link clicked for " + this.props.href);
    Linking.openURL(this.props.href);
    this.props.onPress && this.props.onPress();
  };

  render() {
    return <Button title={this.props.title} onPress={this._handlePress} />;
  }
}

export default class SendEmail extends React.Component {
  constructor() {
    super();
    this.state = {
      lastRequest: null,
      uploaded: false
    };
  }

  componentWillMount() {
    const id = this.props.navigation.getParam("id", "no_id");
    console.log("rendering sendEmail", id);

    // FileSystem.makeDirectoryAsync(
    //   FileSystem.documentDirectory + "emails"
    // ).catch(e => {
    //   console.log(e, "Directory exists");
    // });

    return axios
      .get(api + "/api/user/request/showLast?id=" + id)
      .then(response => {
        this.setState(state => {
          state.lastRequest = response.data;
          //   state.uploaded = !state.uploaded;
          return state;
        });
      })

      .catch(err => console.log(err));
  }

  sendAsEmail = async () => {
    let fileUri = Expo.FileSystem.documentDirectory + "test_1.html";
    await FileSystem.writeAsStringAsync(fileUri, "<h2>Hello test 1</h2>", {
      encoding: FileSystem.EncodingTypes.UTF8
    });

    await FileSystem.readAsStringAsync(
      FileSystem.documentDirectory + "test_1.html"
    ).then(result => {
      console.log("readAsStringAsync response data>>>", result);
    });

    await console.log(FileSystem.documentDirectory + "test_1.html");

    // openEmail = () => {
    //   MailComposer.composeAsync({
    //     recipient: "",
    //     subject: "Sending you the chart",
    //     body: "Hi, please find attached the chart.",
    //     attachments: [`${FileSystem.documentDirectory}ePPMC`]
    //   });
    // };
  };
  createNewReq = () => {
    alert("createReq");
  };

  keyExtractor = (item, index) => String(item._id);

  render() {
    if (this.state.lastRequest !== null) {
      return (
        <View style={styles.container}>
          <View style={styles.request_data}>
            <ScrollView
              style={{ flex: 1, marginTop: 20 }}
              contentContainerStyle={{ width: "100%", alignItems: "center" }}
            >
              <Card style={styles.infos}>
                <Text style={styles.title}>Your estimation request</Text>
                <Text style={[styles.title, styles.tagline]}>
                  review your information before you send it
                </Text>

                <View style={styles.infos}>
                  <Text>
                    Title: {this.state.lastRequest.data.requestData.title}
                  </Text>
                  <Text>
                    Description:{" "}
                    {this.state.lastRequest.data.requestData.description}
                  </Text>
                  <Text>
                    Budget: {this.state.lastRequest.data.requestData.budget}
                  </Text>
                  <Text>
                    Starting Date:{" "}
                    {this.state.lastRequest.data.requestData.date}
                  </Text>
                </View>
              </Card>
              {this.state.lastRequest.data.editedImages.map((item, index) => {
                return (
                  <TouchableWithoutFeedback key={index}>
                    <Card>
                      {console.log(item.uri)}
                      <Image
                        key={index}
                        style={{ width: 250, height: 250 }}
                        source={{ uri: item.uri }}
                      />
                    </Card>
                  </TouchableWithoutFeedback>
                );
              })}
            </ScrollView>
          </View>

          <View style={styles.buttonsField}>
            <Button
              style={styles.button}
              onPress={this.createNewReq}
              title="Create a new Request"
              color="#9FCBE5"
              accessibilityLabel="Learn more about this purple button"
            />

            <Anchor
              style={styles.button}
              title="Send"
              href="mailto://sergiousle@gmail.com"
            />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text> No data found...</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  title: {
    fontSize: 24
  },
  tagline: {
    fontSize: 12
  },
  infos: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 }
  },
  buttonsField: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: -30,
    flexDirection: "row",
    width: "100%",
    flex: 1,
    justifyContent: "space-around"
  },
  button: {
    margin: 3,
    borderBottomColor: "black",
    borderBottomWidth: 2,
    backgroundColor: "white"
  },
  request_card: {
    backgroundColor: "#fff",
    padding: 8,
    margin: 12,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  }
});
