import React from "react";
import {
  Button,
  View,
  Text,
  Image,
  TextInput,
  StyleSheet
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import UploadAvatar from "./UploadAvatar";

import { api } from "../../api/api";
import axios from "axios";

export default class EditUserProfile extends React.Component {
  static navigationOptions = {
    title: "Edit User Porfile",
    headerStyle: { backgroundColor: "#173746" },
    headerTintColor: "white",
    headerTitleStyle: { color: "white" }
  };

  constructor(props) {
    super(props);
    this.state = {
      avatar: {},
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    }
  }

  submit = () => {
    const id = "5cab33b9eb40ce2ba0697c6a"
    axios.post(api + `/api/user/update?id=${id}`, this.state)
      .then(response => this.setState({
        response: response
      }))
      .catch(err => this.setState({
        error: err
      }))
  }

  _uploadImageAsyncTest = async uri => {
    const uriParts = uri.split(".");
    const fileType = uriParts[uriParts.length - 1];

    const takeAvatar = new takeAvatar();

    takeAvatar.append("uploadAvatar", {
      user: "5cab33b9eb40ce2ba0697c6a",
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
    console.log(this.state.response, this.state.error)

    return (
      <KeyboardAwareScrollView
        ref="scrollView"
        contentContainerStyle={styles.scrollstyle}
      >
        <Text>edit user profile</Text>
        <View style={styles.bodyContentProfile}>
          <View >
            <UploadAvatar
              payloadKey='file'
              endpoint={api + '/api/user/save_avatar'}
              callbackUrl='https://cdn.pixabay.com/photo/2017/08/16/00/29/add-person-2646097_960_720.png'
            />
            <TextInput
              style={styles.inputField}
              placeholder="Firstname"
              underlineColorAndroid="transparent"
              value={this.state.first_name}
              onChangeText={editedText =>
                this.setState({ first_name: editedText })
              }
            >

            </TextInput>
            <TextInput
              style={styles.inputField}
              placeholder="Lastname"
              underlineColorAndroid="transparent"
              value={this.state.last_name}
              onChangeText={editedText =>
                this.setState({ last_name: editedText })
              }
            >
            </TextInput>
            <TextInput
              style={styles.inputField}
              placeholder="Email"
              underlineColorAndroid="transparent"
              value={this.state.email}
              onChangeText={editedText =>
                this.setState({ email: editedText })
              }
            >
            </TextInput>
            <TextInput
              style={styles.inputField}
              placeholder="Password"
              underlineColorAndroid="transparent"
              multiline={true}
              value={this.state.password}
              onChangeText={editedText =>
                this.setState({ password: editedText })
              }
            >
            </TextInput>
          </View>
          <Button
            title="Save"
            autoFocus={true}
            onPress={this.submit}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  bodyContentProfile: {
    margin: 40,
    padding: 20,
    alignItems: "center"
  },
  scrollStyle: {
    flexGrow: 1
  },
  inputField: {
    width: 200,
    fontSize: 14,
    fontWeight: "800",
    margin: 5,
    padding: 10,
    backgroundColor: 'white'
  }
});