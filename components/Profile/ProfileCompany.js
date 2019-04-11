import React from "react";
import { Button, View, Text, Image, StyleSheet } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import UploadAvatar from "./UploadAvatar";
import PortfolioGallery from "../CompanyPortfolio/PortfolioGallery";
import { api } from "../../api/api";

import { Font } from "expo";

export default class ProfileCompany extends React.Component {
  constructor() {
    super();
    this.state = {
      _fontLoaded: false
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
            <UploadAvatar
              payloadKey="file"
              endpoint={api + "/api/user/save_avatar"}
              callbackUrl="https://cdn.pixabay.com/photo/2017/08/16/00/29/add-person-2646097_960_720.png"
            />
            {this.state._fontLoaded ? (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text style={{ fontFamily: "Roboto-Black", fontSize: 22 }}>
                  Company name
                </Text>

                <Text style={{ fontFamily: "Roboto-Medium", fontSize: 14 }}>
                  Short description Company
                </Text>
                <Text
                  style={{
                    fontFamily: "Roboto-Light",
                    textAlign: "center",
                    padding: 20
                  }}
                >
                  Description Company: Lorem ipsum dolor sit amet, voluptate
                  velit esse cillum dolore eu fugiat nulla pariatur.
                </Text>
              </View>
            ) : null}
          </View>
          <PortfolioGallery />

          <Button
            backgroundColor="#03A9F4"
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0
            }}
            title="SEND A REQUEST"
            onPress={() => this.props.navigation.navigate("RequestFormular")}
          />
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
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  },
  scrollStyle: {
    flexGrow: 1
  }
});
