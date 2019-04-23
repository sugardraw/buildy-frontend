import React from "react";
import { StyleSheet, Image } from "react-native";

export default class ImageElement extends React.Component {
  render() {
    return (
      <Image
        source={{ uri: this.props.imgSource.uri }}
        style={styles.singleImage}
      />
    );
  }
}

const styles = StyleSheet.create({
  singleImage: {
    flex: 1,
    width: null,
    alignSelf: "stretch"
  }
});
