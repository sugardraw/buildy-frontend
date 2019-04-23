import React from "react";
import { View, Text, AsyncStorage, StyleSheet, ScrollView } from "react-native";
import { Button } from "react-native-elements";

import UploadAvatar from "./UploadAvatar";
import PortfolioGallery from "../CompanyPortfolio/PortfolioGallery";
import { api } from "../../api/api";
import { Font } from "expo";
import axios from "axios";
import Geo from "../Geo/Geo";

export default class ProfileCompany extends React.Component {
  constructor() {
    super();

    this.state = {
      id_token: null,
      _fontLoaded: false,
      professional: [],
      lat: "",
      lon: ""
    };
  }
  static navigationOptions = {
    headerTintColor: "#85c4ea",
    headerTitleStyle: { color: "black" }
  };

  componentDidMount = async () => {
    await Font.loadAsync({
      "Roboto-Black": require("../../assets/fonts/Roboto-Black.ttf"),
      "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
      "Roboto-Light": require("../../assets/fonts/Roboto-Light.ttf")
    });

    let tokenStorage = await AsyncStorage.getItem("id_token");
    this.setState({ _fontLoaded: true, id_token: tokenStorage });

    const id = this.props.navigation.state.params.id;

    axios
      .get(api + "/api/professional/showDetails?id=" + id)
      .then(response => {
        this.setState({
          professional: response.data,
          lat: response.data[0].location.coordinates[0],
          lon: response.data[0].location.coordinates[1]
        });
      })
      .catch(error => {
        dispatch({ type: GET_POST_FAILURE, payload: error });
        console.log(error);
      });
  };

  render() {
    const { id_token } = this.state;
    const isEnabled = id_token !== null;
    return (
      <View style={styles.scrollstyle}>
        <ScrollView ref="scrollView">
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              marginTop: 140
            }}
          >
            <View style={styles.bodyContentProfile}>
              {this.state._fontLoaded && this.state.professional.length > 0
                ? this.state.professional.map((professional, i) => (
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                      key={i}
                    >
                      <View style={styles.main}>
                        <UploadAvatar
                          payloadKey="file"
                          endpoint={api + "/api/user/save_avatar"}
                          callbackUrl={
                            typeof professional.avatar == "string"
                              ? api + professional.avatar
                              : api + "/" + professional.avatar[0].path
                          }
                        />
                             <Text>{professional.location.coordinates[0]}</Text>
                        <View style={styles.headInfos} />
                        <Text
                          style={{ fontFamily: "Roboto-Black", fontSize: 22 }}
                        >
                          {professional.name}
                        </Text>
                        <Text
                          style={{ fontFamily: "Roboto-Medium", fontSize: 14 }}
                        >
                          {professional.shortDescription}
                        </Text>
                      </View>
                      <View style={styles.paragraphText}>
                        <Text
                          style={[
                            styles.servicesList,
                            { fontSize: 20, marginTop: 10 }
                          ]}
                        >
                          Services
                        </Text>
                        {professional.services.map((service, i) => (
                          <Text key={i} style={styles.servicesList}>
                            {service}
                          </Text>
                        ))}
                      </View>
                      <View
                        style={[
                          styles.paragraphText,
                          {
                            fontFamily: "Roboto-Light"
                          }
                        ]}
                      >
                        <Text style={[styles.servicesList, { fontSize: 20 }]}>
                          Description
                        </Text>
                        <Text>{professional.longDescription}</Text>
                      </View>
                      <View style={styles.paragraphText}>
                        <Text style={[styles.servicesList, { fontSize: 20 }]}>
                          Contact
                        </Text>
                        <Text style={styles.infoText}>
                          {professional.street}
                        </Text>
                        <Text style={styles.infoText}>{professional.zip}</Text>
                        <Text style={styles.infoText}>{professional.city}</Text>
                        <Text style={styles.infoText}>
                          {professional.email}
                        </Text>
                      </View>

                      <View
                        style={[styles.paragraphText, { paddingBottom: 10 }]}
                      >
                        <Text style={[styles.servicesList, { fontSize: 20 }]}>
                          Projects
                        </Text>
                      </View>
                      <PortfolioGallery projects={professional.projectImages} />
                    </View>
                  ))
                : null}
            </View>

            <View style={styles.geo}>
              <Text
                style={[
                  styles.servicesList,
                  { fontSize: 20, marginBottom: 10 }
                ]}
              >
                Location
              </Text>

              {this.state.lat !== "" && (
                <Geo lon={this.state.lon} lat={this.state.lat} />
              )}
            </View>
            <View style={styles.button}>
              <Button
                disabled={!isEnabled}
                buttonStyle={{
                  backgroundColor: "#85c4ea"
                }}
                title="SEND A REQUEST *"
                onPress={() =>
                  this.props.navigation.navigate("RequestFormular")
                }
              />
              <View
                style={{
                  height: 40,
                  paddingTop: 10,
                  paddingBottom: 40,
                  marginBottom: 60
                }}
              >
                <Text>* Only for registered Users</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bodyContentProfile: {
    flex: 1,
    margin: 10,
    marginTop: 25,
    alignItems: "center",
    backgroundColor: "white"
  },
  servicesList: {
    textAlign: "left",
    color: "#0ec485"
  },
  scrollStyle: {
    flexGrow: 1
  },
  geo: {
    marginLeft: 20,
    justifyContent: "center",
    width: "90%",
    height: 320,
    marginTop: -280
  },
  button: {
    marginTop: 40,
    alignSelf: "center",
    width: "90%",
    marginBottom: 80
  },
  main: {
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#85c4ea",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 4
  },
  headInfos: {
    marginTop: -10,
    marginBottom: 10,
    alignItems: "center"
  },
  paragraphText: {
    textAlign: "left",
    alignSelf: "flex-start",
    padding: 10
  },
  infoText: {
    fontFamily: "Roboto-Light",
    textAlign: "left",
    alignSelf: "flex-start"
  }
});
