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

import { ImagePicker, Permissions } from "expo";
import uid from "uuid/v4";

export default class UploadAvatar extends React.Component {
  constructor(props) {
    super(props);
    this.askPermission = this.askPermission.bind(this);
    this.showAlert = this.showAlert.bind(this);
    this.endpointTest = "http://10.0.1.196:3001/api/user/save_avatar";
    this.state = {
      endpoint: this.endpointTest ? this.endpointTest : null,
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
    const uriParts = uri.split(".");
    const fileType = uriParts[uriParts.length - 1];
    const { headers } = this.props;
    const endpoint = this.state.endpoint;
    const payloadKey = this.state.payloadKey;
    const method = "POST";
    const formData = new FormData();
    formData.append(payloadKey, {
      uri,
      name: uid(),
      type: `image/${fileType}`
    });
    const options = {
      method,
      body: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
      }
    };
    return fetch(endpoint, options);
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={[style.container]}>
          <ActivityIndicator size="large" color="yellow" />
        </View>
      );
    }
    return (
      <View style={style.imageWrapper}>
        {this.props.callbackUrl != null ? (
          <Image
            source={{
              uri: this.state.uploaded_photo
                ? this.state.uploaded_photo
                : this.props.callbackUrl
            }}
            style={{ width: 80, height: 80, borderRadius: 50 }}
          />
        ) : (
          <Image
            source={{
              uri:
                "https://justice.org.au/wp-content/uploads/2017/08/avatar-icon.png"
            }}
            style={{ width: 80, height: 80, borderRadius: 50 }}
          />
        )}
        <TouchableOpacity
          style={style.circleWrapper}
          onPress={() => {
            this.uploadResult();
          }}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
    height: 30,
    width: 30
  },
  imageWrapper: {
    marginBottom: 80,
    position: "relative",
    justifyContent: "center",
    alignItems: "center"
  },
  circleWrapper: {
    backgroundColor: "#ffffff",
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: "black",
    borderRadius: 50,
    marginLeft: 60,
    marginTop: -60
  }
});
