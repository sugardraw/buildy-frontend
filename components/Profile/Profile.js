import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

export default class Profile extends Component {
  render() {
    return (
      <View>
        <Text>PROFILE</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bodyProfile: {
    alignSelf: "center",
    marginTop: 200,
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    backgroundColor: "#ffffff"
  },
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
  },
  inputs: {
    borderBottomColor: "black",
    borderBottomWidth: 2
  },
  avatar: {
    width: 60,
    height: 60,
    borderWidth: 3,
    borderRadius: 50,
    borderColor: "black"
  }
});
