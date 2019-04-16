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

import { connect } from "react-redux";
import { Card, ListItem, Button, Icon } from "react-native-elements";
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

  changeHeader = isLogged => {
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
                margin: 4,
                padding: 5,
                borderRadius: 6,
                borderWidth: 2,
                borderColor: "#85c4ea",
                maxHeight: 60,
                alignSelf: "center",
                marginLeft: 160
              }}
              onPress={() => this.props.navigation.navigate("UserProfile")}
            >
              <Text style={{ color: "#85c4ea" }}>AVATAR</Text>
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
    try {
      let tokenStorage = await AsyncStorage.getItem("id_token");

      console.log("tokenStorage-------------", tokenStorage);

      if (tokenStorage !== null) {
        this.setState(
          {
            token: tokenStorage,
            userLoggedIn: true,
            loading: false
          },
          this.changeHeader(true)
        );
      } else {
        this.changeHeader(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentWillReceiveProps = async nextProps => {
    if (
      this.props.navigation.state.params !== nextProps.navigation.state.params
    ) {
      let tokenStorage = await AsyncStorage.getItem("id_token");
      console.log(FileSystem.documentDirectory);
      if (tokenStorage !== null) {
        console.log("component will receive props");
        this.changeHeader(true);
      }
    }
  };

  logout = async () => {
    try {
      await AsyncStorage.removeItem("id_token");
      console.log("token removed");
      this.props.navigation.navigate("LogOutAnimation");
      this.changeHeader(false);
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
        <Card title={item.name}>
          <Image
            style={{ width: 300, height: 300 }}
            source={{ uri: api + item.avatar }}
          />
          <View>
            <Text>{item.email}</Text>

            <Button
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
                backgroundColor: "#85c4ea"
              }}
              title="READ MORE"
              onPress={() =>
                this.props.navigation.navigate("ProfileCompany", {
                  id: item._id
                })
              }
            />
          </View>
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
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);
