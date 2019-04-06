import _ from "lodash";
import React from "react";
import { Ionicons } from "react-native-vector-icons";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import Welcome from "../components/Welcome/Welcome";
import WelcomeAnimation from "../components/LoadingAni/LoadingAni";
import Login from "../components/Login/Login";
import SignUp from "../components/SignUp/SignUp";
import UsersignUp from "../components/SignUp/UsersignUp";
import UserProfile from "../components/Profile/UserProfile";
import ProfileCompany from "../components/Profile/ProfileCompany";
import Camera from "../components/AdvancedCamera/AdvancedCamera";
import RequestFormular from "../components/Profile/RequestFormular";
import SendEmail from "../components/SendEmail/SendEmail";

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
  Login: {
    screen: Login
  },
  Profile: {
    screen: UserProfile
  },
  SignUp: {
    screen: SignUp
  },
  UsersignUp: {
    screen: UsersignUp
  }
});

const WelcomeStack = createStackNavigator({
  Welcome: {
    screen: Welcome
  },
  ProfileCompany: {
    screen: ProfileCompany
  },

  RequestFormular: {
    screen: RequestFormular
  },
  Camera: {
    screen: Camera
  },
  SendEmail: {
    screen: SendEmail
  },
  welcomeAnimation:{
    screen: WelcomeAnimation
  }
});

export default createBottomTabNavigator(
  {
    Intro:WelcomeAnimation,
    Home: WelcomeStack,
    Users: LoginStack
  },
  {
    initialRouteName: "Intro",
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        console.log(routeName);
        let iconName;
        if (routeName === "Home") {
          iconName = "ios-home";
        } else if (routeName === "Users") {
          iconName = "ios-options";
        }

        return (routeName !== Animation && <Icon name={iconName} size={25} color={tintColor} />);
      }
    })
  }
);
