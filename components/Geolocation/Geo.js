import { Location, Permissions } from 'expo';
import React from 'react';
import { Button, View, Text, Image, TextInput, StyleSheet } from 'react-native';


import YelpService from './services/Yelp';
import SafeAreaView from "./SafeArea";

const deltas = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
};

export default class Geo extends React.Component {
  state = {
    region: null,
    coffeeShops: []
  };

  componentWillMount() {
    this.getLocationAsync();
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    const region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      ...deltas
    };
    await this.setState({ region });
  }

  getLocationAsync = async () => {

    /* ... */

    // Add this line!
    await this.getCoffeeShops();
  }

  render() {
    const { region, coffeeShops } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Map region={region} places={coffeeShops} />
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '80%'
    }
});