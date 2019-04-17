import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import UploadAvatar from "./UploadAvatar";

import { api } from "../../api/api";
import axios from "axios";
import JWT from "expo-jwt";
const config = require("../../config/config.js");

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
      zip: ""
    };
    this.id = null;
  }

  componentDidMount = async () => {
    const token = await AsyncStorage.getItem("id_token");
    const decodedJwt = JWT.decode(token, config.SECRET_TOKEN);
    const id = decodedJwt.sub;
    this.id = id;

    axios
      .post(api + "/api/user/updateDetails?id=" + id, this.state)
      .then(response => {
        if (response.data) {
          this.props.navigation.navigate("UserProfile", {
            data: response.data
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  submit = () => {
    const id = this.id;
    axios
      .post(api + `/api/user/update?id=${id}`, this.state)
      .then(response =>
        this.setState({
          response: response
        })
      )
      .catch(err =>
        this.setState({
          error: err
        })
      );
  };

  _uploadImageAsyncTest = async uri => {
    const uriParts = uri.split(".");
    const fileType = uriParts[uriParts.length - 1];
    const takeAvatar = new takeAvatar();
    takeAvatar.append("uploadAvatar", {
      user: this.id,
      editedAvatar: {
        uri,
        name: "updating-avatar" + uid(),
        type: `image/${filetype}`
      },
      avatar: this.state.avatar
    });
    return await fetch(api + "/api/user/update", {
      method: "POST",
      body: JSON.stringify(formData)
    })
      .then(response => console.log("returned something"))
      .catch(err => console.log(err))
      .done();
  };

  render() {
    return (
      <KeyboardAwareScrollView
        ref="scrollView"
        contentContainerStyle={styles.scrollstyle}
      >
        <View style={styles.bodyContentProfile}>
          <View>
            <UploadAvatar
              payloadKey="file"
              endpoint={api + "/api/user/save_avatar"}
              callbackUrl="https://cdn.pixabay.com/photo/2017/08/16/00/29/add-person-2646097_960_720.png"
            />
            <TextInput
              style={styles.inputField}
              placeholder="Firstname"
              underlineColorAndroid="transparent"
              value={this.state.first_name}
              onChangeText={editedText =>
                this.setState({ first_name: editedText })
              }
            />
            <TextInput
              style={styles.inputField}
              placeholder="Lastname"
              underlineColorAndroid="transparent"
              value={this.state.last_name}
              onChangeText={editedText =>
                this.setState({ last_name: editedText })
              }
            />
            <TextInput
              style={styles.inputField}
              placeholder="Email"
              underlineColorAndroid="transparent"
              value={this.state.email}
              onChangeText={editedText => this.setState({ email: editedText })}
            />
            <TextInput
              style={styles.inputField}
              placeholder="City"
              underlineColorAndroid="transparent"
              value={this.state.city}
              onChangeText={editedText => this.setState({ city: editedText })}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Street"
              underlineColorAndroid="transparent"
              value={this.state.street}
              onChangeText={editedText => this.setState({ street: editedText })}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Zip"
              underlineColorAndroid="transparent"
              value={this.state.zip}
              onChangeText={editedText => this.setState({ zip: editedText })}
            />
          </View>

          <TouchableOpacity onPress={this.submit} style={styles.button}>
            <Text style={styles.text}>SAVE</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  bodyContentProfile: {
    margin: 20,
    padding: 20,
    alignItems: "center"
  },
  scrollStyle: {
    flexGrow: 1
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
  text: {
    color: "white"
  },
  inputField: {
    width: 200,
    fontSize: 14,
    fontWeight: "800",
    margin: 5,
    padding: 10,
    backgroundColor: "white"
  }
});
