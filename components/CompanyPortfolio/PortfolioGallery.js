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

import { AntDesign } from "@expo/vector-icons";
import ImageElement from "../CompanyPortfolio/ImageElement";
import { api } from "../../api/api";

export default class PortfolioGallery extends React.Component {
  state = {
    imageModal: "",
    visibleModal: false,
    projectImages: []
  };

  componentDidMount() {
    for (let i in this.props.projects) {
      if (typeof this.props.projects[i] === "string") {
        this.setState({
          projectImages: this.props.projects
        });
      } else {
        this.setState(state => {
          state.projectImages.push("/" + this.props.projects[i].path);
          return state;
        });
      }
    }
  }

  setModalVisible(visible, imgKey) {

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
          onRequestClose={() => { }}
        >
          <View style={styles.modal}>
            <TouchableOpacity
              onPress={() => {
                this.setModalVisible(false);
              }}
              style={{ position: "absolute", left: 10, top: 10, zIndex: 2 }}
            >
              <AntDesign name="closecircleo" size={50} color="white" />
            </TouchableOpacity>

            <ImageElement imgSource={{ uri: api + this.state.imageModal }} />
          </View>
        </Modal>

        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" }}>
          {images}
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    margin: "auto" //changed from 10
  },
  imgWrapper: {
    margin: 2,
    width: Dimensions.get("window").width * (1 / 4),
    height: Dimensions.get("window").height * (1 / 6)
  },
  modal: {
    flex: 1,
    backgroundColor: "white"
  }
});

AppRegistry.registerComponent("Gallery", () => Gallery);
