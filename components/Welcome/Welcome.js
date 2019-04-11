import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback,
  YellowBox
} from "react-native";
import { connect } from "react-redux";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import { getPosts } from "../../actions";
import Home from "../Home/Home";
import { api } from "../../api/api";

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
  static navigationOptions = {
    headerTitle: (
      <Image
        style={{ width: 42, height: 42, margin:10, marginTop:15, marginBottom:15}}
        source={require("../../assets/logo/logo-buildy-4.png")}
      />
    ),

    headerStyle: { backgroundColor: "#FFFfff" },
    headerTintColor: "white",
    headerTitleStyle: { color: "white" }
  };

  constructor(props) {
    super(props);
    state = {
      userLoggedIn: false
    };
  }

  componentDidMount() {
    this.props.dispatchGetPosts();
    this.setState = {
      userLoggedIn: true
    };
  }

  keyExtractor = (item, index) => String(item._id);
  renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback>
        <Card title={item.name}>
          <Image
            style={{ width: 300, height: 300 }}
            source={{ uri: api + item.avatar }}
          />
          <View>
            <Text>{item.email}</Text>

            <Button
              backgroundColor="#03A9F4"
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0
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
    backgroundColor: "#DCDCDC"
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
