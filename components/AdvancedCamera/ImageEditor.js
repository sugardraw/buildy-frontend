import Expo from "expo";
const ExpoImagePicker = require("expo").ImagePicker;
import { FileSystem, takeSnapshotAsync, Permissions, ImagePicker } from "expo";
const chalk = require("chalk");
import * as ExpoPixi from "expo-pixi";

import ExpoPIXI, { PIXI } from "expo-pixi";
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
  MaterialCommunityIcons,
  FontAwesome
} from "@expo/vector-icons";

import Gestures from "react-native-easy-gestures";
import ElementsViewer from "../ElementsViewer/ElementsViewer";

import ColorPalette from "react-native-color-palette";

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

export default class ImageEditor extends Component {
  constructor(props) {
    super(props);
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
      showPolyDrawer: false,
      show: false,
      elementUri: null,
      lines: [],
      cameraRollUri: null,
      selectColor: false,
      requestData: null,
      photo: null,
      showFillButton: false,
      sketch: false,
      coords: []
    };
    (this.polyColor = "0xffffff"), (this.strokeColor = "0xffffff");
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
    console.log("component did mount", "ready", this.props.requestData);
    AppState.addEventListener("change", this.handleAppStateChangeAsync);
    this.setState({
      requestData: this.props.requestData
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
    this.setState({
      selectColor: !this.state.selectColor
    });
  };
  showSketch = () => {
    if (!this.state.sketch) {
      alert("just draw on the screen");
    } else {
      alert("draw tool turned off");
    }

    this.setState({
      sketch: !this.state.sketch
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
              this.polyColor = newSelectedColor;

              selectedColor = color;
              return selectedColor;
            }}
            value={selectedColor}
            colors={[
              "#ad0000",
              "#ad8600",
              "#000857",
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
    this.setState(
      { cameraRollUri: saveImage },
      alert("The edited image was successfully saved in your phone gallery")
    );
  };

  _uploadImageAsyncTest = async uri => {
    const uriParts = uri.split(".");
    const fileType = uriParts[uriParts.length - 1];

    const formData = new FormData();
    formData.append("estimationRequest", {
      user: this.state.requestData.requestData.id,
      editedImages: {
        uri,
        name: "request-image-" + uid(),
        type: `image/${fileType}`
      },
      requestData: this.state.requestData
    });

    return await fetch(api + "/api/user/request/save", {
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
        mediaTypes: "Images",
        base64: true
      })
        .then(result => {
          const file = result.uri;
          if (!result.cancelled) {
            uploadResponse = this._uploadImageAsyncTest(result.uri)
              .then(response => {
                this.setState({
                  photo: file
                });
              })
              .then(
                this.props.navigation.navigate("SendEmail", {
                  id: this.state.requestData.requestData.id,
                  title: this.state.requestData.requestData.title
                })
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

  getCoordinates = touchObj => {
    if (!this.state.showFillButton && !this.state.showPolyDrawer) {
      console.log("get coords__1");
      return null;
    } else {
      console.log("get coords__2");
      this.setState(state => {
        state.coords.push(touchObj.locationX * 2);
        state.coords.push(touchObj.locationY * 2);
        return state;
      });
    }
  };

  activateDrawPolyTool = () => {
    if (
      this.state.showPolyDrawer === false &&
      this.state.showFillButton === false
    ) {
      alert(
        'To draw a custom polygon, just press the screen once at different positions and press the button "fill"'
      );
    }
    console.log("draw poly");
    this.setState({
      coords: [],
      showFillButton: !this.state.showFillButton
    });
  };

  fillPoly = () => {
    console.log("fill poly");

    this.setState(
      {
        showPolyDrawer: !this.state.showPolyDrawer
      },
      this.forceUpdate()
    );
  };

  deletePoly = () => {
    console.log("delete poly");
    this.setState(
      {
        showPolyDrawer: false,
        coords: []
      },
      this.forceUpdate()
    );
  };

  onReady = () => {
    console.log("ready!");
  };

  updatePoly = async context => {
    const app = new PIXI.Application({ context, transparent: true });
    var container = new PIXI.Container();
    container.interactive = true;

    var graphics = new PIXI.Graphics();
    // draw polygon
    console.log("greetings from gl", this.state.coords, this.polyColor);
    var path = this.state.coords;
    var color = this.polyColor;

    graphics.lineStyle(0);
    graphics.beginFill(color, 1);
    graphics.drawPolygon(path);
    graphics.endFill();

    app.stage.addChild(graphics);
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "transparent",
            justifyContent: "center",
            marginTop: 40
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
                onPress={this.showSketch}
              >
                <FontAwesome name="paint-brush" size={25} color="black" />
              </TouchableHighlight>
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
                onPress={this.activateDrawPolyTool}
              >
                <MaterialCommunityIcons
                  name="drawing"
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
        {this.state.showFillButton && (
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity
              style={{ padding: 5, alignItems: "center" }}
              onPress={e => this.fillPoly(e)}
            >
              <Text style={{ color: "white" }}>FILL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 5, alignItems: "center" }}
              onPress={e => this.deletePoly(e)}
            >
              <Text style={{ color: "white" }}>DELETE</Text>
            </TouchableOpacity>
          </View>
        )}

        <View
          collapsable={false}
          ref={view => {
            this._container = view;
          }}
          onTouchStart={e => {
            this.getCoordinates(e.nativeEvent);
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

            {this.state.showPolyDrawer && (
              <ElementsViewer updatePoly={this.updatePoly} />
            )}

            <ImageBackground
              source={{ uri: this.props.selected[0] }}
              style={styles.background}
            >
              {this.state.sketch && (
                <ExpoPixi.Sketch
                  ref={ref => (this.sketch = ref)}
                  style={styles.sketch}
                  strokeColor={this.strokeColor}
                  strokeWidth={this.state.strokeWidth}
                  strokeAlpha={1}
                  onChange={this.onChangeAsync}
                  onReady={this.onReady}
                />
              )}
            </ImageBackground>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%"
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
