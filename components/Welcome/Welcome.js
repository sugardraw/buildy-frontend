import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  YellowBox,
  AsyncStorage
} from "react-native";
import { FileSystem } from "expo";

import { Card, CardItem, Body, Header } from "native-base";

import Geo from "../Geo/Geo";

import { connect } from "react-redux";
//  import { Card, ListItem, Button, Icon } from "react-native-elements";
import { getPosts } from "../../actions";
import Home from "../Home/Home";
import { api } from "../../api/api";
import { AntDesign } from "@expo/vector-icons";
import { LOGOUT } from "../../actions/types";

YellowBox.ignoreWarnings(["Require cycle:"]);

const mapStateToProps = state => {
  const {
    posts,
    userLoggedIn,
    loading,
    error,
    post,
    postLoading
  } = state.posts;

  return { posts, userLoggedIn, loading, error, post, postLoading };
};

const mapDispatchToProps = {
  dispatchGetPosts: getPosts
};

class Welcome extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam("HeaderTitle", "TEST"),
      headerStyle: {
        backgroundColor: navigation.getParam("BackgroundColor", "#E050FB")
      },
      headerTintColor: navigation.getParam("HeaderTintColor", "#fff"),
      headerTitleStyle: {
        color: navigation.getParam("Color", "#fff")
      }
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      token: "",
      loading: true,
      userLoggedIn: false
    };
  }

  changeHeader = (isLogged, avatar) => {
    if (!isLogged) {
      this.props.navigation.setParams({
        HeaderTitle: (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <Image
              style={{
                width: 50,
                height: 50,
                margin: 10,
                marginTop: 15,
                marginBottom: 15
              }}
              source={require("../../assets/logo/buildy-logo-final_header-2.png")}
            />

            <TouchableOpacity
              style={{
                margin: 4,
                padding: 5,
                borderRadius: 6,
                borderWidth: 2,
                borderColor: "#85c4ea",
                maxHeight: 60,
                alignSelf: "center",
                marginLeft: 238
              }}
              onPress={() => this.props.navigation.navigate("Login")}
            >
              <AntDesign name="login" size={25} style={{ color: "#85c4ea" }} />
            </TouchableOpacity>
          </View>
        ),
        BackgroundColor: "#fff",
        HeaderTintColor: "#fff"
      });
    } else {
      this.props.navigation.setParams({
        HeaderTitle: (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <Image
              style={{
                width: 50,
                height: 50,
                margin: 10,
                marginLeft: 12,
                marginTop: 15,
                marginBottom: 15
              }}
              source={require("../../assets/logo/buildy-logo-final_header-2.png")}
            />

            <TouchableOpacity
              style={{
                padding: 3,
                borderRadius: 50,
                borderWidth: 4,
                borderColor: "#85c4ea",
                marginLeft: 180,
                alignSelf: "center"
              }}
              onPress={() => this.props.navigation.navigate("UserProfile")}
            >
              <Image
                style={{
                  borderRadius: 50,
                  alignSelf: "center",
                  width: 40,
                  height: 40
                }}
                source={{ uri: avatar }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                margin: 4,
                padding: 5,
                borderRadius: 6,
                borderWidth: 2,
                borderColor: "#85c4ea",
                maxHeight: 60,
                alignSelf: "center"
              }}
              onPress={() => this.logout()}
            >
              <AntDesign name="logout" size={25} style={{ color: "#85c4ea" }} />
            </TouchableOpacity>
          </View>
        ),
        BackgroundColor: "#fff",
        HeaderTintColor: "#fff"
      });
    }
  };

  componentDidMount = async () => {
    this.props.dispatchGetPosts();
    this.props.navigation.setParams({ changeScreen: 0 });
    try {
      let tokenStorage = await AsyncStorage.getItem("id_token");
      let avatar = await AsyncStorage.getItem("avatar");

      if (tokenStorage !== null) {
        this.setState(
          {
            token: tokenStorage,
            userLoggedIn: true,
            loading: false
          },

          this.changeHeader(true, avatar)
        );
      } else {
        this.changeHeader(false, null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentWillReceiveProps = async nextProps => {
    let param_1 = this.props.navigation.getParam("changeScreen");
    let param_2 = nextProps.navigation.getParam("changeScreen");
    console.log(param_1, param_2);

    if (param_1 !== param_2) {
      let tokenStorage = await AsyncStorage.getItem("id_token");
      if (tokenStorage !== null) {
        let avatar = await AsyncStorage.getItem("avatar");

        if (avatar.includes("/uploads/")) {
          console.log("avatar includes upload", avatar);
          let avatarPath = api + avatar;
          this.props.dispatchGetPosts();
          this.changeHeader(true, avatarPath);
          this.forceUpdate();
          return;
        }
        console.log("avatar NOT includes upload", avatar);
        await this.changeHeader(true, avatar);
      }
    }
  };

  logout = async () => {
    try {
      await AsyncStorage.removeItem("id_token");
      await AsyncStorage.removeItem("avatar");
      console.log("token removed");
      this.props.navigation.navigate("LogOutAnimation");
      this.props.navigation.setParams({ changeScreen: 0 });
      this.changeHeader(false, null);
    } catch (err) {
      console.log(`The error is: ${err}`);
    }
  };

  keyExtractor = (item, index) => String(item._id);
  renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() =>
          this.props.navigation.navigate("ProfileCompany", { id: item._id })
        }
      >
        <Card style={{ marginTop: 10 }}>
          <CardItem cardBody>

            {typeof item.avatar == "string" ? (
              <View>
                <Image
                  style={{ width: 350, height: 300 }}
                  source={{ uri: api + item.avatar }}
                />
              </View>
            ) : (
              <View>
                <Image
                  style={{ width: 350, height: 300 }}
                  source={{ uri: api + "/" + item.avatar[0].path }}
                />
              </View>
            )}
          </CardItem>
          <CardItem>
            <Body style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                {item.name}
              </Text>

              <View style={{ flexDirection: "row" }}>
                {item.services.map((service, i) => (
                  <View key={i} style={{ paddingRight: 2, marginRight: 2 }}>
                    <Text style={styles.servicesList}>{service}</Text>
                  </View>
                ))}
              </View>
            </Body>
          </CardItem>
        </Card>
      </TouchableWithoutFeedback>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data={this.props.posts}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ebebeb"
  },
  card: {
    backgroundColor: "#fff",
    padding: 8,
    margin: 12,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  servicesList: {
    textAlign: "left",
    color: "#0ec485"
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);
