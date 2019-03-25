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

import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import {
  MenuProvider,
  MenuTrigger,
  MenuOptions,
  MenuOption,
  renderers,
  Menu
} from "react-native-popup-menu";

const isAndroid = Platform.OS === "android";
function uuidv4() {
  //https://stackoverflow.com/a/2117523/4047926
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default class App extends Component {
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
        <MenuProvider style={{ flexDirection: "row", padding: 30 }}>
          <MaterialIcons name="menu" size={25} color="white" />
          <Menu onSelect={value => alert(`Selected number: ${value}`)}>
            <MenuTrigger text="Select option" />
            <MenuOptions>
              <MenuOption value={1} text="One" />
              <MenuOption value={2}>
                <Text style={{ color: "red" }}>Two</Text>
              </MenuOption>
              <MenuOption value={3} disabled={true} text="Three" />
            </MenuOptions>
          </Menu>
        </MenuProvider>
        <View style={styles.icons}>
          <TouchableOpacity
            style={styles.buttonArrow}
            onPress={this.props.onPress}
          >
            <MaterialIcons name="arrow-back" size={25} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonArrow}
            onPress={() => {
              this.sketch.undo();
            }}
          >
            <MaterialIcons name="undo" size={25} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonArrow}
            onPress={() => {
              alert("edit tools");
            }}
          >
            <MaterialIcons name="edit" size={25} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonArrow}
            onPress={() => {
              alert("save file");
            }}
          >
            <MaterialIcons name="file-download" size={25} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonArrow}
            onPress={() => {
              alert("share");
            }}
          >
            <MaterialIcons name="send" size={25} color="white" />
          </TouchableOpacity>
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
  sketchContainer: {
    height: "100%",
    backgroundColor: "transparent"
  },
  imageContainer: {
    height: "100%",
    borderTopWidth: 4,
    borderTopColor: "#E44262"
  },
  label: {
    width: "100%",
    padding: 5,
    alignItems: "center"
  },
  icons: {
    padding: 6,
    borderRadius: 6,
    alignSelf: "center",
    flexDirection: "row"
  },
  buttonArrow: {
    margin: "auto",
    padding: 6
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  toggleButton: {}
});
