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
import UploadGallery from '../Profile/UploadGallery';
import UploadImage from "../Profile/UploadImage";

export default class Profile extends React.Component {
  // static navigationOptions = {
  //   title: "About Us",
  //   headerStyle: { backgroundColor: "#173746" },
  //   headerTintColor: "white",
  //   headerTitleStyle: { color: "white" }
  // };
  render() {
    return (
      <KeyboardAwareScrollView
        ref="scrollView"
        contentContainerStyle={styles.scrollstyle}
      >
        <View>
          <Text>EDIT PROFILE</Text>

          <UploadImage
            payloadKey='file'
            endpoint='http://10.0.1.195:3001/api/user/save_gallery'
            callbackUrl='https://justice.org.au/wp-content/uploads/2017/08/avatar-icon.png'
          />

          <View style={styles.bodyContentProfile}>
            <TextInput
              style={styles.firstname}
              placeholder="name"
              underlineColorAndroid="transparent"
            >
            </TextInput>
            <TextInput
              style={styles.shortDescription}
              placeholder="Describe your services"
              underlineColorAndroid="transparent"
            >
            </TextInput>
            <TextInput
              style={styles.longDescription}
              placeholder="Describe"
              underlineColorAndroid="transparent"
              multiline={true}
            >
            </TextInput>
            <TextInput
              style={styles.longDescription}
              placeholder="Describe"
              underlineColorAndroid="transparent"
              multiline={true}
            >
            </TextInput>
            <UploadGallery
              payloadKey='file'
              endpoint='http://10.0.1.195:3001/api/user/save_gallery'
              callbackUrl='https://cdn0.iconfinder.com/data/icons/basic-outline/64/icon-basic-set_12-camera-512.png'
            />
          </View>
          {/* <Button
            title="SAVE"

          /> */}
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  bodyContentProfile: {
    margin: 10,
    alignItems: "center",
    backgroundColor: 'white'
  },
  scrollStyle: {
    flexGrow: 1,
    backgroundColor: 'yellow'
  },
  username: {
    fontSize: 15,
    fontWeight: "800",
    margin: 10,
    backgroundColor: 'white'
  },
  shortDescription: {
    fontSize: 13,
    backgroundColor: 'white'
  },
  longDescription: {
    fontSize: 11,
    padding: 10,
    backgroundColor: 'white'
  }
});