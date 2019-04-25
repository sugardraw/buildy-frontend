import _ from "lodash";
import React from "react";
import { Ionicons } from "react-native-vector-icons";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import Welcome from "../components/Welcome/Welcome";
import Login from "../components/Login/Login";
import ProfessionalSignUp from "../components/SignUp/ProfessionalSignUp";
import UsersignUp from "../components/SignUp/UsersignUp";
import UserProfile from "../components/Profile/UserProfile";
import ProfileCompany from "../components/Profile/ProfileCompany";
import Camera from "../components/AdvancedCamera/AdvancedCamera";
import RequestFormular from "../components/Profile/RequestFormular";
import SendEmail from "../components/SendEmail/SendEmail";
import ImageEditor from "../components/AdvancedCamera/ImageEditor";
import Register from "../components/Profile/Register";
import EditUserProfile from "../components/Profile/EditUserProfile";
import GalleryScreen from "../components/AdvancedCamera/GalleryScreen";
// import Geo from "../components/Geolocation/GeoYelp";
import WelcomeAnimation from "../components/Animations/LoadingAni";
import LogOutAnimation from "../components/Animations/LogOutAnimation";
import LoginAnimation from "../components/Animations/LoginAnimation";

const ACTIVE_TAB_COLOR = "#69A6F7";
const INACTIVE_TAB_COLOR = "#aaa";

const Icon = ({ name, focused }) => (
  <Ionicons
    name={name}
    size={30}
    color={focused ? ACTIVE_TAB_COLOR : INACTIVE_TAB_COLOR}
  />
);

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
  ImageEditor: {
    screen: ImageEditor
  },
  Camera: {
    screen: Camera
  },
  SendEmail: {
    screen: SendEmail
  },
  welcomeAnimation: {
    screen: WelcomeAnimation
  },
  LogOutAnimation: {
    screen: LogOutAnimation
  },
  LoginAnimation: {
    screen: LoginAnimation
  },
  GalleryScreen: {
    screen: GalleryScreen
  },
  Login: {
    screen: Login
  },
  Profile: {
    screen: UserProfile
  },
  ProfessionalSignUp: {
    screen: ProfessionalSignUp
  },
  UsersignUp: {
    screen: UsersignUp
  },
  Register: {
    screen: Register
  },
  EditUserProfile: {
    screen: EditUserProfile
  },
  UserProfile: {
    screen: UserProfile
  }
});

WelcomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = false;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

export default createBottomTabNavigator(
  {
    Intro: WelcomeAnimation,
    Home: WelcomeStack
  },
  {
    initialRouteName: "Intro",
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;

        let iconName;
        if (routeName === "Home") {
          iconName = "ios-home";
        } else if (routeName === "Users") {
          iconName = "ios-options";
        }

        return (
          routeName !== Animation && (
            <Icon name={iconName} size={25} color={tintColor} />
          )
        );
      }
    })
  }
);
