import React from "react";
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView
} from "react-native";
import { FileSystem, FaceDetector, MediaLibrary, Permissions } from "expo";
const Expo = require("expo");
import { MaterialIcons } from "@expo/vector-icons";
import Photo from "./Photo";
import { Linking } from "react-native";

import ImageEditor from "./ImageEditor";

const PHOTOS_DIR = FileSystem.documentDirectory + "photos";

export default class GalleryScreen extends React.Component {
  state = {
    faces: {},
    images: {},
    photos: [],
    selected: [],
    renderEditor: false
  };

  componentDidMount = async () => {
    const photos = await FileSystem.readDirectoryAsync(PHOTOS_DIR);
    this.setState({ photos });
  };

  toggleSelection = (uri, isSelected) => {
    console.log("uri", uri);
    let selected = this.state.selected;
    if (isSelected) {
      selected.push(uri);
      console.log("test selected", this.state.selected);
    } else {
      selected = selected.filter(item => item !== uri);
    }
    this.setState({ selected });
  };

  editImage = () => {
    let selected = this.state.selected;

    if (selected.length > 0) {
      if (selected.length > 1) {
        alert("You only can Edit one Image at once");
      } else {
        alert("Redirecting to image edition page");
        this.setState({ renderEditor: true });
      }
    } else {
      alert("No selected to Edit!");
    }
  };

  deleteImageOfTempGallery = () => {
    let selected = this.state.selected;
    console.log("######", selected);
    selected.forEach(async select => {
      FileSystem.deleteAsync(select, { idempotent: false });
      const photos = await FileSystem.readDirectoryAsync(PHOTOS_DIR);
      this.setState({ photos: photos, selected: [] });
    });
  };

  renderPhoto = fileName => (
    <Photo
      key={fileName}
      uri={`${PHOTOS_DIR}/${fileName}`}
      onSelectionToggle={this.toggleSelection}
    />
  );

  toggleView = () => this.setState({ renderEditor: !this.state.renderEditor });

  render() {
    if (this.state.renderEditor) {
      return (
        <ImageEditor
          navigation={this.props.navigation}
          requestData={this.props.requestData}
          onPress={this.toggleView}
          selected={this.state.selected}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.navbar}>
            <View style={styles.arrow}>
              <TouchableOpacity
                style={styles.buttonArrow}
                onPress={this.props.onPress}
              >
                <MaterialIcons name="arrow-back" size={25} color="white" />
              </TouchableOpacity>
            </View>

            <View style={styles.buttonsView}>
              <TouchableOpacity
                style={styles.button}
                onPress={this.deleteImageOfTempGallery}
              >
                <Text style={styles.whiteText}>Delete selected</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={this.editImage}>
                <Text style={styles.whiteText}>Edit selected</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView horizontal={true} contentComponentStyle={{ flex: 1 }}>
            <View style={styles.pictures}>
              {this.state.photos.map(this.renderPhoto)}
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  navbar: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "space-between",
    backgroundColor: "#85c4ea"
  },
  pictures: {
    flex: 1,
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "space-evenly",
    alignItems: "flex-start"
  },
  button: {
    margin: 4,
    padding: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "white"
  },
  arrow: {
    borderRadius: 6,
    alignSelf: "flex-start"
  },
  buttonArrow: {
    padding: 6
  },
  buttonsView: {
    marginBottom: 3,
    marginRight: 6
  },

  whiteText: {
    color: "white",
    textAlign: "center"
  }
});
