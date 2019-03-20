import React, { Component } from "react";
import { StyleSheet, Text, View, Button, WebView } from "react-native";
const paint = require("../../utils/paint.html");

import "regenerator-runtime";
const Expo = require("expo");

export default class CanvasComponent extends Component {
  render() {
    return <WebView source={paint} style={{ marginTop: 20 }} />;
  }
}
