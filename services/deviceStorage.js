import { AsyncStorage } from "react-native";

const deviceStorage = {

  async saveItem(key, value) {
    console.log("incomming data''''###", key, value);
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log("AsyncStorage Error: " + error.message);
    }
  }
};

export default deviceStorage;
