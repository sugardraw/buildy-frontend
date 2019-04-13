import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  AppRegistry,
  Modal,
  TouchableWithoutFeedback,
  Dimensions
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import ImageElement from "../CompanyPortfolio/ImageElement";
import { api } from "../../api/api";

export default class PortfolioGallery extends React.Component {
  state = {
    imageModal: "",
    visibleModal: false,
    projectImages: this.props.projects
  };

  setModalVisible(visible, imgKey) {
    console.log("/\/\/\/\//",this.state.projectImages[imgKey],imgKey )

    this.setState({ imageModal: this.state.projectImages[imgKey] });
    this.setState({ visibleModal: visible });
  }

  getImage() {
    return this.state.imageModal;
  }

  render() {
    let images = this.state.projectImages.map((value, key) => {

      return (
        <TouchableWithoutFeedback
          key={key}
          onPress={() => this.setModalVisible(true, key)}
        >
          <View style={styles.imgWrapper}>
            <ImageElement imgSource={{ uri: api + value }} />
          </View>
        </TouchableWithoutFeedback>
      );
    });

    return (
      <View style={styles.container}>
        <Modal
          style={styles.modal}
          animationType={"fade"}
          visible={this.state.visibleModal}
          transparent={true}
          onRequestClose={() => {}}
        >
          <View style={styles.modal}>
            <TouchableOpacity
              onPress={() => {
                this.setModalVisible(false);
              }}
            >
              <MaterialIcons name="close" size={30} color="black" />
            </TouchableOpacity>
            {console.log(this.state.imageModal)}
            <ImageElement imgSource={ {uri:api+this.state.imageModal} } />
          </View>
        </Modal>
        {images}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row"
  },
  imgWrapper: {
    margin: 2,
    padding: 1,
    width: Dimensions.get("window").width / 3 - 4,
    height: Dimensions.get("window").height / 5 - 12,
    backgroundColor: "white"
  },
  modal: {
    flex: 1,
    paddingTop: 30,
    padding: 20,
    backgroundColor: "white"
  }
});

AppRegistry.registerComponent("Gallery", () => Gallery);
