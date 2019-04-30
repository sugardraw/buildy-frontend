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
import { Font } from "expo";
import axios from "axios";
const config = require("../../config/config.js");
import { api } from "../../api/api";
import JWT from "expo-jwt";
import { MaterialIcons } from "@expo/vector-icons/";
import { Divider } from "react-native-elements";

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
    console.log(decodedJwt.sub);
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
      <View>
        <ScrollView ref="scrollView">
          <View style={styles.bodyContentProfile}>
            {this.state._fontLoaded && this.state.user.length > 0
              ? this.state.user.map((user, i) => (
                  <View key={i}>
                    <View style={styles.main}>
                      <Image
                        source={{ uri: user.avatar }}
                        style={{
                          width: 130,
                          height: 130,
                          borderRadius: 70,
                          shadowOffset: { width: 1, height: 1 },
                          shadowRadius: 2,
                          shadowOpacity: 0.5
                        }}
                      />
                      <View style={{ flexDirection: "row", marginTop: 15 }}>
                        <Text
                          style={{
                            fontFamily: "Roboto-Black",
                            fontSize: 20,
                            marginRight: 2,
                            paddingRight: 2
                          }}
                        >
                          {user.first_name}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Roboto-Black",
                            fontSize: 20,
                            marginRight: 2,
                            paddingRight: 2
                          }}
                        >
                          {user.last_name}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.paragraphText}>
                      <Text style={styles.servicesList}>Contact</Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ marginRight: 2, paddingRight: 2 }}>
                          {user.street}
                        </Text>
                        <Text>{user.zip}</Text>
                        <Text>{user.city}</Text>
                      </View>
                      <Text>{user.email}</Text>
                    </View>

                    <View style={styles.paragraphText}>
                      <Text style={styles.servicesList}>Your Requests</Text>
                      {this.state.estimations.length > 0 ? (
                        this.state.estimations.map((estimation, i) => (
                          <View key={i}>
                            <Text style={styles.estimationsList}>
                              Send To:
                              <Text style={{ fontWeight: "bold" }}>
                                {" " + estimation.sendTo}
                              </Text>
                            </Text>
                            <Text style={styles.estimationsList}>
                              Title: {estimation.requestData.title}
                            </Text>
                            <Text style={styles.estimationsList}>
                              Description: {estimation.requestData.description}
                            </Text>
                            <Text style={styles.estimationsList}>
                              Budget: {estimation.requestData.budget}
                            </Text>
                            <Text style={styles.estimationsList}>
                              Start date: {estimation.requestData.date}
                            </Text>
                            <Divider style={styles.divider} />
                          </View>
                        ))
                      ) : (
                        <Text>No estimations requested</Text>
                      )}
                    </View>
                  </View>
                ))
              : null}
          </View>
        </ScrollView>

        <View style={styles.buttons}>
          <View style={styles.buttonEdit}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("EditUserProfile", {
                  changeScreen: this.props.navigation.getParam("changeScreen")
                })
              }
            >
              <MaterialIcons name="mode-edit" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollStyle: {
    flexGrow: 1
  },
  bodyContentProfile: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    margin: 0
  },
  main: {
    alignItems: "center"
  },
  servicesList: {
    textAlign: "justify",
    fontWeight: "bold",
    fontSize: 18,
    color: "#0ec485"
  },
  paragraphText: {
    textAlign: "justify",
    marginTop: 15
  },
  buttons: {
    flexDirection: "row",
    alignSelf: "flex-end",
    position: "absolute",
    marginTop: 490,
    marginRight: 10
  },
  buttonEdit: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    borderRadius: 50,
    width: 50,
    height: 50,
    backgroundColor: "#85c4ea"
  },
  estimationsList: {
    textAlign: "left",
    color: "#000000"
  },
  divider: {
    height: 3,
    width: 100,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#0ec485"
  }
});
