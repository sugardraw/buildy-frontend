import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Alert,
  Linking
} from "react-native";

import { api } from "../../api/api";

import { ImagePicker, Permissions } from "expo";
import uid from "uuid/v4";

export default class UploadAvatar extends React.Component {
  constructor(props) {
    super(props);
    this.askPermission = this.askPermission.bind(this);
    this.showAlert = this.showAlert.bind(this);
    this.endpointTest = api + "/api/user/save_avatar";
    this.state = {
      endpoint: this.props.endpoint,
      payloadKey: this.props.payloadKey ? this.props.payloadKey : null,
      token: this.props.token ? this.props.token : null,
      callbackUrl: this.props.callbackUrl ? this.props.callbackUrl : null,
      loading: false
    };
    defaultProps = {
      onSuccess: undefined,
      onFailure: undefined,
      onStartUpload: undefined,
      alertTitle: "Please allow access",
      alertMessage: [
        "This application needs access to your library",
        "/n/n",
        "Please setting your device and grant permission to photos library"
      ].join(""),
      alertNo: "Not now",
      alertYes: "Setting"
    };
  }

  async askPermission() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { onStartUpload } = this.props;
    if (status !== "granted") {
      if (Platform.OS === "ios") this.showAlert();
      return;
    }
  }

  showAlert() {
    const { alertMessage, alertTitle, alertYes, alertNo } = this.props;
    Alert.alert(
      "Please allow access",
      [
        "This application needs access to your library to upload images",
        "/n/n",
        "Please setting your device and grant permission to photos"
      ].join(""),
      [
        { text: "Not now", style: "cancel" },
        { text: "Setting", onPress: () => Linking.openURL("app-settings") }
      ]
    );
  }

  uploadResult = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { onStartUpload } = this.props;
    if (status !== "granted") {
      if (Platform.OS === "ios") this.showAlert();
      return;
    }
    Expo.ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images"
    }).then(result => {
      const file = result.uri;
      if (!result.cancelled) {
        this.setState({
          loading: true
        });
        uploadResponse = this.uploadImageAsync(result.uri).then(response => {
          this.setState({
            loading: false,
            uploaded_photo: file
          });
        });
      }
    });
  };

  async uploadImageAsync(uri) {
    const endpoint = this.state.endpoint;
    const payloadKey = this.state.payloadKey;
    const uriParts = uri.split(".");
    const fileType = uriParts[uriParts.length - 1];

    const formData = new FormData();
    formData.append(payloadKey, {
      uri,
      name: uid(),
      type: `image/${fileType}`
    });

    this.props.getUri(uri);

    return await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
      },
      body: formData
    })
      .then(response => {
        response.json().then(data => console.log(data));
      })
      .catch(err => console.log(err))
      .done();
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={[style.container]}>
          <ActivityIndicator size="large" color="green" />
        </View>
      );
    }
    return (
      <View style={style.imageWrapper}>
        <TouchableOpacity
          style={style.circleWrapper}
          onPress={() => {
            this.uploadResult();
          }}
        >
          {this.props.callbackUrl != null ? (
            <Image
              source={{
                uri: this.state.uploaded_photo
                  ? this.state.uploaded_photo
                  : this.props.callbackUrl
              }}
              style={{ width: 130, height: 130, borderRadius: 70 }}
            />
          ) : (
            <Image
              source={{
                uri:
                  "https://cdn.pixabay.com/photo/2017/08/16/00/29/add-person-2646097_960_720.png"
              }}
              style={{ width: 130, height: 130, borderRadius: 70 }}
            />
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    height: 30,
    width: 30
  },
  imageWrapper: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    margin: 25
  },

  circleWrapper: {
    borderRadius: 70,
    marginTop: -10,
    shadowColor: "#85c4ea",
    shadowOffset: { width: 20, height: 20 },
    shadowOpacity: 0.6,
    shadowRadius: 40,
    elevation: 6
  }
});
