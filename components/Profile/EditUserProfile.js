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

export default class EditUserProfile extends React.Component {
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
          <Text>EDIT USER PROFILE</Text>

          <UploadAvatar
            payloadKey='file'
            endpoint='http://10.0.1.196:3001/api/user/save_avatar'
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