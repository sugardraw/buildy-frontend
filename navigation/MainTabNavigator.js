import _ from "lodash";
import React from "react";
import { Ionicons } from "react-native-vector-icons";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import Posts from "../components/Posts/Posts";
import Welcome from "../components/Welcome/Welcome";
import Login from "../components/Login/Login";
import ImgPicker from "../components/ImgPicker/ImgPicker";
import Canvas from "../components/CanvasComponent/CanvasComponent";
import AdvancedCamera from "../components/AdvancedCamera/AdvancedCamera";

const ACTIVE_TAB_COLOR = "#69A6F7";
const INACTIVE_TAB_COLOR = "#aaa";

const Icon = ({ name, focused }) => (
  <Ionicons
    name={name}
    size={30}
    color={focused ? ACTIVE_TAB_COLOR : INACTIVE_TAB_COLOR}
  />
);

const LoginStack = createStackNavigator({
  screen: Login
});

LoginStack.navigationOptions = {
  tabBarLabel: "Login",
  tabBarIcon: ({ focused }) => <Icon name="ios-contact" focused={focused} />
};

/**
 *
 *  create a test camera functionality
 *
 *
 *  */

const ImgPickerStack = createStackNavigator({
  screen: AdvancedCamera
});

ImgPickerStack.navigationOptions = {
  tabBarLabel: "camera",
  tabBarIcon: ({ focused }) => <Icon name="ios-camera" focused={focused} />
};

/**
 * importing and testing canvas component
 *
 */

const CanvasStack = createStackNavigator({
  screen: Canvas
});

CanvasStack.navigationOptions = {
  tabBarLabel: "canvas",
  tabBarIcon: ({ focused }) => <Icon name="md-apps" focused={focused} />
};

///////////////////////*

const HomeStack = createStackNavigator({
  Welcome: Welcome,
  Posts: Posts
});

HomeStack.navigationOptions = {
  tabBarLabel: "Posts",
  tabBarIcon: ({ focused }) => <Icon name="ios-home" focused={focused} />
};

export default createBottomTabNavigator(
  {
    HomeStack,
    LoginStack,
    ImgPickerStack,
    CanvasStack
  },
  {
    tabBarPosition: "bottom",
    swipeEnabled: false,
    animationEnabled: false,
    tabBarOptions: {
      activeTintColor: ACTIVE_TAB_COLOR,
      inactiveTintColor: INACTIVE_TAB_COLOR,
      showLabel: true,
      style: {
        borderTopWidth: 0,
        paddingTop: 3,
        paddingBottom: 4,
        height: 60,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 0 }
      }
    }
  }
);
