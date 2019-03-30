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
  render() {
    return (
      <GLView
        style={{
          flex: 1,
          position: "relative",
          zIndex: 1
        }}
        onContextCreate={async context => {
          const app = new PIXI.Application({ context, transparent: true });
          var container = new PIXI.Container();
          container.interactive = true;

          // const texture = await PIXI.Texture.fromExpoAsync('http://i.imgur.com/uwrbErh.png');
          // const texture = await PIXI.Texture.from('http://i.imgur.com/uwrbErh.png');
          // const sprite = await PIXI.Sprite.fromExpoAsync(
          //   "http://i.imgur.com/uwrbErh.png"
          // );
          // const sprite = await PIXI.Texture.from(
          //   "https://0201.nccdn.net/1_2/000/000/11a/e17/mask_table1-xxl.png"
          // );

          const mask = await PIXI.Sprite.from(mask_table1);
          const spriteBg = await PIXI.Sprite.from(table1);

          mask.width = spriteBg.width / 2;
          mask.height = spriteBg.height / 2;

          spriteBg.width = spriteBg.width / 2;
          spriteBg.height = spriteBg.height / 2;

          // enable the bunny to be interactive... this will allow it to respond to mouse and touch events

          // Center on the screen
          container.x = (app.renderer.width - container.width) / 3.3;
          container.y = (app.renderer.height - container.height) / 2;

          spriteBg.mask = mask;

          container.addChild(mask);
          container.addChild(spriteBg);
          app.stage.addChild(container);
        }}
      />
    );
  }
}
