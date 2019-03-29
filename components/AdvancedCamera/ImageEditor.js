import Expo from "expo";
import { FileSystem, takeSnapshotAsync, Permissions } from "expo";

import * as ExpoPixi from "expo-pixi";
import React, { Component } from "react";

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
  CameraRoll
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

const isAndroid = Platform.OS === "android";
function uuidv4() {
  //https://stackoverflow.com/a/2117523/4047926
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

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
      buildElement: null,
      lines: [],
      cameraRollUri: null,
      selectColor: false
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
  }

  uploadFurniture = () => {
    this.setState({
      buildElement: require("../../assets/furniture/table_1.png"),
      showElements: true
    });
  };

  componentWillUnmount() {
    AppState.removeEventListener("change", this.handleAppStateChangeAsync);
  }

  onChangeAsync = async () => {
    const { uri } = await this.sketch.takeSnapshotAsync();
    for (let line of this.sketch.lines) {
      console.log(line.points);
    }
    console.log(uri);
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

  saveToCameraRollAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      throw new Error("Denied CAMERA_ROLL permissions!");
      return;
    }
    const targetPixelCount = 720;
    const pixelRatio = PixelRatio.get();

    let result = await takeSnapshotAsync(this._container, {
      result: "file",
      quality: 1,
      format: "png"
    });

    let saveResult = await CameraRoll.saveToCameraRoll(result, "photo");
    this.setState({ cameraRollUri: saveResult });
    alert("Successfully saved selected to user's gallery!");
  };

  reset = async () => {
    this.sketch.deleteAll();
    this.strokeColor = 0xffffff;

    this.setState(state => {
      state.strokeWidth = 10;
      state.buildElement = null;
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
                onPress={this.saveToCameraRollAsync}
              >
                <MaterialIcons name="file-download" size={25} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => {
                  alert("edit tools");
                }}
              >
                <MaterialIcons name="share" size={25} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => {
                  alert("share");
                }}
              >
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
                onPress={this.uploadFurniture}
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

        <View
          collapsable={false}
          ref={view => {
            this._container = view;
          }}
          style={styles.container}
        >
          <View style={styles.sketchContainer}>
            {this.state.showElements && (
              <View style={styles.draggableContainer}>
                <Gestures>
                  <Image
                    style={{ width: 200, height: 200 }}
                    source={this.state.buildElement}
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
