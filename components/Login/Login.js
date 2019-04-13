import React, { Component } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Alert
} from "react-native";
import ShowPassword from "./ShowPassword";
import { api } from "../../api/api";

export default class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userLoggedIn: false
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam("HeaderTitle", "BUILDY"),
      headerStyle: {
        backgroundColor: navigation.getParam("BackgroundColor", "#E050FB")
      },
      headerTintColor: navigation.getParam("HeaderTintColor", "#fff"),
      headerTitleStyle: {
        color: navigation.getParam("Color", "#fff")
      }
    };
  };

  changeHeader = isLogged => {
    if (!isLogged) {
      this.props.navigation.setParams({
        HeaderTitle: (
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Welcome")}
          >
            <Image
              style={{
                width: 50,
                height: 50,
                margin: 10,
                marginTop: 15,
                marginBottom: 15
              }}
              source={require("../../assets/logo/buildy-logo-final_header-2.png")}
            />
          </TouchableOpacity>
        ),
        BackgroundColor: "#fff",
        HeaderTintColor: "#fff"
      });
    } else {
      this.props.navigation.setParams({
        HeaderTitle: (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <Image
              style={{
                width: 50,
                height: 50,
                margin: 10,
                marginLeft: 12,
                marginTop: 15,
                marginBottom: 15
              }}
              source={require("../../assets/logo/buildy-logo-final_header-2.png")}
            />
            <TouchableOpacity
              style={{
                margin: 4,
                padding: 5,
                borderRadius: 50,
                borderWidth: 2,
                borderColor: "#85c4ea",
                maxHeight: 100,
                alignSelf: "center",
                marginLeft: 228
              }}
              onPress={() => this.props.navigation.navigate("UserProfile")}
            >
              <Text style={{ color: "#85c4ea" }}>AVATAR</Text>
            </TouchableOpacity>
          </View>
        ),
        BackgroundColor: "#fff",
        HeaderTintColor: "#fff"
      });
    }
  };

  componentDidMount() {
    console.log(this.state.userLoggedIn);
    this.changeHeader(this.state.userLoggedIn);
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };

  onClickListener = viewId => {
    Alert.alert("Alert", "Button pressed " + viewId);
  };

  login = () => {
    console.log(this.state.email, this.state.password);
    return axios
      .post(api + "/api/user/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        this.setState({
          loggedIn: true
        });
        return response;
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={{
              uri: "https://png.icons8.com/message/ultraviolet/50/3498db"
            }}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            onChangeText={email => this.setState({ email })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={{
              uri: "https://png.icons8.com/key-2/ultraviolet/50/3498db"
            }}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            onChangeText={password => this.setState({ password })}
          />
          {/* <ShowPassword /> */}
        </View>
        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.login()}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        <Text style={{ color: "#85c4ea" }}>Are you already registered?</Text>

        <View
          style={{
            display: "flex"
          }}
        >
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.props.navigation.navigate("UsersignUp")}
          >
            <Text style={{ color: "#85c4ea" }}>Register as user</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.props.navigation.navigate("SignUp")}
          >
            <Text style={{ color: "#85c4ea" }}>Register as professional</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    borderBottomWidth: 1,
    width: 250,
    height: 50,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  inputs: {
    height: 50,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center"
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
  },
  loginButton: {
    backgroundColor: "#00b5ec"
  },
  loginText: {
    color: "white"
  }
});
