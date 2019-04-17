import React from "react";
import { View, Text, StyleSheet, Image, AsyncStorage } from "react-native";
import { Button } from "react-native-elements";
import { Font } from "expo";
import axios from "axios";
const config = require("../../config/config.js");
import { api } from "../../api/api";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import JWT from "expo-jwt";

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
      avatar: ""
    };
  }

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
    axios
      .get(api + "/api/user/showDetails?id=" + id)
      .then(response => {
        this.setState({
          user: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    return (
      <KeyboardAwareScrollView
        ref="scrollView"
        contentContainerStyle={styles.scrollstyle}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            marginTop: 70
          }}
        >
          <View style={styles.bodyContentProfile}>
            {this.state._fontLoaded && this.state.user.length > 0
              ? this.state.user.map((user, i) => (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                    key={i}
                  >
                    <View style={styles.main}>
                      <Image
                        source={{ uri: user.avatar }}
                        style={{ width: 130, height: 130, borderRadius: 50 }}
                      />

                      <Text
                        style={{
                          fontFamily: "Roboto-Black",
                          fontSize: 22,
                          padding: 10
                        }}
                      >
                        {user.first_name}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "Roboto-Medium",
                          fontSize: 14,
                          padding: 10
                        }}
                      >
                        {user.last_name}
                      </Text>
                    </View>
                    <View style={styles.paragraphText} />
                    <View
                      style={[
                        styles.paragraphText,
                        {
                          fontFamily: "Roboto-Light"
                        }
                      ]}
                    >
                      <Text style={[styles.servicesList, { fontSize: 20 }]}>
                        Description
                      </Text>
                      <Text>{user.longDescription}</Text>
                    </View>
                    <View style={styles.paragraphText}>
                      <Text style={[styles.servicesList, { fontSize: 20 }]}>
                        Contact
                      </Text>
                      <Text style={styles.infoText}>{user.street}</Text>
                      <Text style={styles.infoText}>{user.zip}</Text>
                      <Text style={styles.infoText}>{user.city}</Text>
                      <Text style={styles.infoText}>{user.email}</Text>
                    </View>
                    <View style={styles.button}>
                      <Button
                        buttonStyle={{
                          backgroundColor: "#85c4ea"
                        }}
                        title="EDIT YOUR PROFILE"
                        onPress={() =>
                          this.props.navigation.navigate("EditUserProfile")
                        }
                      />
                    </View>
                  </View>
                ))
              : null}
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  bodyContentProfile: {
    margin: 10,
    alignItems: "center",
    backgroundColor: "white"
  },
  main: {
    alignItems: "center",
    borderRadius: 10,
    width: "90%",
    height: "50%",
    shadowColor: "#85c4ea",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 4
  },
  scrollStyle: {
    flexGrow: 1
  },
  infoText: {
    fontFamily: "Roboto-Light",
    textAlign: "left",
    alignSelf: "flex-start",
    color: "#0ec485"
  },
  button: {
    alignSelf: "center",
    position: "relative",
    bottom: 20,
    width: "90%"
  }
});
