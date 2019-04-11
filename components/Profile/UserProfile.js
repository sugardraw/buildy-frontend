import React from "react";
import {
  TouchableOpacity,
  TouchableHighlight,
  View,
  Text,
  StyleSheet,
  Image
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import UploadAvatar from "../Profile/UploadAvatar";

export default class UserProfile extends React.Component {
  static navigationOptions = {
    title: "User Profile",
    headerStyle: { backgroundColor: "#173746" },
    headerTintColor: "white",
    headerTitleStyle: { color: "white" }
  };

  constructor(props) {
    super(props);
    this.state = {
      avatar: {},
      first_name: '',
      last_name: '',
      email: ''
    }
  }

  render() {
    return (
      <KeyboardAwareScrollView
        ref="scrollView"
        contentContainerStyle={styles.scrollstyle}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View style={styles.bodyContentProfile}>
            <UploadAvatar />
            <Text
              style={styles.name}
            >
              {state.first_name}
            </Text>
            <Text
              style={styles.name}
            >
              lastname
            </Text>
            <Text>
              email
            </Text>
          </View>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('Edit User Profile')}
          >
            <Text>EDIT YOUR PROFILE</Text>

          </TouchableHighlight>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  bodyContentProfile: {
    margin: 10,
    alignItems: "center"
  },
  scrollStyle: {
    flexGrow: 1
  },
  name: {
    fontSize: 15,
    fontWeight: "800",
    margin: 10
  },
  shortDescription: {
    fontSize: 13,
    margin: 5
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30
  }
});
