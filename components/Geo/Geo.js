import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";



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
          description: "Tischlerei & Innenausbau"
        }
      ]
    };
  }

  componentDidMount() {
    // console.log(this.props.lat, this.props.lon)
    this.setState(state => {
      state.markers[0].coordinate.latitude = this.props.lat;
      state.markers[0].coordinate.longitude = this.props.lon;
      return state;
    })
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
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
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
              >
                {/* <MapView.Callout
                                    style={styles.callout}
                                    title={marker.title}
                                >
                                    <Callout>
                                     <Image source={require('../../assets/logo/logo')} />
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