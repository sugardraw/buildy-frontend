import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import UploadAvatar from "./UploadAvatar";

import { api } from "../../api/api";
import axios from "axios";
import JWT from "expo-jwt";
const config = require("../../config/config.js");
import deviceStorage from "../../services/deviceStorage";

export default class EditUserProfile extends React.Component {
  static navigationOptions = {
    headerStyle: { backgroundColor: "#white" },
    headerTintColor: "#85c4ea"
  };

  constructor(props) {
    super(props);
    this.state = {
      avatar: "",
      first_name: "",
      last_name: "",
      email: "",
      city: "",
      street: "",
      zip: "",
      id: ""
    };
    this.updatedUser = null;
  }

  componentDidMount = async () => {
    let value = this.props.navigation.getParam("changeScreen");
    console.log(value);
    const token = await AsyncStorage.getItem("id_token");
    const decodedJwt = JWT.decode(token, config.SECRET_TOKEN);
    const id = decodedJwt.sub;
    this.setState({
      id: id
    });
  };
  onChangeValue = (key, val) => {
    console.log(this.props.navigation.getParam("changeScreen"));
    this.setState({ [key]: val });
  };

  submit = () => {
    const user = this.state;
    const id = this.state.id;
    axios
      .post(api + `/api/user/update?id=${id}`, user)
      .then(response => {
        this.updatedUser = response.data;
        deviceStorage.deleteItem("avatar");
        deviceStorage.saveItem("avatar", response.data.data.avatar);
        let param = this.props.navigation.getParam("changeScreen");
        if (param === 1) {
          this.props.navigation.navigate("Welcome", {
            updatedUser: response,
            changeScreen: 0
          });
        }
        if (param === 0) {
          this.props.navigation.navigate("Welcome", {
            updatedUser: response,
            changeScreen: 1
          });
        }
      })
      .catch(err =>
        this.setState({
          error: err
        })
      );
  };

  getUri = uri => {
    console.log(uri);
    this.setState({ avatar: uri });
  };

  render() {
    return (
      <KeyboardAwareScrollView
        ref="scrollView"
        contentContainerStyle={styles.scrollstyle}
      >
        <View style={styles.bodyContentProfile}>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: -20
            }}
          >
            <UploadAvatar
              getUri={this.getUri}
              payloadKey="avatar"
              endpoint={api + "/api/user/update?id=" + this.state.id}
              callbackUrl="https://cdn.pixabay.com/photo/2017/08/16/00/29/add-person-2646097_960_720.png"
            />

            <View style={styles.inputsBlock}>
              <TextInput
                placeholder="first name"
                style={styles.inputField}
                underlineColorAndroid="transparent"
                value={this.state.first_name}
                onChangeText={value => this.onChangeValue("first_name", value)}
              />
              <TextInput
                style={styles.inputField}
                placeholder="last name"
                underlineColorAndroid="transparent"
                value={this.state.last_name}
                onChangeText={value => this.onChangeValue("last_name", value)}
              />
              <TextInput
                style={styles.inputField}
                placeholder="email"
                underlineColorAndroid="transparent"
                value={this.state.email}
                onChangeText={value => this.onChangeValue("email", value)}
              />
              <TextInput
                style={styles.inputField}
                placeholder="city"
                underlineColorAndroid="transparent"
                value={this.state.city}
                onChangeText={value => this.onChangeValue("city", value)}
              />
              <TextInput
                style={styles.inputField}
                underlineColorAndroid="transparent"
                placeholder="street"
                value={this.state.street}
                onChangeText={value => this.onChangeValue("street", value)}
              />
              <TextInput
                style={styles.inputField}
                underlineColorAndroid="transparent"
                placeholder="zip"
                value={this.state.zip}
                onChangeText={value => this.onChangeValue("zip", value)}
              />
            </View>
          </View>
          {/* 		))
					) : null} */}

          <View style={styles.paragraphText}>
            <TextInput
              placeholder="first name"
              style={styles.inputField}
              underlineColorAndroid="transparent"
              value={this.state.first_name}
              onChangeText={value => this.onChangeValue("first_name", value)}
            />
            <TextInput
              style={styles.inputField}
              placeholder="last name"
              underlineColorAndroid="transparent"
              value={this.state.last_name}
              onChangeText={value => this.onChangeValue("last_name", value)}
            />
            <TextInput
              style={styles.inputField}
              placeholder="email"
              underlineColorAndroid="transparent"
              value={this.state.email}
              onChangeText={value => this.onChangeValue("email", value)}
            />
            <TextInput
              style={styles.inputField}
              placeholder="city"
              underlineColorAndroid="transparent"
              value={this.state.city}
              onChangeText={value => this.onChangeValue("city", value)}
            />
            <TextInput
              style={styles.inputField}
              underlineColorAndroid="transparent"
              placeholder="street"
              value={this.state.street}
              onChangeText={value => this.onChangeValue("street", value)}
            />
            <TextInput
              style={styles.inputField}
              underlineColorAndroid="transparent"
              placeholder="zip"
              value={this.state.zip}
              onChangeText={value => this.onChangeValue("zip", value)}
            />
          </View>
        </View>

        <TouchableOpacity onPress={this.submit} style={styles.button}>
          <Text style={styles.text}>SAVE</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  bodyContentProfile: {
    margin: 20,
    padding: 20
  },
  scrollStyle: {
    flexGrow: 1
  },
  inputsBlock: {
    marginTop: 20
  },
  button: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    margin: 5,
    borderRadius: 5,
    marginTop: 30,
    bottom: 10,
    backgroundColor: "#85c4ea",
    marginBottom: 10
  },
  value: {
    color: "white"
  },
  inputField: {
    width: 250,
    fontSize: 14,
    fontWeight: "800",
    margin: 5,
    padding: 10,
    backgroundColor: "white"
  }
});
