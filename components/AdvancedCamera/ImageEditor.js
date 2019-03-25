import Expo from "expo";
import * as ExpoPixi from "expo-pixi";
import React, { Component } from "react";
import {
  Platform,
  AppState,
  StyleSheet,
  Text,
  ImageBackground,
  View,
  TouchableOpacity
} from "react-native";

import Menu, {
  MenuItem,
  MenuDivider,
  Position
} from "react-native-enhanced-popup-menu";

import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

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
    this.textRef = React.createRef();
    this.menuRef = null;

    this.setMenuRef = ref => (this.menuRef = ref);
    this.hideMenu = () => this.menuRef.hide();
    this.showMenu = () =>
      this.menuRef.show(this.textRef.current, (stickTo = Position.BOTTOM_LEFT));

    this.onPressPop = () => this.showMenu();
  }
  state = {
    image: null,
    appState: AppState.currentState,
    strokeWidth: 10,
    strokeColor: 0xffffff
  };

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

  componentWillUnmount() {
    AppState.removeEventListener("change", this.handleAppStateChangeAsync);
  }

  onChangeAsync = async () => {
    const { uri } = await this.sketch.takeSnapshotAsync();

    this.setState({
      image: { uri },
      strokeWidth: 10,
      strokeColor: 0xffffff
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
            onPress={() => {
              alert("tools");
            }}
          >
            <MaterialIcons name="format-paint" size={25} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.icon, styles.mainIcons]}
            onPress={this.onPressPop}
          >
            <MaterialIcons name="more-horiz" size={30} color="white" />
          </TouchableOpacity>
          <Text
            ref={this.textRef}
            style={{ fontSize: 1, textAlign: "center" }}
          />

          <Menu ref={this.setMenuRef}>
            <View style={styles.icons}>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => {
                  alert("save file");
                }}
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
            <MenuItem
              style={{ position: "relative", left: 65, top: 5 }}
              onPress={this.hideMenu}
            >
              <MaterialIcons name="close" size={30} color="black" />
            </MenuItem>
          </Menu>
        </View>

        <View style={styles.container}>
          <View style={styles.sketchContainer}>
            <ImageBackground
              source={{ uri: this.props.selected[0] }}
              style={styles.background}
            >
              <ExpoPixi.Sketch
                ref={ref => (this.sketch = ref)}
                style={styles.sketch}
                strokeColor={this.state.strokeColor}
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
  background: {
    flex: 1,
    width: "100%",
    height: "100%"
  }
});
