import _ from "lodash";
import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import { Ionicons } from "react-native-vector-icons";
import Home from "../Home/Home";
import Welcome from "../Welcome/Welcome";
import Profile from "../Profile/Profile";
import LoadingPage from "../LoadingPage/LoadingPage";

const ACTIVE_TAB_COLOR = "#85c4ea";
const INACTIVE_TAB_COLOR = "#aaa";

const headerStyles = {
  headerTintColor: "#fff",
  headerStyle: {
    borderBottomWidth: 0,
    backgroundColor: ACTIVE_TAB_COLOR,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 }
  }
};

const Icon = ({ name, focused }) => (
  <Ionicons
    name={name}
    size={30}
    color={focused ? ACTIVE_TAB_COLOR : INACTIVE_TAB_COLOR}
  />
);

export default createBottomTabNavigator(
  {
    HOME: {
      screen: createStackNavigator({
        Home: {
          screen: () => <LoadingPage />,

          path: "/LoadingPage",

          navigationOptions: {
            title: "Home",
            ...headerStyles
          }
        }
      }),

      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ focused }) => <Icon name="ios-home" focused={focused} />
      }
    },

    WELCOME: {
      screen: createStackNavigator({
        Welcome: {
          screen: () => <Welcome />,
          path: "/welcome",
          navigationOptions: {
            title: "Welcome",
            ...headerStyles
          }
        }
      }),
      navigationOptions: {
        tabBarLabel: "Welcome",
        tabBarIcon: ({ focused }) => <Icon name="ios-list" focused={focused} />
      }
    },

    Profile: {
      screen: createStackNavigator({
        Profile: {
          screen: () => <Profile />,
          path: "/profile",
          navigationOptions: {
            title: "Profile",
            ...headerStyles
          }
        }
      }),
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: ({ focused }) => (
          <Icon name="ios-contact" focused={focused} />
        )
      }
    }
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
