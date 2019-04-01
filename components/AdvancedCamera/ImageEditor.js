import Expo from "expo";
const ExpoImagePicker = require("expo").ImagePicker;
import { FileSystem, takeSnapshotAsync, Permissions, ImagePicker } from "expo";
const chalk = require("chalk");

import * as ExpoPixi from "expo-pixi";
import React, { Component } from "react";
import axios from "axios";

import {
  Image,
  Platform,
  AppState,
  StyleSheet,
  Text,
  Dimensions,
  ImageBackground,
  PixelRatio,
  View,
  TouchableOpacity,
  TouchableHighlight,
  CameraRoll,
  ScrollView
} from "react-native";

import Menu, {
  MenuItem,
  MenuDivider,
  Position
} from "react-native-enhanced-popup-menu";

import {
  SimpleLineIcons,
  MaterialIcons,
  MaterialCommunityIcons
} from "@expo/vector-icons";

import Gestures from "react-native-easy-gestures";
import ElementsViewer from "../ElementsViewer/ElementsViewer";
import ColorPalette from "react-native-color-palette";
import FileSystemRN from "react-native-filesystem";

import uid from "uuid/v4";

const isAndroid = Platform.OS === "android";
function uuidv4() {
  //https://stackoverflow.com/a/2117523/4047926
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const images = [0, 1, 2, 3, 4];
const { elements } = require("../../assets/elements/elementsExporter");
import { api } from "../../api/api";

furnitureNames = ["chair_1.png", "table_1.png"];
architectureNames = [
  "door_1.png",
  "door_2.png",
  "stairs_1.png",
  "window_1.png"
];

const deviceWidth = Dimensions.get("window").width;

export default class ImageEditor extends Component {
  constructor() {
    super();
    this.textRefOne = React.createRef();
    this.textRefTwo = React.createRef();

    this.menuRefOne = null;
    this.menuRefTwo = null;

    this.setMenuRefOne = ref => (this.menuRefOne = ref);
    this.setMenuRefTwo = ref => (this.menuRefTwo = ref);
    this.hideMenuOne = () => this.menuRefOne.hide();
    this.hideMenuTwo = () => this.menuRefTwo.hide();
    this.showMenuOne = () =>
      this.menuRefOne.show(
        this.textRefOne.current,
        (stickTo = Position.BOTTOM_LEFT)
      );

    this.onPressPopOne = () => this.showMenuOne();

    this.showMenuTwo = () =>
      this.menuRefTwo.show(
        this.textRefTwo.current,
        (stickTo = Position.BOTTOM_LEFT)
      );

    this.onPressPopTwo = () => this.showMenuTwo();
    this.state = {
      image: null,
      appState: AppState.currentState,
      strokeWidth: 10,
      showElements: false,
      show: false,
      elementUri: null,
      lines: [],
      cameraRollUri: null,
      selectColor: false,
      requestData: null,
      photo: null
    };
    this.strokeColor = 0xffffff;
  }

  handleAppStateChangeAsync = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      if (isAndroid && this.sketch) {
        this.setState({
          appState: nextAppState,
          id: uuidv4(),
          lines: this.sketch.lines
        });
        return;
      }
    }
    this.setState({ appState: nextAppState });
  };

  componentDidMount() {
    AppState.addEventListener("change", this.handleAppStateChangeAsync);
    this.setState({
      requestData: this.props.requestData
    });
    FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + "requestData"
    ).catch(e => {
      console.log(e, "Directory exists");
    });
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this.handleAppStateChangeAsync);
  }

  onChangeAsync = async () => {
    const { uri } = await this.sketch.takeSnapshotAsync();
  };

  incrementWidth = () => {
    let newWidth = 10;
    this.setState(state => {
      state.strokeWidth = state.strokeWidth + newWidth;
      return state;
    });
  };
  decrementWidth = () => {
    let newWidth = 10;
    this.setState(state => {
      state.strokeWidth = state.strokeWidth - newWidth;
      return state;
    });
  };

  changeColor = () => {
    console.log("trying to change color");
    this.setState({
      selectColor: !this.state.selectColor
    });
  };

  openElementsPanel = () => {
    this.setState({
      showElements: !this.state.showElements
    });
  };

  addToScene = uri => {
    this.setState({
      elementUri: uri,
      showElements: !this.state.showElements,
      show: !this.state.show
    });
  };

  _renderColorPalette = selectedColor => {
    if (this.state.selectColor) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            flexWrap: "wrap"
          }}
        >
          <ColorPalette
            onChange={color => {
              let newSelectedColor = color.replace("#", "0x");
              this.strokeColor = newSelectedColor;
              selectedColor = color;
              return selectedColor;
            }}
            value={selectedColor}
            colors={[
              "#C0392B",
              "#E74C3C",
              "#0015aC",
              "#9B59B6",
              "#8E44AD",
              "#12045D",
              "#2ed0B9",
              "#98fff6",
              "#8ff4AD",
              "#1204AD",
              "#2980B9",
              "#1934B9"
            ]}
            title={"Controlled Color Palette:"}
            icon={<MaterialIcons name="check" size={25} color={"black"} />}
          />
          <TouchableOpacity
            style={{ padding: 5, alignItems: "center" }}
            onPress={this.changeColor}
          >
            <SimpleLineIcons
              style={{ margin: 5 }}
              name="close"
              size={30}
              color="white"
            />
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  };

  _renderElementsPanel = () => {
    let furnitureArray = [];
    let architectureArray = [];

    furnitureNames.forEach((image, i) => {
      let thisImage = (
        <TouchableOpacity
          style={styles.icon}
          onPress={() =>
            this.addToScene(api + "/uploads/elements/furniture/" + image)
          }
          uri={api + "/uploads/elements/furniture/" + image}
        >
          <Image
            key={`image${i}`}
            source={{ uri: api + "/uploads/elements/furniture/" + image }}
            style={{ width: 80, height: 80, margin: 6 }}
          />
        </TouchableOpacity>
      );
      furnitureArray.push(thisImage);
    });

    architectureNames.forEach((image, i) => {
      let thisImage = (
        <TouchableOpacity
          style={styles.icon}
          onPress={() =>
            this.addToScene(api + "/uploads/elements/architecture/" + image)
          }
          uri={api + "/uploads/elements/architecture/" + image}
        >
          <Image
            key={`image${i}`}
            source={{ uri: api + "/uploads/elements/architecture/" + image }}
            style={{ width: 80, height: 80, margin: 6 }}
          />
        </TouchableOpacity>
      );
      architectureArray.push(thisImage);
    });
    if (this.state.showElements) {
      return (
        <View
          style={{
            flex: 2,
            justifyContent: "flex-start"
          }}
        >
          <Text style={{ color: "white", alignSelf: "center", fontSize: 15 }}>
            Basic furniture elements
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={10}
            pagingEnabled
          >
            {furnitureArray}
          </ScrollView>
          <Text style={{ color: "white", alignSelf: "center", fontSize: 15 }}>
            Basic arquitecture elements
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={10}
            pagingEnabled
          >
            {architectureArray}
          </ScrollView>
        </View>
      );
    } else {
      return null;
    }
  };

  _saveEditedImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      throw new Error("Denied CAMERA_ROLL permissions!");
      return;
    }
    const targetPixelCount = 720;
    const pixelRatio = PixelRatio.get();
    let image = await takeSnapshotAsync(this._container, {
      result: "file",
      quality: 1,
      format: "png"
    });
    let saveImage = await CameraRoll.saveToCameraRoll(image, "photo");
    this.setState({ cameraRollUri: saveImage });
  };

  _uploadImageAsync = async uri => {
    const uriParts = uri.split(".");
    const fileType = uriParts[uriParts.length - 1];

    const formData = new FormData();
    formData.append("estimationRequest", {
      user: "5c9b833f0756b91851b783a4",
      editedImages: {
        uri,
        name: "image_request" + uid(),
        type: `image/${fileType}`
      },
      requestData: this.state.requestData
    });

    fetch(api + "/api/user/request/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then(response => console.log(response.json()))
      .catch(err => console.log(err))
      .done();
  };

  _saveToDB = async () => {
    if (this.state.cameraRollUri === null) {
      alert("please, save your edited image before you send it");
      return;
    } else {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        if (Platform.OS === "ios") this.showAlert();
        return;
      }

      ExpoImagePicker.launchImageLibraryAsync({
        mediaTypes: "Images"
      })
        .then(result => {
          const file = result.uri;
          if (!result.cancelled) {
            uploadResponse = this._uploadImageAsync(result.uri).then(
              response => {
                this.setState({
                  photo: file
                });
              }
            );
          }
        })
        .catch(err => console.log(err));
    }
  };

  reset = async () => {
    this.sketch.deleteAll();
    this.strokeColor = 0xffffff;

    this.setState(state => {
      state.strokeWidth = 10;
      state.elementUri = null;
      state.show = !state.show;
      state.lines = [];
      return state;
    });
  };

  onReady = () => {
    console.log("ready!");
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "transparent",
            justifyContent: "center"
          }}
        >
          <TouchableOpacity
            style={[styles.icon, styles.mainIcons]}
            onPress={() => {
              this.sketch.undo();
            }}
          >
            <MaterialIcons name="undo" size={25} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.icon, styles.mainIcons]}
            onPress={this.onPressPopTwo}
          >
            <MaterialIcons name="format-paint" size={25} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.icon, styles.mainIcons]}
            onPress={this.onPressPopOne}
          >
            <MaterialIcons name="more-horiz" size={30} color="white" />
          </TouchableOpacity>
          <Text
            ref={this.textRefOne}
            style={{ fontSize: 1, textAlign: "center" }}
          />
          <Text
            ref={this.textRefTwo}
            style={{ fontSize: 1, textAlign: "center" }}
          />

          {/* pop menus MENU1 */}

          <Menu ref={this.setMenuRefOne}>
            <View style={styles.icons}>
              <TouchableOpacity
                style={styles.icon}
                onPress={this._saveEditedImage}
              >
                <MaterialIcons name="file-download" size={25} color="black" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.icon} onPress={this._saveToDB}>
                <MaterialIcons name="send" size={25} color="black" />
              </TouchableOpacity>
            </View>
            <MenuDivider />
            <TouchableOpacity
              style={{ padding: 5, alignItems: "center" }}
              onPress={this.hideMenuOne}
            >
              <SimpleLineIcons
                style={{ margin: 5 }}
                name="close"
                size={30}
                color="black"
              />
            </TouchableOpacity>
          </Menu>

          {/* pop menus MENU2 */}

          <Menu ref={this.setMenuRefTwo}>
            <View style={styles.icons}>
              <TouchableHighlight
                style={[styles.icon, styles.rotateIcon]}
                onPress={this.incrementWidth}
              >
                <MaterialIcons name="line-weight" size={25} color="black" />
              </TouchableHighlight>

              <TouchableOpacity
                style={styles.icon}
                onPress={this.decrementWidth}
              >
                <MaterialIcons name="line-weight" size={25} color="black" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.icon} onPress={this.changeColor}>
                <MaterialIcons
                  name="format-color-fill"
                  size={25}
                  color="black"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => {
                  alert("make measures");
                }}
              >
                <MaterialCommunityIcons
                  name="tape-measure"
                  size={25}
                  color="black"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.icon}
                onPress={this.openElementsPanel}
              >
                <MaterialIcons name="insert-photo" size={25} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.icon} onPress={this.reset}>
                <MaterialIcons name="autorenew" size={25} color="black" />
              </TouchableOpacity>
            </View>
            <MenuDivider />
            <TouchableOpacity
              style={{ padding: 5, alignItems: "center" }}
              onPress={this.hideMenuTwo}
            >
              <SimpleLineIcons
                style={{ margin: 5 }}
                name="close"
                size={30}
                color="black"
              />
            </TouchableOpacity>
          </Menu>
        </View>

        {this._renderColorPalette()}
        {this._renderElementsPanel()}

        <View
          collapsable={false}
          ref={view => {
            this._container = view;
          }}
          style={styles.container}
        >
          <View style={styles.sketchContainer}>
            {this.state.show && (
              <View style={styles.draggableContainer}>
                <Gestures>
                  <Image
                    style={{ width: 200, height: 200 }}
                    source={{ uri: this.state.elementUri }}
                  />
                </Gestures>
              </View>
            )}
            {/*
              Add build elements with PIXI library
             {this.state.showElements &&
              <ElementsViewer />
              } 
             */}
            <ImageBackground
              source={{ uri: this.props.selected[0] }}
              style={styles.background}
            >
              <ExpoPixi.Sketch
                ref={ref => (this.sketch = ref)}
                style={styles.sketch}
                strokeColor={this.strokeColor}
                strokeWidth={this.state.strokeWidth}
                strokeAlpha={1}
                onChange={this.onChangeAsync}
                onReady={this.onReady}
              />
            </ImageBackground>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  sketch: {
    flex: 1
  },
  draggableContainer: {
    flex: 1,
    position: "relative",
    zIndex: 2
  },
  mainIcons: {
    marginLeft: 6,
    marginRight: 6
  },
  sketchContainer: {
    height: "100%",
    backgroundColor: "transparent"
  },
  icons: {
    padding: 6,
    borderRadius: 6,
    flexDirection: "row"
  },

  icon: {
    padding: 6
  },
  rotateIcon: {
    transform: [{ rotate: "-180deg" }]
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%"
  }
});
