import React, { Component } from "react";
import axios from "axios";
import { ImagePicker, Permissions } from "expo";

import MultiSelect from "react-native-multiple-select";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Image
} from "react-native";
import uid from "uuid/v4";

import { api } from "../../api/api";
import { AntDesign } from "@expo/vector-icons";
import Wizard from "./Wizard";

export default class ProfessionalSignUp extends Component {
  static navigationOptions = {
    headerTintColor: "#85c4ea",
    headerTitleStyle: { color: "black" }
  };
  constructor(props) {
    super(props);
    this.state = {
      services: [],
      projectImages: [],
      avatar: null
    };
  }

  collectData = (name, value) => {
    this.setState({ [name]: value });
  };

  onSelectedItemsChange = item => {
    console.log("item", item[0]);
    this.setState(state => {
      state.services.push(item[0]);
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

  _uploadAvatar = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status !== "granted") {
      if (Platform.OS === "ios") this.showAlert();
      return;
    }
    Expo.ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images"
    }).then(result => {
      if (result.uri !== "") {
        const file = result.uri;
        if (!result.cancelled) {
          this.setState({
            loading: true,
            avatar: file
          });
        }
      } else {
        this.setState({
          loading: true,
          avatar:
            "https://cdn.pixabay.com/photo/2017/08/16/00/29/add-person-2646097_960_720.png"
        });
      }
    });
  };

  _launchGallery = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status !== "granted") {
      if (Platform.OS === "ios") this.showAlert();
      return;
    }
    await Expo.ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images"
    }).then(result => {
      const file = result.uri;
      if (!result.cancelled) {
        this.setState(state => {
          state.loading = true;
          state.projectImages.push(file);
          return state;
        });
      }
    });
  };

  signUp = async values => {
    let formData = new FormData();
    console.log(values);
    values.avatar = this.state.avatar;

    formData.append("company_data", values);

    values.projectImages = this.state.projectImages;
    values.services = this.state.services;

    for (let u in values) {
      formData.append(`${u}`, values[u]);
    }
    for (let i in values.projectImages) {
      formData.append(`project_${i}`, values.projectImages[i]);
    }
    for (let j in values.services) {
      formData.append(`service_${j}`, values.services[j]);
    }

    axios
      .post(api + "/api/professional/save", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      .then(response => {
        if (response.status === 200) {
          console.log("eh");
        }
      });

    // config = {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "multipart/form-data;"
    //   },
    //   body: values
    // };

    // return await fetch(api + "/api/professional/save", config)
    //   .then(response => {
    //     response.json().then(data => console.log(data));
    //   })
    //   .catch(err => console.log(err))
    //   .done();
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

    console.log(
      "this.state.services",
      this.state.services,
      "projectImages",
      this.state.projectImages,
      " this.state.avatar",
      this.state.avatar
    );

    return (
      <View style={styles.container}>
        <ScrollView contentComponentStyle={{ flex: 1 }}>
          <Wizard
            initialValues={{
              name: "",
              email: "",
              password: "",
              street: "",
              city: "",
              zip: ""
            }}
            collectData={this.collectData}
          >
            <Wizard.Step>
              {({ onChangeValue, values }) => (
                <View style={styles.container}>
                  <View style={{ marginTop: 30 }}>
                    <View style={styles.imageWrapper}>
                      <TouchableOpacity
                        style={styles.circleWrapper}
                        onPress={() => {
                          this._uploadAvatar();
                        }}
                      >
                        <Image
                          source={{
                            uri: this.state.avatar
                              ? this.state.avatar
                              : "https://cdn.pixabay.com/photo/2017/08/16/00/29/add-person-2646097_960_720.png"
                          }}
                          style={{ width: 130, height: 130, borderRadius: 50 }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      name="name"
                      style={styles.inputs}
                      onChangeText={text => onChangeValue("name", text)}
                      placeholder="Name"
                      value={values.name}
                      underlineColorAndroid="transparent"
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <TextInput
                      name="email"
                      style={styles.inputs}
                      onChangeText={text => onChangeValue("email", text)}
                      placeholder="Email"
                      value={values.email}
                      autoCapitalize="none"
                    />
                  </View>
                  <View>
                    <Text
                      style={[
                        styles.small,
                        { paddingTop: 10, paddingBottom: 2 }
                      ]}
                    >
                      We'll never share your email with anyone else.
                    </Text>
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      name="password"
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
                        this.state.services.map((item, i) => (
                          <View
                            key={i}
                            style={{
                              flexDirection: "row"
                            }}
                          >
                            <Text
                              style={{
                                padding: 5,
                                textAlign: "left",
                                alignItems: "flex-start"
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
                      placeholder="City"
                      value={values.city}
                      onChangeText={text => onChangeValue("city", text)}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.inputs}
                      onChangeText={text => onChangeValue("street", text)}
                      placeholder="Street"
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
                    onPress={() => this._launchGallery()}
                  >
                    <Text style={styles.signupText}>
                      Upload your Project Images
                    </Text>
                  </TouchableHighlight>

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
  },
  imageWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    padding: 10,
    paddingLeft: 95,
    paddingRight: 95
  },
  circleWrapper: {
    borderRadius: 50,
    marginTop: -10
  }
});
