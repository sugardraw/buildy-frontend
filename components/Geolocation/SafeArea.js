
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Location, Permissions } from "expo";
import { Button } from 'react-native-elements';

import get from 'lodash/get';
import pick from "lodash/pick";
import Map from "./Map";
import YelpService from "./services/Yelp";

console.log("YelpService", YelpService)

export default class SafeArea extends Component {
    filterButtons = [
        { label: 'Open now', color: '#9C27B0', filter: { openNow: true } },
        { label: 'Starbucks', color: '#E91E63', filter: { term: 'starbucks' } },
        {
            label: 'Bubble Tea',
            color: '#8BC34A',
            location: 'Berlin',
            filter: { term: 'bubble tea' }
        },
        {
            label: 'Walking Distance',
            color: '#00BCD4',
            location: 'Berlin',
            filter: { radius: 3000 }
        },
        {
            label: 'Extra Hipster',
            color: '#F44336',
            location: 'Berlin',
            filter: { attributes: 'hot_and_new' }
        }
    ];

    state = {
        location: {
            latitude: 52.520815,
            longitude: 13.409419
        },
        errorMessage: null,
        coffeeShops: []
    }

    componentWillMount() {
        this.getLocationAsync();
    }

    componentDidMount() {

        const loc = this.getLocationAsync();
        console.log("this.getLocationAsync() ", loc)

    }

    getCoffeeShops = async filter => {
        const coords = get(this.state.location, 'coords');
        const userLocation = pick(coords, ['latitude', 'longitude']);


        const coffeeShops = await YelpService.getCoffeeShops(
            {
                latitude: 52.520815,
                longitude: 13.409419
            },
            filter
        );
        this.setState({ coffeeShops });
    };

    getLocationAsync = async () => {

        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== "granted") {
            this.setState({
                errorMessage: "Permission denied"
            });
        }

        let location = await Location.getCurrentPositionAsync({});

        console.log("######################", location)
        await this.setState({ location });

        this.getCoffeeShops();
        return location
    };

    handleFilterPress = filter => {
        this.getCoffeeShops(filter);
    };

    renderFilterButtons() {
        return this.filterButtons.map((button, i) => (
            <Button
                key={i}
                title={button.label}
                buttonStyle={{
                    backgroundColor: button.color,
                    ...styles.button
                }}
                onPress={() => this.handleFilterPress(button.filter)}
            />
        ));
    }

    render() {
        const { location, coffeeShops } = this.state;

        console.log("#######################", location, coffeeShops)

        return (
            <View style={styles.container}>
                <Map
                    location={location}
                    places={coffeeShops}
                />
                <View style={styles.filters}>{this.renderFilterButtons()}</View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    filters: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    button: {
        marginVertical: 4
    }
});
