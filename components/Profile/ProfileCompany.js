import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import UploadAvatar from "./UploadAvatar";
import PortfolioGallery from "../CompanyPortfolio/PortfolioGallery";
import { api } from "../../api/api";
import { Font } from "expo";
import axios from "axios";

export default class ProfileCompany extends React.Component {
  constructor() {
    super();

    this.state = {
      _fontLoaded: false,
      professional: []
    };
  }
  static navigationOptions = {
    headerTransparent: true,
    headerTintColor: "#85c4ea",
    headerTitleStyle: { color: "black" }
  };

  componentDidMount = async () => {
    await Font.loadAsync({
      "Roboto-Black": require("../../assets/fonts/Roboto-Black.ttf"),
      "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
      "Roboto-Light": require("../../assets/fonts/Roboto-Light.ttf")
    });
    this.setState({ _fontLoaded: true });

    const id = this.props.navigation.state.params.id;

    axios
      .get(api + "/api/professional/showDetails?id=" + id)
      .then(response => {
        this.setState({
          professional: response.data
        });
      })
      .catch(error => {
        dispatch({ type: GET_POST_FAILURE, payload: error });
      });
  };

  render() {
    return (
      <KeyboardAwareScrollView
        ref="scrollView"
        contentContainerStyle={styles.scrollstyle}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            marginTop: 70
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
                        callbackUrl={api + professional.avatar}
                      />
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
                        {professional.address.street}
                      </Text>
                      <Text style={styles.infoText}>
                        {professional.address.zip}
                      </Text>
                      <Text style={styles.infoText}>
                        {professional.address.city}
                      </Text>
                      <Text style={styles.infoText}>{professional.email}</Text>
                    </View>

                    <View style={[styles.paragraphText, { paddingBottom: 10 }]}>
                      <Text style={[styles.servicesList, { fontSize: 20 }]}>
                        Projects
                      </Text>
                    </View>
                    <PortfolioGallery projects={professional.projectImages} />
                  </View>
                ))
              : null}
          </View>

          <View style={styles.button}>
            <Button
              buttonStyle={{
                backgroundColor: "#85c4ea"
              }}
              title="SEND A REQUEST *"
              onPress={() => this.props.navigation.navigate("RequestFormular")}
            />
            <View style={{ height: 40, padding: 10, marginBottom: 40 }}>
              <Text>* Only for registered Users</Text>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  bodyContentProfile: {
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
  button: {
    alignSelf: "center",
    position: "relative",
    bottom: 20,
    width: "90%"
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
