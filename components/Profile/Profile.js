import React from "react";
import { Button, View, Text, Image, StyleSheet } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import UploadImage from '../Profile/UploadImage';

export default class Profile extends React.Component {
  static navigationOptions = {
    title: "About Us",
    headerStyle: { backgroundColor: "#173746" },
    headerTintColor: "white",
    headerTitleStyle: { color: "white" }
  };
  render() {
    return (
      <KeyboardAwareScrollView
        ref="scrollView"
        contentContainerStyle={styles.scrollstyle}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <UploadImage />

          <View style={styles.bodyContentProfile}>
            <Text style={styles.username}>Company name</Text>
            <Text style={styles.shortDescription}>
              Short description Company
            </Text>
            <Text style={styles.longDescription}>
              service offer, service offer, service offer
            </Text>
            <Text style={styles.longDescription}>
              Description Company: Lorem ipsum dolor sit amet, voluptate velit
              esse cillum dolore eu fugiat nulla pariatur.
            </Text>
          </View>
          <Button
            title="Make a price request"
            onPress={() => this.props.navigation.navigate("RequestFormular")}
          />
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
  username: {
    fontSize: 15,
    fontWeight: "800",
    margin: 10
  },
  shortDescription: {
    fontSize: 13,
    margin: 5
  },
  longDescription: {
    fontSize: 11,
    margin: 10,
    padding: 10
  }
});
