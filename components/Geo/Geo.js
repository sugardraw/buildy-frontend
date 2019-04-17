import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";

//to install the ui kit for the markercard: react-native install @shoutem/ui

export default class Geo extends Component {
  constructor() {
    super();
    this.state = {
      markers: [
        {
          coordinate: {
            latitude: 52.525549,
            longitude: 13.483673
          },
          title: "DISCHER",
          description: "Tischlerei & Innenausbau",
          addresse: "Friedrich-Olbricht-Damm 62, 13627 Berlin"
        },
        {
          coordinate: {
            latitude: 52.5442101,
            longitude: 13.3134693
          },
          title: "DISCHER",
          description: "Tischlerei & Innenausbau",
          addresse: "Fontanepromenade 2, 10967 Berlin"
        },
        {
          coordinate: {
            latitude: 52.490026,
            longitude: 13.4074258
          },
          title: "MM STUDIO",
          description: "Interior Design Berlin",
          addresse: "Fontanepromenade 2, 10967 Berlin"
          // image: "https://nextindustry.net/wp-content/uploads/2018/01/Logo_TV_2015.png"
        }
      ]
    };
  }

  render() {
    return (
      <View style={{ height: 100 + "%", width: 100 + "%" }}>
        <MapView
          onRegionChangeComplete={region => {
            this.setState({ currentView: region });
          }}
          style={{ height: 100 + "%", width: 100 + "%" }}
          initialRegion={{
            latitude: 52.520008,
            longitude: 13.404954,
            latitudeDelta: 0.3,
            longitudeDelta: 0.3
          }}
        >
          {this.state.markers.map((marker, i) => {
            return (
              <Marker
                style={styles.marker}
                key={i}
                coordinate={marker.coordinate}
                title={marker.title}
                description={marker.description}
                addresse={marker.addresse}
                image={marker.image}
              >
                {/* <MapView.Callout
                                    style={styles.callout}
                                    title={marker.title}
                                >
                                    <Callout
                                    // style={{ backgroundColor: "yellow" }}
                                    >
                                    </Callout>
                                </MapView.Callout> */}
              </Marker>
            );
          })}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  marker: {
    width: 90,
    height: 100
  }
});
