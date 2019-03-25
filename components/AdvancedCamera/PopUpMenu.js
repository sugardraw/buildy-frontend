import React from "react";
import { Text, View, Button, StyleSheet, TouchableOpacity } from "react-native";
import Menu, {
  MenuItem,
  MenuDivider,
  Position
} from "react-native-enhanced-popup-menu";
import { MaterialIcons } from "@expo/vector-icons";

const PopUpMenu = props => {
  let textRef = React.createRef();
  let menuRef = null;

  const setMenuRef = ref => (menuRef = ref);
  const hideMenu = () => menuRef.hide();
  const showMenu = () =>
    menuRef.show(textRef.current, (stickTo = Position.BOTTOM_CENTER));

  const onPress = () => showMenu();

  return (
    <View style={{ alignItems: "flex-start", backgroundColor: "transparent" }}>
      <Text ref={textRef} style={{ fontSize: 20, textAlign: "center" }}>
        Text component
      </Text>

      <TouchableOpacity style={styles.icon} onPress={onPress}>
        <MaterialIcons name="menu" size={25} color="white" />
      </TouchableOpacity>

      <Menu ref={setMenuRef}>
        <View style={styles.icons}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              alert("edit tools");
            }}
          >
            <MaterialIcons name="edit" size={25} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              alert("save file");
            }}
          >
            <MaterialIcons name="file-download" size={25} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              alert("share");
            }}
          >
            <MaterialIcons name="send" size={25} color="black" />
          </TouchableOpacity>
        </View>
        <MenuDivider />
        <MenuItem onPress={hideMenu}>CLOSE</MenuItem>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  icons: {
    padding: 6,
    borderRadius: 6,
    alignSelf: "center",
    flexDirection: "row"
  },
  icon: {
    margin: "auto",
    padding: 6
  }
});

export default PopUpMenu;
