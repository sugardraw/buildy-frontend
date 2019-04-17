import React, { Component } from "react";
import axios from "axios";

import MultiSelect from "react-native-multiple-select";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableHighlight
} from "react-native";

import { api } from "../../api/api";
import { AntDesign } from "@expo/vector-icons";
import Wizard from "./Wizard";
import UploadAvatar from "../Profile/UploadAvatar";

export default class ProfessionalSignUp extends Component {
  static navigationOptions = {
    headerTintColor: "#85c4ea",
    headerTitleStyle: { color: "black" }
  };
  constructor(props) {
    super(props);
    this.state = {
      signedUp: false,
      services: []
    };
  }

  signUp = values => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    console.log("thats mine", values);
    return axios
      .post(api + "/api/professional/save", values, config)
      .then(response => {
        this.setState({
          signedUp: true
        });
        return response;
      })
      .catch(error => {
        console.log(error);
      });
  };

  onSelectedItemsChange = item => {
    console.log("item", item);
    this.setState(state => {
      state.services.push(item);
      return state;
    });
  };
  clear = item => {
    console.log("item", item);
    this.setState(state => {
      let index = state.services.indexOf(item);
      state.services.splice(index, 1);
      return state;
    });
  };

  render() {
    const service = [
      {
        name: "building"
      },
      {
        name: "Lighting"
      },
      {
        name: "Power Supply"
      },
      {
        name: "paint"
      },
      {
        name: "Refrigeration"
      },
      {
        name: "Gas Supply Systems"
      },
      {
        name: "selling"
      },
      {
        name: "Escalators and lifts"
      },
      {
        name: "Rainwater Harvesting"
      }
    ];

    return (
      <View style={styles.container}>
        <ScrollView contentComponentStyle={{ flex: 1 }}>
          <Wizard
            initialValues={{
              name: "",
              email: "",
              password: "",
              address: {
                city: "",
                street: "",
                zip: ""
              },
              projectImages: [],
              avatar: ""
            }}
          >
            <Wizard.Step>
              {({ onChangeValue, values }) => (
                <View style={styles.container}>
                  <View style={{ marginTop: 30 }}>
                    <UploadAvatar
                      getUri={this.getUri}
                      payloadKey="file"
                      endpoint={api + "/api/user/save_avatar"}
                      callbackUrl="https://cdn.pixabay.com/photo/2017/08/16/00/29/add-person-2646097_960_720.png"
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.inputs}
                      onChangeText={text => onChangeValue("name", text)}
                      placeholder="Company Name"
                      value={values.name}
                      underlineColorAndroid="transparent"
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.inputs}
                      onChangeText={text => onChangeValue("email", text)}
                      placeholder="Email"
                      value={values.email}
                      autoCapitalize="none"
                    />
                  </View>
                  <View>
                    <Text style={styles.small}>
                      We'll never share your email with anyone else.
                    </Text>
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.inputs}
                      secureTextEntry
                      onChangeText={text => onChangeValue("password", text)}
                      placeholder="Password"
                      value={values.password}
                    />
                  </View>
                  <View style={{ width: 250 }}>
                    <MultiSelect
                      ref={component => {
                        this.multiSelect = component;
                      }}
                      items={service}
                      uniqueKey="name"
                      onSelectedItemsChange={item =>
                        this.onSelectedItemsChange(item)
                      }
                      selectedItems={[]}
                      selectText="  Pick Services"
                      searchInputPlaceholderText="Search services..."
                      tagRemoveIconColor="#CCC"
                      tagBorderColor="#CCC"
                      tagTextColor="#CCC"
                      selectedItemTextColor="#CCC"
                      selectedItemIconColor="#CCC"
                      itemTextColor="#000"
                      searchInputStyle={{ color: "#CCC" }}
                      submitButtonColor="#00b5ec"
                      submitButtonText="Submit"
                    />
                    <View style={{ width: 250 }}>
                      {this.state.services !== [] &&
                        this.state.services.map(item => (
                          <View
                            style={{
                              flexDirection: "row"
                            }}
                          >
                            <Text
                              style={{
                                padding: 5,
                                textAlign: "left",
								alignItems:"flex-start"
                              }}
                            >
                              {item}
                            </Text>
                            <TouchableHighlight
                              onPress={item => this.clear(item)}
                              style={{
                                padding: 5,
                                right: 0,
                                alignSelf: "flex-end"
                              }}
                            >
                              <AntDesign
                                name="closecircleo"
                                size={20}
                                color="red"
                              />
                            </TouchableHighlight>
                          </View>
                        ))}
                    </View>
                  </View>
                  <TouchableHighlight
                    style={styles.buttonContainer}
                    onPress={() => this.props.navigation.navigate("Login")}
                  >
                    <Text>Already registered? Login</Text>
                  </TouchableHighlight>
                </View>
              )}
            </Wizard.Step>

            <Wizard.Step>
              {({ onChangeValue, values, signUp }) => (
                <View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.inputs}
                      /* onChangeText={(text) => onChangeValue('city', text)}
										value={values.city} */
                      placeholder="City"
                      value={values.address}
                      onChangeText={text => {
                        const newCity = Object.assign({}, values.address, {
                          city: text
                        });
                        this.setState({ address: newCity });
                      }}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.inputs}
                      onChangeText={text => onChangeValue("street", text)}
                      placeholder="Street and number"
                      value={values.street}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.inputs}
                      onChangeText={text => onChangeValue("zip", text)}
                      placeholder="Zip Code"
                      value={values.zip}
                    />
                  </View>

                  <TouchableHighlight
                    style={[styles.buttonContainer, styles.signupButton]}
                    onPress={() => this.signUp(values)}
                  >
                    <Text style={styles.signupText}>Sign up</Text>
                  </TouchableHighlight>
                </View>
              )}
            </Wizard.Step>
          </Wizard>
        </ScrollView>
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
  small: {
    fontSize: 12
  },
  inputContainer: {
    marginTop: 20,
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    borderBottomWidth: 1,
    width: 250,
    height: 50,
    marginBottom: 20
  },
  inputs: {
    height: 50,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1
  },

  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    alignSelf: "flex-start"
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    margin: 4,
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#85c4ea",
    maxHeight: 100,
    alignSelf: "center"
  },
  signupButton: {
    height: 40,
    backgroundColor: "#00b5ec"
  },
  signupText: {
    color: "white"
  }
});
