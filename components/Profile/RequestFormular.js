import React from "react";
import {
  View,
  TextInput,
  Text,
  Picker,
  StyleSheet,
  AsyncStorage
} from "react-native";
import { Button } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
/* import Camera from "../AdvancedCamera/AdvancedCamera"; */
import { DatePicker } from "native-base";

const config = require("../../config/config.js");
import JWT from "expo-jwt";

import { Font } from "expo";
console.disableYellowBox = true;

export default class RequestFormular extends React.Component {
  static navigationOptions = {
    headerTransparent: true,
    headerTintColor: "#85c4ea",
    headerTitleStyle: { color: "black" }
  };
  constructor(props) {
    super(props);
    this.state = {
      errors: "",
      title: "",
      description: "",
      budget: "",
      date: "",
      height: 10,
      renderCamera: false,
      companiesIds: []
    };
  }

  componentDidMount = async () => {
    await Font.loadAsync({
      "Roboto-Black": require("../../assets/fonts/Roboto-Black.ttf"),
      "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
      "Roboto-Light": require("../../assets/fonts/Roboto-Light.ttf")
    });
  };

  takeAPicture = async () => {
    const { description, title } = this.state;
    const token = await AsyncStorage.getItem("id_token");
    const decodedJwt = JWT.decode(token, config.SECRET_TOKEN);

    if (description == "" || title == "") {
      this.setState({
        errors: "Please write a title and a description for your request"
      });
    } else {
      this.props.navigation.navigate("Camera", {
        navigation: this.props.navigation,
        requestData: {
          title: this.state.title,
          description: this.state.description,
          budget: this.state.budget,
          date: this.state.date.toString().substr(4, 12),
          id: decodedJwt.sub,
          companyId: this.props.navigation.getParam("companyId", "no_companyId")
        }
      });
    }
  };

  callPicker() {
    this.refs.datePicker.showDatePicker();
  }

  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={styles.container}>
          <Text
            style={[
              styles.titles,
              {
                fontFamily: "Roboto-Black",
                fontSize: 20
              }
            ]}
          >
            REQUEST AN ESTIMATION
          </Text>
          <Text style={styles.required} />

          <Text style={{ color: "red" }}>{this.state.errors}</Text>
          <Text
            style={[
              styles.titles,
              {
                fontFamily: "Roboto-Light"
              }
            ]}
          >
            Title
          </Text>
          <Picker
            mode="dropdown"
            style={styles.textInput}
            selectedValue={this.state.title}
            onValueChange={editedText => this.setState({ title: editedText })}
          >
            <Picker.Item
              color="#d3d3d3"
              label="please select a service"
              value=""
            />
            <Picker.Item label="build" value="build" />
            <Picker.Item label="paint" value="paint" />
            <Picker.Item label="renovate" value="renovate" />
            <Picker.Item label="buying" value="buying" />
            <Picker.Item label="carpentry" value="carpentry" />
          </Picker>
          <Text
            style={[
              styles.titles,
              {
                fontFamily: "Roboto-Light"
              }
            ]}
          >
            Description
          </Text>
          <TextInput
            placeholder="Describe your ideas"
            placeholderStyle={{ paddingLeft: 10 }}
            multiline={true}
            underlineColorAndroid="transparent"
            value={this.state.description}
            onChangeText={editedText =>
              this.setState({ description: editedText })
            }
            onContentSizeChange={e =>
              this.setState({ height: e.nativeEvent.contentSize.height + 20 })
            }
            style={[
              styles.textInput,
              {
                height: Math.min(100, Math.max(20, this.state.height))
              }
            ]} //height limitation between 20 to 120px (change dinamycally)
          />

          <Text
            style={[
              styles.titles,
              {
                fontFamily: "Roboto-Light"
              }
            ]}
          >
            Which is your budget?
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="5.000 Euro"
            placeholderStyle={{ paddingLeft: 10 }}
            underlineColorAndroid="transparent"
            onChangeText={editedText => this.setState({ budget: editedText })}
          />

          <Text
            style={[
              styles.titles,
              {
                fontFamily: "Roboto-Light"
              }
            ]}
          >
            Start Date: {this.state.date.toString().substr(4, 12)}
          </Text>
          <DatePicker
            style={{
              padding: 15,
              borderColor: "#85c4ea",
              fontFamily: "Roboto-Medium",
              color: "#85c4ea",
              padding: 5,
              borderRadius: 5,
              borderWidth: 1,
              marginBottom: 10
            }}
            ref="datePicker"
            defaultDate={new Date(2018, 4, 4)}
            minimumDate={new Date(1960, 1, 1)}
            maximumDate={new Date(2022, 12, 31)}
            locale={"en"}
            selected={this.state.date}
            value={this.state.date}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={true}
            showTimeSelect
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Click me to select a date"
            placeHolderTextStyle={{
              color: "#85c4ea"
            }}
            disabled={false}
            onDateChange={editedText => this.setState({ date: editedText })}
          />
          <Button
            buttonStyle={[
              styles.button,
              {
                marginTop: 20,
                backgroundColor: "#85c4ea",
                width: 300
              }
            ]}
            title="ADD PICTURES TO YOUR REQUEST"
            onPress={() => this.takeAPicture()}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ebebeb"
  },
  titles: {
    textAlign: "left",
    alignSelf: "flex-start",
    padding: 8,
    paddingLeft: 20
  },
  required: {
    fontSize: 10,
    margin: 2
  },

  textInput: {
    borderRadius: 5,
    width: "90%",
    paddingVertical: 0,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 10,
    height: 40,
    margin: 0,
    borderWidth: 1,
    borderColor: "#85c4ea",
    backgroundColor: "white",
    marginBottom: 10
  },
  button: {
    alignSelf: "center",
    position: "relative",
    width: "100%"
  }
});
