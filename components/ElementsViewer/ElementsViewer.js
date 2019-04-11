import React from "react";
import { GLView } from "expo-gl";
import ExpoPIXI, { PIXI } from "expo-pixi";
import { View, PanResponder, Animated } from "react-native";
import { Asset } from "expo-asset";
import { resolveAsync } from "expo-asset-utils";

//import elements

const table1 = require("../../assets/elements/furniture/table_1.png");
const mask_table1 = require("../../assets/elements/furniture/table_1_mask.png");

export default class ElementsViewer extends React.Component {
  constructor() {
    super();
    this.state = {

      polyColor: "0x222222"
    };

    this._polyDrawer = React.createRef();
  }

  // componentDidUpdate(prevProps) {
  //   if (
  //     this.props.coordX !== prevProps.coordX &&
  //     this.props.coordY !== prevProps.coordY
  //   ) {
  //     this.setState(state => {
  //       state.coords.push(this.props.coordX * 2);
  //       state.coords.push(this.props.coordY * 2);
  //       state.polyColor = prevProps.polyColor;

  //       return state;
  //     });
  //   }
  // }



  _context = async context => {
    console.log(context);
    const app = new PIXI.Application({ context, transparent: true });
    var container = new PIXI.Container();
    container.interactive = true;

    var graphics = new PIXI.Graphics();
    // draw polygon
    console.log("greetings from gl", this.state.coords, this.state.polyColor);
    var path = this.state.coords;
    var color = this.state.polyColor;

    graphics.lineStyle(0);
    graphics.beginFill(color, 1);
    graphics.drawPolygon(path);
    graphics.endFill();



    app.stage.addChild(graphics);
  };

  render() {
    return (
      <GLView
        ref={this._polyDrawer}
        style={{
          flex: 1,
          position: "relative",
          zIndex: 1
        }}
        onContextCreate={this.props.updatePoly}

      />
    );
  }
}
