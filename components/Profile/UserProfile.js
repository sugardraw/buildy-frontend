import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  AsyncStorage,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Button } from "react-native-elements";
import { Font } from "expo";
import axios from "axios";
const config = require("../../config/config.js");
import { api } from "../../api/api";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import JWT from "expo-jwt";
import { MaterialIcons, AntDesign } from "@expo/vector-icons/";

export default class UserProfile extends React.Component {
  static navigationOptions = {
    headerStyle: { backgroundColor: "#white" },
    headerTintColor: "#85c4ea"
  };

  constructor() {
    super();
    this.state = {
      id_token: null,
      _fontLoaded: false,
      user: [],
      avatar: "",
      estimations: []
    };
  }

  logOut = () => {
    alert("logOut");
    console.log("logOut");
  };

  componentDidMount = async () => {
    await Font.loadAsync({
      "Roboto-Black": require("../../assets/fonts/Roboto-Black.ttf"),
      "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
      "Roboto-Light": require("../../assets/fonts/Roboto-Light.ttf")
    });
    const token = await AsyncStorage.getItem("id_token");
    const decodedJwt = JWT.decode(token, config.SECRET_TOKEN);
    const id = decodedJwt.sub;
    this.setState({ _fontLoaded: true, id_token: id });
    await axios
      .get(api + "/api/user/showDetails?id=" + id)
      .then(response => {
        this.setState({
          user: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });

    await axios
      .get(api + "/api/user/request/getAll?id=" + id)
      .then(response => {
        this.setState({
          estimations: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.main}>
          {this.state._fontLoaded && this.state.user.length > 0
            ? this.state.user.map((user, i) => (
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                  key={i}
                >
                  <View>
                    <Image
                      source={{ uri: user.avatar }}
                      style={{
                        width: 130,
                        height: 130,
                        borderRadius: 50,
                        margin: 30
                      }}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        fontFamily: "Roboto-Black",
                        fontSize: 22,
                        padding: 3
                      }}
                    >
                      {user.first_name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Roboto-Medium",
                        fontSize: 14,
                        padding: 3
                      }}
                    >
                      {user.last_name}
                    </Text>
                  </View>

                  <View style={styles.paragraphText}>
                    <Text style={styles.infoText}>{user.street}</Text>
                    <Text style={styles.infoText}>{user.zip}</Text>
                    <Text style={styles.infoText}>{user.city}</Text>
                    <Text style={styles.infoText}>{user.email}</Text>
                  </View>

                  <View style={[styles.paragraphText, styles.infoText]}>
                    <Text
                      style={[
                        styles.infoText,
                        { fontWeight: "bold", fontSize: 20 }
                      ]}
                    >
                      Your Requests
                    </Text>
                    {this.state.estimations.length > 0 ? (
                      this.state.estimations.map((estimation, i) => (
                        <View
                          key={i}
                          style={{
                            paddingRight: 2,
                            marginRight: 2,
                            marginBottom: 5
                          }}
                        >
                          <Text style={styles.estimationsList}>
                            Title:{estimation.requestData.title}
                          </Text>
                          <Text style={styles.estimationsList}>
                            Description:{estimation.requestData.description}
                          </Text>
                          <Text style={styles.estimationsList}>
                            Budget:{estimation.requestData.budget}
                          </Text>
                          <Text style={styles.estimationsList}>
                            Start date:{estimation.requestData.date}
                          </Text>

                          <Text style={styles.estimationsList}>
                            Send To:
                            <Text style={{ fontWeight: "bold" }}>
                              {" " + estimation.sendTo}
                            </Text>
                          </Text>
                        </View>
                      ))
                    ) : (
                      <Text>No estimations requested</Text>
                    )}
                  </View>
                  <View style={styles.buttons}>
                    <View style={styles.button}>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate("EditUserProfile", {
                            changeScreen: this.props.navigation.getParam(
                              "changeScreen"
                            )
                          })
                        }
                      >
                        <MaterialIcons
                          name="mode-edit"
                          size={30}
                          color="white"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))
            : null}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    margin: 10,
    borderRadius: 10,
    borderColor: "#85c4ea",
    borderWidth: 2
  },
  infoText: {
    fontFamily: "Roboto-Light",
    textAlign: "left",
    color: "#0ec485",
    fontSize: 16
  },
  buttons: {
    flexDirection: "row",
    marginRight: 15,
    alignSelf: "flex-end"
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    borderWidth: 1,
    borderRadius: 50,
    margin: 5,
    marginTop: 30,
    width: 50,
    height: 50,
    bottom: 10,
    backgroundColor: "#85c4ea",
    marginBottom: 10,
    borderColor: "#85c4ea"
  },
  paragraphText: {
    marginLeft: 20,
    width: 300,
    margin: 10
  },
  estimationsList: {
    textAlign: "left",
    color: "#0ec485"
  }
});
