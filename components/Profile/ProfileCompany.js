import React from "react";
import { View, Text, AsyncStorage, StyleSheet, ScrollView } from "react-native";
import { Tooltip, Button } from "react-native-elements";

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
      lon: "",
      companyId: null
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
    this.setState({
      companyId: id
    })

    axios
      .get(api + "/api/professional/showDetails?id=" + id)
      .then(response => {
        if (response.data[0].hasOwnProperty("location")) {

          this.setState({
            professional: response.data,
            lat: response.data[0].location.coordinates[0],
            lon: response.data[0].location.coordinates[1]
          });
        } else {
          this.setState({
            professional: response.data,
            lat: 52.525549,
            lon: 13.483673
          });

        }
      })
      .catch(error => {
        // dispatch({ type: GET_POST_FAILURE, payload: error });
        console.log(error);
      });
  };

  render() {
    const { id_token } = this.state;
    const isEnabled = id_token !== null;
    return (
      <View style={styles.scrollstyle}>
        <ScrollView ref="scrollView">
          <View>
            <View style={styles.bodyContentProfile}>
              {this.state._fontLoaded && this.state.professional.length > 0
                ? this.state.professional.map((professional, i) => (
                  <View
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
                      <Text style={styles.servicesList}>
                        Services
                      </Text>
                      <View style={{ flexDirection: 'row' }}>
                        {professional.services.map((service, i) => (
                          <Text key={i} style={{ marginRight: 2, paddingRight: 2 }}>
                            {service}
                          </Text>
                        ))}
                      </View>
                    </View>
                    <View style={styles.paragraphText}>
                      <Text style={styles.servicesList}>
                        Description
                        </Text>
                      <Text>{professional.longDescription}</Text>
                    </View>
                    <View style={styles.paragraphText}>
                      <Text style={styles.servicesList}>
                        Contact
                        </Text>
                      <Text>
                        {professional.street}
                      </Text>

                      <View style={{ flexDirection: 'row' }}>
                        <Text
                          style={{ marginRight: 2, paddingRight: 2 }}
                        >
                          {professional.zip}
                        </Text>
                        <Text>
                          {professional.city}
                        </Text>
                      </View>
                      <Text>
                        {professional.email}
                      </Text>
                    </View>
                    <View
                      style={styles.paragraphText}
                    >
                      <Text style={styles.servicesList}>
                        Projects
                        </Text>
                    </View>
                    <PortfolioGallery projects={professional.projectImages} />
                  </View>
                ))
                : null}
              <View style={styles.paragraphText}>
                <Text style={styles.servicesList}>
                  Location
                </Text>
              </View>
              <View style={styles.geo}>
                {this.state.lat !== "" && (
                  <Geo lon={this.state.lon} lat={this.state.lat} />
                )}
                <Tooltip backgroundColor="yellow"  popover={<Text>Please SignUp</Text>}>
                  <Button
                    disabled={!isEnabled}
                    style={styles.button}
                    title="SEND A REQUEST"
                    onPress={() =>
                      this.props.navigation.navigate("RequestFormular", { companyId: this.state.companyId })
                    }
                  />
                </Tooltip>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollStyle: {
    flexGrow: 1
  },
  bodyContentProfile: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
  },
  main: {
    alignItems: 'center'
  },
  servicesList: {
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 18,
    color: "#0ec485"
  },
  paragraphText: {
    textAlign: "justify",
    marginTop: 20
  },
  geo: {
    margin: 0,
    justifyContent: 'center',
    width: '100%',
    height: 320,
    marginTop: -20
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#85c4ea",
    width: "80%",
    marginBottom: 80
  }
});