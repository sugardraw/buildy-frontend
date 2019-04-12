import React from "react";
import { Button, View, Text, Image, StyleSheet } from "react-native";
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
    headerTintColor: "black",
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
            alignItems: "center",
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
                    <UploadAvatar
                      payloadKey="file"
                      endpoint={api + "/api/user/save_avatar"}
                      callbackUrl={api + professional.avatar}
                    />
                    <Text style={{ fontFamily: "Roboto-Black", fontSize: 22 }}>
                      {professional.name}
                    </Text>

                    <Text style={{ fontFamily: "Roboto-Medium", fontSize: 14 }}>
                      {professional.shortDescription}
                    </Text>

                    {professional.services.map(service => (
                      <Text style={styles.servicesList}>{service}</Text>
                    ))}

                    <Text
                      style={{
                        fontFamily: "Roboto-Light",
                        textAlign: "center",
                        padding: 20
                      }}
                    >
                      {professional.longDescription}
                    </Text>
                    <PortfolioGallery projects={professional.projectImages} />
                  </View>
                ))
              : null}
          </View>

          <View style={styles.button}>

          <Button
            backgroundColor="#03A9F4"

            title="SEND A REQUEST"
            onPress={() => this.props.navigation.navigate("RequestFormular")}
          />
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  bodyContentProfile: {
    margin: 20,
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 1
  },
  servicesList: {
    textAlign: "left",
    color: "#3456df"
  },
  scrollStyle: {
    flexGrow: 1
  },
  button:{
    position:"relative",
    bottom: 20,
    width:"90%"
  }
});
