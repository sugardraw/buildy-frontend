import React from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";
import axios from "axios";

import { api } from "../../api/api";
import { Card, CardItem, Body } from "native-base";

class SelectCompanies extends React.Component {
  static navigationOptions = {
    title: "SELECT COMPANIES",
    headerStyle: { backgroundColor: "#white" },
    headerTintColor: "#85c4ea"
  };
  constructor() {
    super();
    this.state = {
      companies: null
    };
  }

  componentDidMount() {
    axios
      .get(api + "/api/professional/listAll")
      .then(response => {
        this.setState({
          companies: response.data
        });
      })
      .catch(error => {
        throw error;
      });
  }

  selectItem = data => {
    console.log("data clicked", data);
    // data.item.isSelect = !data.item.isSelect;
    // data.item.selectedClass = data.item.isSelect
    //   ? styles.selected
    //   : styles.list;

    // const index = this.state.dataSource.findIndex(
    //   item => data.item.id === item.id
    // );
    // this.state.dataSource[index] = data.item;
    // this.setState({
    //   dataSource: this.state.dataSource
    // });
  };

  keyExtractor = (item, index) => String(item._id);
  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[styles.list, item.selectedClass, { padding: 10 }]}
        onPress={() => this.selectItem(item)}
      >
        {typeof item.avatar == "string" ? (
          <View style={{ marginLeft: 10, padding: 10 }}>
            <Image
              style={{ width: 50, height: 50, borderRadius: 50 }}
              source={{ uri: api + item.avatar }}
            />
          </View>
        ) : (
          <View style={{ marginLeft: 10, padding: 10 }}>
            <Image
              style={{ width: 50, height: 50, borderRadius: 50 }}
              source={{ uri: api + "/" + item.avatar[0].path }}
            />
          </View>
        )}
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            marginLeft: 10,
            color: "white"
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    if (this.state.companies !== null) {
      return (
        <View style={styles.container}>
          <FlatList
            contentContainerStyle={{ flexGrow: 1 }}
            data={this.state.companies}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text> Waiting for data...</Text>
        </View>
      );
    }
  }
}

export default SelectCompanies;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  list: {
    paddingVertical: 5,
    margin: 3,
    flexDirection: "row",
    backgroundColor: "#D0E8E3",
    justifyContent: "flex-start",
    alignItems: "center",
    zIndex: -1
  }
});
